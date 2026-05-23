# Security and Authentication — Ailectra

## 1. Authentication

Gunakan Auth.js / NextAuth dengan:

- Google OAuth.
- Credentials provider untuk email/password.
- Prisma Adapter.
- Session strategy yang konsisten.
- Password hashing.

## 2. Manual Register

Flow:

1. Validate email, password, name dengan Zod.
2. Cek email sudah ada atau belum.
3. Hash password.
4. Create user.
5. Create default UserSettings.
6. Redirect ke login atau auto sign-in jika aman.

Password policy MVP:
- Minimal 8 karakter.
- Minimal ada huruf.
- Minimal ada angka.
- Error message jelas.

## 3. Google OAuth

Butuh env:

```env
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_SECRET=""
```

Redirect URI production harus disesuaikan di Google Cloud Console.

## 4. Route Protection

Protected routes:

```txt
/[locale]/dashboard/**
```

Aturan:
- Jika belum login, redirect ke `/login`.
- Jika login, boleh akses dashboard.
- Public marketing tetap bebas.

## 5. Credential Vault

### 5.1 Allowed Storage

Boleh simpan:
- API key resmi.
- Token resmi dari OAuth provider.
- Username/email.
- Notes user.
- Manual credential hanya jika user jelas setuju.

### 5.2 Forbidden Storage/Actions

Dilarang:
- Menyimpan password pihak ketiga tanpa enkripsi.
- Mengambil cookie browser.
- Mencuri session.
- Auto-submit login form pihak ketiga.
- Bypass 2FA/CAPTCHA.
- Scraping private account tanpa izin.
- Menaruh secret di localStorage.

## 6. Encryption

Gunakan AES-256-GCM untuk `encryptedSecret`.

Env:

```env
ENCRYPTION_KEY="base64-encoded-32-byte-key"
```

`lib/encryption.ts` harus menyediakan:

```ts
export async function encryptSecret(value: string): Promise<string>
export async function decryptSecret(payload: string): Promise<string>
```

Payload sebaiknya berisi:
- iv.
- authTag.
- encryptedData.
- version.

Contoh format JSON lalu base64:

```json
{
  "v": 1,
  "iv": "...",
  "tag": "...",
  "data": "..."
}
```

## 7. Secret Handling

- Secret hanya didekripsi saat benar-benar diperlukan.
- Secret tidak dikirim ke client kecuali user meminta reveal/copy dan sudah confirm.
- Untuk launch, lebih baik redirect external URL tanpa expose secret.
- Masking: `sk-****abcd`.

## 8. Launch Safety

### Safe Launch

Untuk provider tanpa OAuth resmi:
- Buka website provider.
- Tampilkan username/email.
- Berikan tombol copy credential jika user confirm.
- Catat launch history.

### Unsafe Launch

Jangan:
- Inject password ke DOM provider.
- Membuat browser automation login.
- Menggunakan token dari session browser.
- Mengakali anti-bot.

## 9. Rate Limiting

Tambahkan rate limit untuk:
- Login manual.
- Register.
- Credential reveal.
- Launch endpoint.
- Create connection.

MVP bisa pakai in-memory saat dev, production pakai Upstash Redis.

## 10. Audit Logging

Audit actions:
- user.register
- user.login
- user.logout
- connection.create
- connection.update
- connection.delete
- connection.launch
- secret.reveal
- settings.update

Jangan simpan secret di audit metadata.

## 11. CSRF and Server Actions

- Auth.js menangani banyak aspek auth.
- Server action tetap wajib session check.
- Mutation harus validate owner.
- Jangan percaya ID dari client.

## 12. Security Checklist

Sebelum release:

- [ ] Tidak ada secret di console.
- [ ] Tidak ada `.env` masuk git.
- [ ] Credential terenkripsi.
- [ ] Route protected.
- [ ] User ownership check.
- [ ] Rate limit login.
- [ ] Password hashed.
- [ ] Session secure in production.
- [ ] OG/image endpoint tidak expose user data.
