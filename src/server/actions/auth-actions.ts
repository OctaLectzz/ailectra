"use server"

import prisma from "@/db/prisma"
import { registerSchema } from "@/lib/validators"
import bcrypt from "bcryptjs"

export async function registerUserAction(input: unknown) {
  try {
    const parsed = registerSchema.safeParse(input)
    if (!parsed.success) {
      return {
        ok: false,
        message: "Invalid registration inputs.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      }
    }

    const { name, email, password } = parsed.data

    // Case-insensitive email check
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return {
        ok: false,
        message: "This email is already registered.",
      }
    }

    // Hash password securely (minimum 10 rounds)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user along with default UserSettings
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        settings: {
          create: {
            theme: "DARK",
            locale: "EN",
          },
        },
      },
    })

    // Log the registration event to audit logs
    await prisma.auditLog.create({
      data: {
        userId: newUser.id,
        action: "user.register",
        entity: "User",
        entityId: newUser.id,
        metadata: {
          email: newUser.email,
        },
      },
    })

    return {
      ok: true,
      message: "Registration completed successfully! You can now log in.",
    }
  } catch (error) {
    console.error("Failed to register user:", error)
    return {
      ok: false,
      message: "An unexpected server error occurred during registration. Please try again.",
    }
  }
}
