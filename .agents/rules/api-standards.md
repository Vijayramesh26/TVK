---
trigger: always_on
description: >
  API contract standards for all REST endpoints. Covers URL design, HTTP methods,
  response envelope, status codes, pagination, versioning, deprecation, idempotency,
  request headers, rate limiting signals, and PATCH vs PUT rules.
  Apply to ALL handler files and any code that produces or consumes HTTP API responses.
---

# API Standards — REST (2026)

---

## 1. URL Design

- All routes prefixed with `/api/v1/`.
- Use **kebab-case** for multi-word resources: `/api/v1/user-profiles`.
- Resources are **plural nouns** — never verbs.
- Express actions through HTTP methods, not URL segments.
- Keep nesting to a maximum of **2 levels** deep.

```
✅  GET    /api/v1/users
✅  POST   /api/v1/users
✅  GET    /api/v1/users/{id}
✅  PATCH  /api/v1/users/{id}
✅  DELETE /api/v1/users/{id}
✅  GET    /api/v1/users/{id}/orders        ← 2 levels, fine
✅  GET    /api/v1/orders/{id}              ← prefer flat for deep nesting

❌  GET    /api/v1/getUser
❌  POST   /api/v1/createUser
❌  GET    /api/v1/users/{id}/orders/{oid}/items/{iid}/details   ← too deep, flatten it
```

---

## 2. HTTP Methods — Use Correctly

| Method | Purpose | Idempotent? | Body? |
|---|---|---|---|
| `GET` | Retrieve resource(s) | ✅ Yes | No |
| `POST` | Create a new resource | ❌ No | Yes |
| `PUT` | Replace entire resource | ✅ Yes | Yes |
| `PATCH` | Partial update (specific fields only) | ❌ No | Yes |
| `DELETE` | Remove resource | ✅ Yes | No |

### PUT vs PATCH — important distinction
- `PUT` replaces the **entire** resource. Any field omitted from the body is cleared/reset.
- `PATCH` updates **only the fields sent**. All other fields are untouched.
- Default to `PATCH` for update endpoints unless the client genuinely owns the full resource shape.

```json
// PATCH /api/v1/users/123  — only updates role, email stays unchanged
{ "role": "admin" }

// PUT /api/v1/users/123  — replaces the whole user; omitting email removes it
{ "name": "Alice", "role": "admin" }
```

---

## 3. Standard Response Envelope

Every API response — success or error — MUST use this envelope:

```json
// Single resource
{
  "status": "S",
  "code": 200,
  "data": {
    "id": "usr_123",
    "email": "alice@example.com"
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-01-15T10:30:00Z"
  }
}

// List / paginated
{
  "status": "S",
  "code": 200,
  "data": [ ... ],
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-01-15T10:30:00Z",
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "links": {
    "self":  "/api/v1/users?page=1",
    "next":  "/api/v1/users?page=2",
    "last":  "/api/v1/users?page=8"
  }
}

// Error
{
  "status": "E",
  "code": 400,
  "error": {
    "errorCode": "ERR_USR_002",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Email is required" },
      { "field": "role",  "message": "Role must be admin or member" }
    ]
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-01-15T10:30:00Z"
  }
}
```

### Rules
- `status` is always `"success"` or `"error"` — exact casing.
- `meta.requestId` must always be present — echo back the `X-Request-ID` header value.
- `meta.timestamp` is always ISO 8601 UTC.
- `error.details` is an array — use it for field-level validation errors, empty array otherwise.
- Never expose stack traces, SQL errors, or internal Go error strings in the response body.

---

## 4. HTTP Status Codes

| Scenario | Code |
|---|---|
| Successful GET / PATCH / PUT | 200 |
| Successful POST (resource created) | 201 |
| Successful DELETE (no body) | 204 |
| Validation / bad input | 400 |
| Unauthenticated (missing or invalid token) | 401 |
| Forbidden (authenticated, no permission) | 403 |
| Resource not found | 404 |
| Method not allowed | 405 |
| Conflict / duplicate / idempotency key reuse | 409 |
| Request currently processing (idempotency race) | 409 |
| Unprocessable entity (business rule violation) | 422 |
| Rate limit exceeded | 429 |
| Unexpected server error | 500 |

---

## 5. Pagination

All list endpoints MUST support cursor-based or offset-based pagination. Prefer **cursor-based** for large or frequently-updated datasets — it avoids full table scans.

### Offset-based (simpler, use for small stable datasets)
```
GET /api/v1/users?page=1&limit=20&sort=created_date&order=desc
```

### Cursor-based (preferred for production scale)
```
GET /api/v1/users?limit=20&cursor=eyJpZCI6MTIzfQ&order=desc
```
Response includes `nextCursor` in `meta`:
```json
"meta": {
  "limit": 20,
  "nextCursor": "eyJpZCI6MTQzfQ",
  "hasMore": true
}
```

### Rules
- Never return an unbounded list. Always enforce a server-side max `limit` cap (e.g. 100).
- Default `limit` is 20 if not specified.
- `sort` defaults to `created_date`, `order` defaults to `desc`.

---

## 6. Standard Request Headers

Every request to a protected endpoint must support these headers:

| Header | Purpose | Required? |
|---|---|---|
| `Authorization` | `Bearer <jwt_token>` | Yes (authenticated routes) |
| `Content-Type` | `application/json` | Yes (POST/PUT/PATCH) |
| `X-Request-ID` | Client-generated UUID for tracing | Recommended |
| `Idempotency-Key` | UUID v4 for safe POST/PATCH retry | Required on mutation endpoints |
| `Accept` | `application/json` | Recommended |

