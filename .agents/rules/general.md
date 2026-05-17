---
trigger: always_on
description: >
  Core engineering principles, git standards, and error code conventions.
  Applies to every task across all layers of the stack.
---

# General Principles

- **Consistency over cleverness.** Readable, predictable code always beats clever one-liners.
- **Single Responsibility.** Every file, function, and component must have exactly one clear purpose.
- **No dead code.** Never leave commented-out code, unused imports, or TODOs without an issue reference.
- **Environment variables only.** Never hard-code secrets, connection strings, or environment-specific values.
  - Go: read via injected `Config` struct (populated once in `config.go` — see `backend.md`).
  - Vue: read via `import.meta.env.VITE_*`.
- **Fail loud in dev, fail gracefully in prod.** Always log full errors server-side; never leak internal details to HTTP clients.

---

## Project Directory Layout

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   ├── components/
│   │   │   └── CommonFolder/
│   │   ├── services/
│   │   │   └── EventServices.js
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── store/
│   │   └── assets/
│   ├── .env
│   └── vite.config.js
│
├── backend/
│   ├── main.go
│   ├── config/
│   ├── router/
│   ├── middleware/
│   ├── handlers/
│   ├── services/
│   │   └── file_reader.go
│   ├── models/
│   ├── repository/
│   ├── integration/
│   ├── utils/
│   ├── errors/
│   ├── migrations/
│   └── .env
│
└── docker-compose.yml
```

---

## Error Code Standards

Format: `ERR_[DOMAIN]_[3-DIGIT-NUMBER]`

| Prefix | Domain |
|---|---|
| `ERR_AUTH_` | Authentication & Authorization |
| `ERR_USR_` | User management |
| `ERR_DB_` | Database operations |
| `ERR_FILE_` | File I/O & uploads |
| `ERR_INT_` | Third-party integrations |
| `ERR_VAL_` | Input validation |
| `ERR_SYS_` | Unexpected system errors |

- All error codes MUST be declared as constants in `backend/errors/errors.go`.
- Stack traces, SQL errors, and internal Go error messages must NEVER appear in HTTP responses.
- Log the full error server-side; return only the error code and a human-readable message to the client.

```go
const (
    ErrAuthTokenMissing  = "ERR_AUTH_001"
    ErrAuthTokenInvalid  = "ERR_AUTH_002"
    ErrUserNotFound      = "ERR_USR_001"
    ErrUserEmailRequired = "ERR_USR_002"
    ErrDBConnection      = "ERR_DB_001"
)
```

---

## Git & Commit Standards

### Branch Naming
```
feature/[ticket-id]-short-description
fix/[ticket-id]-short-description
hotfix/[ticket-id]-short-description
chore/short-description
```

### Commit Message Format (Conventional Commits)
```
<type>(<scope>): <short summary>

Types: feat | fix | docs | style | refactor | test | chore
Scope: frontend | backend | db | auth | [feature-name]

Examples:
feat(backend): add staging pattern for invoice upload
fix(frontend): correct API service call in Dashboard Main.vue
chore(db): add audit columns migration for orders table
```

### Pull Request Rules
- PRs must not exceed 400 lines of change (excluding generated files).
- Every PR must reference an issue/ticket.
- No self-merge. At least one review required.
