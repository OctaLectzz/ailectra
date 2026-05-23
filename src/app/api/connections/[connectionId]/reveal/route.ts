import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { decryptSecret } from "@/lib/encryption"
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

    // Parse body for confirmation
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { ok: false, message: "Invalid request payload." },
        { status: 400 }
      )
    }

    if (body?.confirmation !== "REVEAL_SECRET") {
      return NextResponse.json(
        { ok: false, message: "Confirmation parameter required." },
        { status: 400 }
      )
    }

    // Verify ownership
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

    // Decrypt the secret if it exists
    let decryptedSecret = ""
    if (connection.encryptedSecret) {
      try {
        decryptedSecret = await decryptSecret(connection.encryptedSecret)
      } catch (err) {
        console.error("Decryption failed:", err)
        return NextResponse.json(
          { ok: false, message: "Failed to decrypt secret credentials safely." },
          { status: 500 }
        )
      }
    }

    // Log the reveal action in the audit logs
    await prisma.auditLog.create({
      data: {
        userId,
        action: "secret.reveal",
        entity: "AiConnection",
        entityId: connectionId,
        metadata: {
          label: connection.label,
          providerSlug: connection.provider.slug,
        },
      },
    })

    return NextResponse.json(
      {
        ok: true,
        secret: decryptedSecret,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    )
  } catch (error) {
    console.error("Reveal secret error:", error)
    return NextResponse.json(
      { ok: false, message: "A server error occurred. Please try again." },
      { status: 500 }
    )
  }
}
