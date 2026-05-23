import { z } from "zod"

export const createConnectionSchema = z.object({
  providerId: z.string().min(1, "Provider is required"),
  label: z.string().min(2, "Label must be at least 2 characters"),
  accountEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
  username: z.string().min(2, "Username must be at least 2 characters").optional().or(z.literal("")),
  authType: z.enum(["OFFICIAL_OAUTH", "API_KEY", "MANUAL_CREDENTIAL", "DEEPLINK", "EXTERNAL_URL"]),
  externalUrl: z.string().url("Invalid URL format").optional().or(z.literal("")),
  secret: z.string().min(1, "Secret/API key is required").optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
})

export const updateConnectionSchema = createConnectionSchema.extend({
  connectionId: z.string().min(1, "Connection ID is required"),
  secret: z.string().optional().or(z.literal("")), // optional during updates so we don't overwrite if empty
})

export const updateSettingsSchema = z.object({
  theme: z.enum(["DARK", "LIGHT", "SYSTEM"]).optional(),
  locale: z.enum(["EN", "ID"]).optional(),
})

export type CreateConnectionInput = z.infer<typeof createConnectionSchema>
export type UpdateConnectionInput = z.infer<typeof updateConnectionSchema>
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
