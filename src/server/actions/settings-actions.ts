"use server"

import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { updateSettingsSchema } from "@/lib/validators"
import { LocalePreference, ThemePreference } from "@prisma/client"
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

export async function updateSettingsAction(input: unknown) {
  try {
    const userId = await getUserId()
    if (!userId) {
      return { ok: false, message: "Unauthorized: Please log in." }
    }

    const parsed = updateSettingsSchema.safeParse(input)
    if (!parsed.success) {
      return {
        ok: false,
        message: "Invalid input settings.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      }
    }

    const { theme, locale } = parsed.data
    
    const updateData: any = {}
    if (theme) {
      updateData.theme = theme as ThemePreference
    }
    if (locale) {
      updateData.locale = locale as LocalePreference
    }

    const settings = await prisma.userSettings.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        theme: (theme as ThemePreference) || ThemePreference.DARK,
        locale: (locale as LocalePreference) || LocalePreference.EN,
      },
    })

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId,
        action: "settings.update",
        entity: "UserSettings",
        entityId: settings.id,
        metadata: { theme, locale },
      },
    })

    revalidatePath("/[locale]/dashboard", "layout")
    return { ok: true, message: "Settings updated successfully." }
  } catch (error) {
    console.error("Failed to update settings action:", error)
    return { ok: false, message: "A server error occurred while updating settings." }
  }
}
