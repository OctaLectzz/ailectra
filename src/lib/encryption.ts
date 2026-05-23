import crypto from "crypto"

const getEncryptionKey = (): Buffer => {
  const rawKey = process.env.ENCRYPTION_KEY
  if (!rawKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ENCRYPTION_KEY environment variable is missing in production.")
    }
    // Safe fallback for local development or testing
    return crypto.createHash("sha256").update("dev-fallback-key-ailectra").digest()
  }
  try {
    const decoded = Buffer.from(rawKey, "base64")
    if (decoded.length === 32) return decoded
    // If not exactly 32 bytes, hash it using SHA-256 to guarantee a robust 32-byte key
    return crypto.createHash("sha256").update(decoded).digest()
  } catch {
    return crypto.createHash("sha256").update(rawKey).digest()
  }
}

interface EncryptedPayload {
  v: number
  iv: string
  tag: string
  data: string
}

/**
 * Encrypts a plaintext string using AES-256-GCM
 * @param value The secret to encrypt
 * @returns Base64 encoded string representing the JSON payload
 */
export async function encryptSecret(value: string): Promise<string> {
  if (!value) return ""
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  
  let encrypted = cipher.update(value, "utf8", "base64")
  encrypted += cipher.final("base64")
  
  const tag = cipher.getAuthTag().toString("base64")
  
  const payload: EncryptedPayload = {
    v: 1,
    iv: iv.toString("base64"),
    tag: tag,
    data: encrypted,
  }
  
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

/**
 * Decrypts an AES-256-GCM encrypted payload
 * @param payloadStr Base64 encoded string representing the JSON payload
 * @returns Plaintext decrypted string
 */
export async function decryptSecret(payloadStr: string): Promise<string> {
  if (!payloadStr) return ""
  const key = getEncryptionKey()
  const jsonStr = Buffer.from(payloadStr, "base64").toString("utf8")
  const payload: EncryptedPayload = JSON.parse(jsonStr)
  
  const iv = Buffer.from(payload.iv, "base64")
  const tag = Buffer.from(payload.tag, "base64")
  const encryptedData = Buffer.from(payload.data, "base64")
  
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  
  let decrypted = decipher.update(encryptedData)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  
  return decrypted.toString("utf8")
}
