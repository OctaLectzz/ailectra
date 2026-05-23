"use server"

import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { encryptSecret } from "@/lib/encryption"
import { createConnectionSchema, updateConnectionSchema } from "@/lib/validators"
import { AiAuthType } from "@prisma/client"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

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

export async function createConnectionAction(input: unknown) {
  try {
    const userId = await getUserId()
    if (!userId) {
      return { ok: false, message: "Unauthorized: Please log in." }
    }

    const parsed = createConnectionSchema.safeParse(input)
    if (!parsed.success) {
      return {
        ok: false,
        message: "Invalid input values.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      }
    }

    const { providerId, label, accountEmail, username, authType, externalUrl, secret, notes } = parsed.data

    // Verify provider exists
    const provider = await prisma.aiProvider.findUnique({
      where: { id: providerId },
    })
    if (!provider) {
      return { ok: false, message: "Selected AI Provider not found." }
    }

    // Encrypt secret if supplied
    let encryptedSecret = null
    let secretHint = null
    if (secret) {
      encryptedSecret = await encryptSecret(secret)
      secretHint = secret.length > 4 ? `sk-...${secret.slice(-4)}` : "sk-...key"
    }

    // Map launch type based on provider's launch type or default manual
    const launchType = provider.launchType

    const connection = await prisma.aiConnection.create({
      data: {
        userId,
        providerId,
        label,
        accountEmail,
        username,
        authType: authType as AiAuthType,
        launchType,
        externalUrl: externalUrl || provider.websiteUrl,
        encryptedSecret,
        secretHint,
        notes,
      },
    })

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId,
        action: "connection.create",
        entity: "AiConnection",
        entityId: connection.id,
        metadata: { label, providerSlug: provider.slug },
      },
    })

    revalidatePath("/[locale]/dashboard", "layout")
    return { ok: true, message: "AI account connection created successfully.", connectionId: connection.id }
  } catch (error) {
    console.error("Failed to create connection action:", error)
    return { ok: false, message: "A server error occurred. Please try again." }
  }
}

export async function deleteConnectionAction(input: { connectionId: string }) {
  try {
    const userId = await getUserId()
    if (!userId) {
      return { ok: false, message: "Unauthorized: Please log in." }
    }

    const { connectionId } = input
    if (!connectionId) {
      return { ok: false, message: "Connection ID is required." }
    }

    // Verify ownership
    const connection = await prisma.aiConnection.findFirst({
      where: { id: connectionId, userId },
      include: { provider: true },
    })

    if (!connection) {
      return { ok: false, message: "AI Connection not found or access denied." }
    }

    // Delete connection (cascade deletes launchHistory due to schema settings)
    await prisma.aiConnection.delete({
      where: { id: connectionId },
    })

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId,
        action: "connection.delete",
        entity: "AiConnection",
        entityId: connectionId,
        metadata: { label: connection.label, providerSlug: connection.provider.slug },
      },
    })

    revalidatePath("/[locale]/dashboard", "layout")
    return { ok: true, message: "Connection successfully deleted." }
  } catch (error) {
    console.error("Failed to delete connection action:", error)
    return { ok: false, message: "A server error occurred while deleting the connection." }
  }
}

export async function updateConnectionAction(input: unknown) {
  try {
    const userId = await getUserId()
    if (!userId) {
      return { ok: false, message: "Unauthorized: Please log in." }
    }

    const parsed = updateConnectionSchema.safeParse(input)
    if (!parsed.success) {
      return {
        ok: false,
        message: "Invalid input values.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      }
    }

    const { connectionId, label, accountEmail, username, authType, externalUrl, secret, notes } = parsed.data

    // Verify ownership
    const connection = await prisma.aiConnection.findFirst({
      where: { id: connectionId, userId },
      include: { provider: true },
    })

    if (!connection) {
      return { ok: false, message: "AI Connection not found or access denied." }
    }

    const updateData: any = {
      label,
      accountEmail,
      username,
      authType,
      externalUrl,
      notes,
    }

    // Encrypt secret only if provided
    if (secret) {
      updateData.encryptedSecret = await encryptSecret(secret)
      updateData.secretHint = secret.length > 4 ? `sk-...${secret.slice(-4)}` : "sk-...key"
    }

    await prisma.aiConnection.update({
      where: { id: connectionId },
      data: updateData,
    })

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId,
        action: "connection.update",
        entity: "AiConnection",
        entityId: connectionId,
        metadata: { label, providerSlug: connection.provider.slug },
      },
    })

    revalidatePath("/[locale]/dashboard", "layout")
    return { ok: true, message: "Connection successfully updated." }
  } catch (error) {
    console.error("Failed to update connection action:", error)
    return { ok: false, message: "A server error occurred while updating the connection." }
  }
}

