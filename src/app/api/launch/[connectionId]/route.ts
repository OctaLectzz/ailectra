import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import crypto from "crypto"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

// Helper to get active user ID or fallback to dev user in local environment
async function getUserId() {
  const session = await getServerSession(authOptions)
  if (session && session.user) {
    return (session.user as any).id
  }
  
  if (process.env.NODE_ENV === "development") {
    let devUser = await prisma.user.findFirst()
    if (!devUser) {
      devUser = await prisma.user.create({
        data: {
          name: "Dev User",
          email: "dev@ailectra.app",
        },
      })
    }
    return devUser.id
  }
  return null
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ connectionId: string }> }
) {
  try {
    const userId = await getUserId()
    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized: Please log in." },
        { status: 401 }
      )
    }

    const { connectionId } = await params
    if (!connectionId) {
      return NextResponse.json(
        { ok: false, message: "Connection ID is required." },
        { status: 400 }
      )
    }

    // Verify ownership and load provider info
    const connection = await prisma.aiConnection.findFirst({
      where: { id: connectionId, userId },
      include: { provider: true },
    })

    if (!connection) {
      return NextResponse.json(
        { ok: false, message: "AI Connection not found or access denied." },
        { status: 404 }
      )
    }

    // Set Launch Status based on type
    const status = connection.launchType === "MANUAL_SECURE" ? "MANUAL_REQUIRED" : "SUCCESS"

    // Extract headers for metadata
    const userAgent = request.headers.get("user-agent") || null
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1"
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex")

    // Record launch history log
    await prisma.launchHistory.create({
      data: {
        userId,
        connectionId,
        providerSlug: connection.provider.slug,
        status,
        launchType: connection.launchType,
        message: `Connection launched successfully.`,
        userAgent,
        ipHash,
      },
    })

    // Update connection last used timestamp
    await prisma.aiConnection.update({
      where: { id: connectionId },
      data: { lastLaunchedAt: new Date() },
    })

    // Log security audit trail event
    await prisma.auditLog.create({
      data: {
        userId,
        action: "connection.launch",
        entity: "AiConnection",
        entityId: connectionId,
        metadata: {
          label: connection.label,
          providerSlug: connection.provider.slug,
          launchType: connection.launchType,
        },
      },
    })

    // Map launch type to response strategy and specific instructions
    let strategy: "redirect" | "manual_modal" | "api_key_info" = "redirect"
    let message = "Redirecting you to the provider workspace..."

    if (connection.launchType === "MANUAL_SECURE") {
      strategy = "manual_modal"
      message = "Please copy the manual credentials below to log into the provider."
    } else if (connection.launchType === "API_KEY") {
      strategy = "api_key_info"
      message = "Use the API key or token below to integrate this provider into your local application."
    }

    const url = connection.externalUrl || connection.provider.websiteUrl

    return NextResponse.json(
      {
        ok: true,
        strategy,
        url,
        providerName: connection.provider.name,
        accountLabel: connection.label,
        accountEmail: connection.accountEmail,
        maskedSecret: connection.secretHint,
        message,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    )
  } catch (error) {
    console.error("Failed to launch connection:", error)
    return NextResponse.json(
      { ok: false, message: "A server error occurred. Please try again." },
      { status: 500 }
    )
  }
}
