---
trigger: always_on
description: >
  Security standards covering JWT authentication, password hashing, input
  sanitization, CORS policy, rate limiting, sensitive field handling, and
  file upload validation. Apply to ALL layers — backend handlers, middleware,
  and frontend service calls.
---

# Security Standards

---

## Authentication — JWT

- Use **JWT** for all authenticated endpoints.
- Validate the token on every request inside `middleware/common.go` — never in individual handlers.
- Tokens must include expiry (`exp` claim). Reject expired tokens with `401`.
- Store only non-sensitive identifiers in the JWT payload (user ID, role). Never store passwords or secrets.

---

## Password Hashing

- Hash all passwords with **bcrypt**, minimum cost **12**.
- Plain text storage is FORBIDDEN.
- MD5 and SHA1 are FORBIDDEN for passwords.
- Never log, return, or include a password field in any JSON response.

```go
// ✅ CORRECT
hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 12)
```

---

## Input Sanitization

- GORM parameterization handles SQL injection automatically — never build raw query strings with user input.
- Validate and sanitize all user-supplied strings at the handler level before processing (XSS prevention).
- File upload filenames must be sanitized — strip path separators and special characters before storage.

---

## CORS Policy

- CORS must be explicitly configured in `middleware/common.go`.
- Wildcard origin (`Access-Control-Allow-Origin: *`) is **FORBIDDEN in production**.
- Explicitly list allowed origins, methods, and headers in the config.

---

## Rate Limiting

- Rate limiting middleware MUST be applied to all authentication endpoints:
  - `/api/v1/auth/login`
  - `/api/v1/auth/register`
  - `/api/v1/auth/reset-password`
  - Any other endpoint that issues or validates credentials.
- Implement in `middleware/common.go` using a token bucket or sliding window algorithm.

---

## Sensitive Field Rules

The following fields must NEVER appear in:
- JSON API responses
- Log output (inbound or outbound)
- Error messages returned to the client

Sensitive fields: `password`, `hashed_password`, `token`, `refresh_token`, `secret`, `api_key`, `private_key`.

Ensure `json:"-"` is set on all sensitive GORM model fields:

```go
type User struct {
    gorm.Model
    BaseModel
    Email          string `gorm:"uniqueIndex;not null" json:"email"`
    HashedPassword string `gorm:"not null"             json:"-"`
}
```

---

## File Upload Validation

- Validate MIME type **server-side** by inspecting file magic bytes — never trust the `Content-Type` header alone.
- Enforce a maximum file size limit server-side.
- Sanitize filenames before storing (strip path traversal chars like `../`).
- Store uploaded files outside the web root or in object storage — never in a publicly served directory.

---

## Forbidden Patterns — Security

| ❌ NEVER | ✅ Instead |
|---|---|
| Plain text or MD5/SHA1 passwords | bcrypt min cost 12 |
| JWT validation in individual handlers | Validate in `middleware/common.go` only |
| Wildcard CORS in production | Explicitly list allowed origins |
| Sensitive fields in JSON responses | Use `json:"-"` on model fields |
| Sensitive fields in logs | Mask before logging |
| Trusting `Content-Type` for file validation | Inspect magic bytes server-side |
| No rate limiting on auth endpoints | Apply token bucket/sliding window middleware |
