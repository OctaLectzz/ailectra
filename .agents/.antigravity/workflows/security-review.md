# Workflow — Security Review

Use this workflow before merging auth, credential, launch, or account-related changes.

## Checklist

- [ ] Auth required for protected routes.
- [ ] Ownership checked with `userId`.
- [ ] Zod validation exists.
- [ ] No raw secret stored.
- [ ] No secret returned accidentally.
- [ ] No secret logged.
- [ ] Encryption used for sensitive field.
- [ ] Launch flow does not bypass third-party login.
- [ ] Reveal/copy secret requires explicit confirmation.
- [ ] Audit log added for sensitive action.
- [ ] Rate limit considered.