Every response must echo back:

| Header | Value |
|---|---|
| `X-Request-ID` | Same value from request (or server-generated if absent) |
| `Content-Type` | `application/json; charset=utf-8` |

---

## 7. Idempotency

POST and PATCH requests are non-idempotent — sending the same request twice may create a duplicate resource or apply the update twice. The `Idempotency-Key` header allows clients to make these requests safe to retry.

### When to require it
- All `POST` endpoints that create resources (orders, payments, users, uploads).
- All `PATCH` endpoints that apply financial or state-critical changes.
- NOT required on `GET`, `PUT`, `DELETE` — these are already idempotent by definition.

### How it works
1. Client sends a `POST` with `Idempotency-Key: <uuid-v4>`.
2. Server processes the request and caches the response keyed by `(userId + idempotencyKey)`.
3. If the same key is received again → return the cached response with header `Idempotent-Replayed: true`.
4. If the same key is received with **different payload** → return `409 Conflict`.
5. If the same key arrives **while still processing** → return `409 Conflict`.
6. Keys expire after **24 hours**.

```
// First request
POST /api/v1/orders
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
→ 201 Created  { "id": "ord_789", ... }

// Retry (network timeout, safe to resend)
POST /api/v1/orders
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
→ 200 OK  { "id": "ord_789", ... }
   Idempotent-Replayed: true
```

### Key format
- UUIDv4 only. Minimum 16 characters, maximum 255 characters.
- Validate the format server-side before processing — reject malformed keys with `400`.

---

## 8. Versioning

URL path versioning is recommended for most APIs because it's explicit, cacheable, and works well with load balancing strategies.

- Use `/api/v1/`, `/api/v2/` URL path versioning.
- Maintain a minimum of **2 versions** simultaneously during any transition.
- A new major version is required only for **breaking changes** (removing fields, changing field types, removing endpoints).
- Adding new optional fields or endpoints is NOT a breaking change — do it in the existing version.
- Use semantic versioning logic: only bump major (`v1` → `v2`) for breaking changes.

### What counts as a breaking change
- Removing a field from a response
- Renaming a field
- Changing a field's type (e.g. string → int)
- Removing an endpoint
- Changing authentication requirements
- Changing a required field to a different validation rule

### What does NOT require a new version
- Adding a new optional field to a response
- Adding a new endpoint
- Adding a new optional query parameter

---

## 9. Deprecation

When an endpoint or version is being retired, signal it clearly via response headers on every call:

```
Deprecation: true
Sunset: Sat, 01 Jan 2027 00:00:00 GMT
Link: <https://docs.example.com/migration/v1-to-v2>; rel="sunset"
```

### Rules
- Industry best practices suggest giving clients at least 6 months between deprecation announcement and the sunset (shutdown) date.
- Add `Deprecation: true` and `Sunset` headers to all responses from a deprecated endpoint from the moment deprecation is announced.
- Never remove a version without a published migration guide in the `Link` header.
- Monitor traffic on deprecated endpoints — never sunset blindly while traffic exists.
- Document the deprecation in your OpenAPI spec (`deprecated: true` on the operation).

---

## 10. Rate Limiting

When a client is rate-limited, return `429 Too Many Requests` with these headers:

```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706000000
Retry-After: 60
```

| Header | Meaning |
|---|---|
| `X-RateLimit-Limit` | Max requests allowed in the window |
| `X-RateLimit-Remaining` | Requests left in current window |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |
| `Retry-After` | Seconds the client must wait before retrying |

Include `X-RateLimit-Limit` and `X-RateLimit-Remaining` on **every** response (not just 429s) so clients can self-throttle.

---

## 11. Search & Filtering

```
GET /api/v1/users?search=alice
GET /api/v1/orders?status=pending&created_after=2026-01-01
GET /api/v1/products?min_price=100&max_price=500&category=electronics
```

- Use query parameters for filtering, never the request body on GET.
- Filter parameter names use `snake_case`.
- Date filters use ISO 8601 format: `2026-01-15T00:00:00Z` or `2026-01-15`.
- Range filters use `_min`/`_max` or `_after`/`_before` suffixes.

---

## 12. API Documentation — OpenAPI

- Every endpoint MUST have an OpenAPI 3.1 specification.
- The spec lives at `backend/docs/openapi.yaml`.
- Serve the interactive docs at `/api/docs` in dev/staging.
- Every endpoint must document: request body schema, all response codes, all headers, and at least one example request/response.
- Mark deprecated operations with `deprecated: true` in the spec.

---

## 13. Forbidden Patterns

| ❌ NEVER | ✅ Instead |
|---|---|
| Verbs in URLs (`/getUser`, `/createOrder`) | Plural noun + HTTP method |
| Raw data outside the response envelope | Always wrap in `status/code/data/meta` |
| Exposing stack traces or SQL in `message` | Log server-side, return `errorCode` + safe message |
| Unbounded list endpoints | Always paginate, enforce server-side `limit` cap |
| Inconsistent status codes (200 for errors) | Follow the status code table above |
| Using `PUT` for partial updates | Use `PATCH` for partial, `PUT` for full replace |
| No `X-Request-ID` echo in responses | Always echo or generate `X-Request-ID` |
| No idempotency support on POST create endpoints | Add `Idempotency-Key` handling |
| Removing a field without a major version bump | Add the new field, deprecate the old one first |
| Sunsetting an endpoint with no `Sunset` header | Always add `Deprecation` + `Sunset` headers |
| Nesting more than 2 levels deep | Flatten — use a top-level resource endpoint |
