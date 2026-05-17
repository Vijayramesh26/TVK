---
trigger: always_on
description: >
  Backend rules for Golang using Gorilla Mux + GORM. Covers project structure,
  the mandatory 5-step handler pattern, naming conventions, function logging,
  middleware split, integration layer, file I/O rules, repository rules, and
  config rules. Apply to ALL .go files under backend/.
---

# Backend Rules — Golang (Gorilla Mux + GORM)

---

## Project Structure

```
backend/
├── main.go
├── config/
│   └── config.go               # Env loading — ALL config lives here
├── router/
│   └── router.go               # All Gorilla Mux route registrations
├── middleware/
│   ├── common.go               # CORS, recovery, request-id, auth/JWT
│   └── logger.go               # Inbound & outbound request/response logging
├── api/
│   └── [domain]/
│       └── [domain].go         # HTTP handlers — 5-step pattern ONLY
├── services/
│   ├── [domain]_service.go     # Business logic
│   └── file_reader.go          # ALL file I/O — nowhere else
├── models/
│   └── [domain].go             # GORM model structs + request/response structs
├── repository/
│   └── [domain]_repo.go        # All DB queries via GORM
├── integration/
│   └── [provider]/             # Third-party API clients (sendgrid/, stripe/ …)
│       └── client.go
└── errors/
    └── errors.go               # All error code constants ERR_XXX_000
```

---

## Naming Conventions

### Variable Prefixes — MANDATORY

- `l` prefix for all **local** variables: `lErr`, `lRequestData`, `lResponseRec`, `lBatchId`, `lData`.
- `p` prefix for all **parameter** (function argument) variables: `pParameterName`, `pBatchId`, `pHttpWriter`.
- `G` prefix for all **global** variables: `GDb`, `GConfig`, `GOpenDBConnection`.
- HTTP handler parameters are the only exception: use `lHttpWriter` and `lHttpRequest` (local, not params).

```go
// ✅ CORRECT — global variable
var GOpenDBConnection *gorm.DB

// ✅ CORRECT — local and parameter prefixes
func CommunicateMethod(pParameterName string) ([]ResponseArr, error) {
    slog.Info("CommunicateMethod (+)")
    lData, lErr := SelectRecordsMethod(pParameterName)
    if lErr != nil {
        return nil, fmt.Errorf("CommunicateMethod - Error: %s", lErr.Error())
    }
    // ...
}

// ❌ WRONG — missing prefixes
func CommunicateMethod(parameterName string) ([]ResponseArr, error) {
    data, err := SelectRecordsMethod(parameterName)
}
```

### Variable Length Rule

- Variable names must **not exceed 15 characters**.
- Loop index variables must use **`Idx` as suffix**: `userIdx`, `orderIdx`, `itemIdx`.

```go
// ✅ CORRECT
for userIdx, lUser := range lUsers {
    // ...
}

// ❌ WRONG — no Idx suffix, too long
for index, currentUserRecord := range lUsers {
    // ...
}
```

### Struct Naming

- Request structs: `[Feature]RequestStruct` — e.g. `CreateUserRequestStruct`
- Response wrapper: `[Feature]ResponseStruct` — e.g. `CreateUserResponseStruct`
- Response array item: `[Feature]ResponseArr` — e.g. `UserResponseArr`

```go
type CreateUserResponseStruct struct {
    ResponseArr []UserResponseArr `json:"responseArr"`
    Status      string            `json:"status"`
    ErrMsg      string            `json:"errMsg"`
}

type UserResponseArr struct {
    UserId string `json:"userId"`
    Email  string `json:"email"`
}

type CreateUserRequestStruct struct {
    Email  string `json:"email"  validate:"required"`
    RoleId int    `json:"roleId" validate:"required"`
}
```

### Function Naming

- Handler step functions: `CollectMethod`, `ValidateMethod`, `ConstructMethod`, `CommunicateMethod`, `CompleteMethod`.
- DB query functions: `SelectRecordsMethod`, `InsertRecordMethod`, `UpdateRecordMethod`, `DeleteRecordMethod`.
- All function names end with `Method` suffix.

---

## Mandatory Function Documentation

Every function MUST include a documentation block immediately above the `func` declaration:

```go
/*
Purpose   : Fetches order records from the database based on batch ID.
Parameter : pBatchId (string) — the batch identifier to filter orders
Response  : Returns a slice of OrderResponseArr and an error.

On Success:
===========
Returns populated OrderResponseArr slice with order records.

On Error:
=========
Returns empty slice and error details. The calling function must handle the error.

Author       : VIJAY
Created Date : 25-03-2026
*/
func SelectOrdersMethod(pBatchId string) ([]OrderResponseArr, error) {
    slog.Info("SelectOrdersMethod (+)")
    defer slog.Info("SelectOrdersMethod (-)")
    // ...
}
```

---

## Error Code Naming Convention

Error codes must follow the pattern: `PackageName + ApiName + FunctionName` (first letter of each) + occurrence number.

```go
// Package: order, API: CreateOrder, Function: CollectMethod, occurrence: 001
// → ERR_COC_001

// Package: user, API: GetUser, Function: ValidateMethod, occurrence: 001
// → ERR_UGV_001
```

All error codes must be declared as constants in `backend/errors/errors.go`.

---

## Mandatory 5-Step Handler Pattern

Every HTTP handler MUST follow these five steps using `goto Complete` for all error flow.
Each step is a separate named function — never inline step logic inside the handler body.

```go
// SampleAPI handles the main API logic
func SampleAPI(lHttpWriter http.ResponseWriter, lHttpRequest *http.Request) {
    log.Println("SampleAPI (+)")

    // Set CORS headers
    lHttpWriter.Header().Set("Access-Control-Allow-Origin", "*")
    lHttpWriter.Header().Set("Access-Control-Allow-Credentials", "true")
    lHttpWriter.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    lHttpWriter.Header().Set("Access-Control-Allow-Headers", "USER, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

    var lResponseRec ResponseStruct

    if lHttpRequest.Method == http.MethodPost {

        // 1. COLLECT — read and unmarshal the incoming request body
        var lRequestData RequestStruct
        lErr := CollectMethod(lHttpRequest, &lRequestData)
        if lErr != nil {
            log.Println("SampleAPI:001 - Error in CollectMethod:", lErr)
            lResponseRec.Status = "Error"
            lResponseRec.ErrMsg = "ERR_XXX_001 - Error in request collection: " + lErr.Error()
            goto Complete
        }

        // 2. VALIDATE — validate the collected data
        lErr = ValidateMethod(lRequestData)
        if lErr != nil {
            log.Println("SampleAPI:002 - Validation failed:", lErr)
            lResponseRec.Status = "Error"
            lResponseRec.ErrMsg = "ERR_XXX_002 - Validation failed: " + lErr.Error()
            goto Complete
        }

        // 3. CONSTRUCT — build domain objects from validated data
        lBatchId, lErr := ConstructMethod(lRequestData)
        if lErr != nil {
            log.Println("SampleAPI:003 - Construction error:", lErr)
            lResponseRec.Status = "Error"
            lResponseRec.ErrMsg = "ERR_XXX_003 - Data construction failed: " + lErr.Error()
            goto Complete
        }

        // 4. COMMUNICATE — interact with services/DB
        lResponseArr, lErr := CommunicateMethod(lBatchId)
        if lErr != nil {
            log.Println("SampleAPI:004 - Communication error:", lErr)
            lResponseRec.Status = "Error"
            lResponseRec.ErrMsg = "ERR_XXX_004 - Communication failure: " + lErr.Error()
            goto Complete
        }

        lResponseRec.ResponseArr = lResponseArr
        lResponseRec.Status = "Success"
    }

Complete:
    // 5. COMPLETE — single exit point, always reached
    CompleteMethod(lResponseRec, lHttpWriter)
    log.Println("SampleAPI (-)")
}
```

### Step Function Implementations

**1. CollectMethod** — `io.ReadAll` + `json.Unmarshal` only. Never use `json.NewDecoder` in handlers.

```go
func CollectMethod(lHttpRequest *http.Request, lRequestData *RequestStruct) error {
    log.Println("CollectMethod (+)")
    lBody, lErr := io.ReadAll(lHttpRequest.Body)
    if lErr != nil {
        return errors.New("failed to read request body")
    }
    if lErr = json.Unmarshal(lBody, lRequestData); lErr != nil {
        return errors.New("failed to unmarshal request data")
    }
    log.Println("CollectMethod (-)")
    return nil
}
```

**2. ValidateMethod** — always initialise a fresh `validator.New()` inside the function.

```go
func ValidateMethod(lRequestData RequestStruct) error {
    log.Println("ValidateMethod (+)")
    lValidate := validator.New()
    if lErr := lValidate.Struct(lRequestData); lErr != nil {
        return errors.New("request validation failed")
    }
    log.Println("ValidateMethod (-)")
    return nil
}
```

**3. ConstructMethod** — derives/builds domain data from validated input. Never writes to DB here.

```go
func ConstructMethod(lRequestData RequestStruct) (string, error) {
    log.Println("ConstructMethod (+)")
    lBatchId := fmt.Sprintf("BATCH-%s-%d", lRequestData.Param1, lRequestData.Param2)
    if lRequestData.Param2 > 10 {
        lBatchId += "-HIGH"
    } else {
        lBatchId += "-LOW"
    }
    log.Println("ConstructMethod (-)")
    return lBatchId, nil
}
```

**4. CommunicateMethod** — all DB/service calls happen here via named query functions.

```go
func CommunicateMethod(pParameterName string) (lResponseArr []ResponseArr, lErr error) {
    log.Println("CommunicateMethod (+)")
    lData, lErr := SelectRecordsMethod(pParameterName)
    if lErr != nil {
        log.Println("CommunicateMethod: Error in SelectRecordsMethod", lErr.Error())
        return lResponseArr, fmt.Errorf("CommunicateMethod - Error: %s", lErr.Error())
    }
    lResponseArr = []ResponseArr{
        {Field1: lData, Field2: 1},
    }
    log.Println("CommunicateMethod (-)")
    return lResponseArr, nil
}
```

**5. CompleteMethod** — sole exit point. Marshals and writes the response.

```go
func CompleteMethod(lResponseRec ResponseStruct, lHttpWriter http.ResponseWriter) {
    log.Println("CompleteMethod (+)")
    lData, lErr := json.Marshal(lResponseRec)
    if lErr != nil {
        http.Error(lHttpWriter, "Error marshaling response: "+lErr.Error(), http.StatusInternalServerError)
        return
    }
    lHttpWriter.WriteHeader(http.StatusOK)
    lHttpWriter.Write(lData)
    log.Println("CompleteMethod (-)")
}
```

---

## Error Numbering Inside Handlers

Each error path in a handler gets a sequential 3-digit inline log code `HandlerName:NNN`:

```go
log.Println("SampleAPI:001 - Error in CollectMethod:", lErr)
log.Println("SampleAPI:002 - Validation failed:", lErr)
log.Println("SampleAPI:003 - Construction error:", lErr)
log.Println("SampleAPI:004 - Communication error:", lErr)
```

The `ErrMsg` field returned to the client must embed the error code:
`"ERR_DOMAIN_001 - <human readable message>"`

---

## Response Struct Convention

```go
type ResponseStruct struct {
    ResponseArr []ResponseArr `json:"responseArr"` // always present; empty slice on error
    Status      string        `json:"status"`      // "Success" or "Error" — exact casing
    ErrMsg      string        `json:"errMsg"`      // empty string "" on success
}
```

- `Status` is always exactly `"Success"` or `"Error"` — no other values.
- `ErrMsg` is `""` on success — never omit the field.
- `ResponseArr` is `[]` on error — never omit the field.

---

## Mandatory Function Logging

Every function — handler, service, repository, util — MUST have:

- Entry: `log.Println("FunctionName (+)")` — note the space before `(`
- Exit: `log.Println("FunctionName (-)")`
- Use `defer` when a function has multiple return paths.

```go
// ✅ Multiple return paths — use defer
func GetUserByID(pId uint) (*models.User, error) {
    log.Println("GetUserByID (+)")
    defer log.Println("GetUserByID (-)")
    // ...
}
```

Missing `(+)` / `(-)` logs is a violation. Every function, no exceptions.

---

## Resource Management — MANDATORY

### DB & Row Cleanup

- `rows.Close()` must be called after every query that returns rows — use `defer rows.Close()`.
- `db.Close()` must be called on application shutdown.
- Always validate `rows.Err()` after iterating over rows.

```go
/*
Purpose   : Retrieves all orders matching the given batch ID.
Parameter : pBatchId (string) — batch identifier
Response  : Returns slice of OrderResponseArr and error.

On Success:
===========
Returns populated order records.

On Error:
=========
Returns error; caller must handle.

Author       : VIJAY
Created Date : 25-03-2026
*/
func SelectOrdersMethod(pBatchId string) ([]OrderResponseArr, error) {
    slog.Info("SelectOrdersMethod (+)")
    defer slog.Info("SelectOrdersMethod (-)")

    lRows, lErr := GOpenDBConnection.Raw("SELECT id, userId FROM orders WHERE batchId = ?", pBatchId).Rows()
    if lErr != nil {
        return nil, fmt.Errorf("SelectOrdersMethod: query failed: %w", lErr)
    }
    defer lRows.Close() // MANDATORY

    var lOrders []OrderResponseArr
    for lRows.Next() {
        var lOrder OrderResponseArr
        if lErr = GOpenDBConnection.ScanRows(lRows, &lOrder); lErr != nil {
            return nil, fmt.Errorf("SelectOrdersMethod: scan failed: %w", lErr)
        }
        lOrders = append(lOrders, lOrder)
    }

    // MANDATORY — always check rows.Err() after iteration
    if lErr = lRows.Err(); lErr != nil {
        return nil, fmt.Errorf("SelectOrdersMethod: rows error: %w", lErr)
    }

    return lOrders, nil
}
```

### RowsAffected Validation

- All `INSERT` and `UPDATE` operations MUST validate `RowsAffected` to confirm the operation succeeded.

```go
lResult := GOpenDBConnection.Create(&lOrder)
if lResult.Error != nil {
    return fmt.Errorf("InsertOrderRecordMethod: %w", lResult.Error)
}
if lResult.RowsAffected == 0 {
    return fmt.Errorf("InsertOrderRecordMethod: no rows inserted")
}
```

### File & Temp Resource Cleanup

- All opened files must be closed — use `defer file.Close()`.
- Temporary files must be deleted after use — use `defer os.Remove(tmpFile.Name())`.

```go
lFile, lErr := os.CreateTemp("", "upload-*.csv")
if lErr != nil {
    return fmt.Errorf("failed to create temp file: %w", lErr)
}
defer os.Remove(lFile.Name()) // MANDATORY — delete after use
defer lFile.Close()
```

---

## Middleware Rules

All middleware lives in `backend/middleware/`. Two files only.

**`common.go`** must provide:

- CORS headers
- **Panic recovery with error logging** — MANDATORY on all routes
- Request ID injection (`X-Request-ID`)
- Auth/JWT validation
- **Context timeout** — all requests must have a timeout set via context

```go
// Context timeout — apply to every request
func TimeoutMiddleware(pNext http.Handler) http.Handler {
    return http.HandlerFunc(func(lW http.ResponseWriter, lR *http.Request) {
        lCtx, lCancel := context.WithTimeout(lR.Context(), 30*time.Second)
        defer lCancel()
        pNext.ServeHTTP(lW, lR.WithContext(lCtx))
    })
}
```

**`logger.go`** must log every inbound request AND outbound response:

```
[INBOUND]  2024-01-01T12:00:00Z | POST /api/v1/users | IP: 192.168.1.1 | ReqID: abc123 | UA: ...
[OUTBOUND] 2024-01-01T12:00:00Z | POST /api/v1/users | Status: 200 | Duration: 14ms | ReqID: abc123
```

---

## Graceful Shutdown

The application MUST implement graceful shutdown — never use `os.Exit()` directly. Allow in-flight requests to complete before stopping.

```go
lServer := &http.Server{Addr: ":" + lPort, Handler: lMux}

// Start server in goroutine
go func() {
    if lErr := lServer.ListenAndServe(); lErr != http.ErrServerClosed {
        slog.Error("main: server error", "error", lErr)
    }
}()

// Wait for OS signal
lQuit := make(chan os.Signal, 1)
signal.Notify(lQuit, syscall.SIGINT, syscall.SIGTERM)
<-lQuit

lCtx, lCancel := context.WithTimeout(context.Background(), 30*time.Second)
defer lCancel()
lServer.Shutdown(lCtx)
```

---

## Code Quality Rules

- **No `fmt.Print`, `fmt.Println`, or `fmt.Printf`** in any production code. Use `slog` exclusively.
- **No logging inside loops** — log before and after the loop, not on every iteration.
- **No DB queries inside loops** — batch queries before the loop, never call the DB per iteration.
- **No deprecated packages** — always use current standard library alternatives.
- **Static/config values must not be hard-coded** — store in TOML or config files, load via `Config` struct.
- **API handler files must not exceed 2000 lines** — split by operation if needed.
- **Always use the `helpers` package** for reusable logic shared across API handlers (e.g. response builders, validators, header readers).

```go
// ❌ WRONG — query inside loop
for userIdx, lUser := range lUsers {
    lOrders, _ := SelectOrdersByUserMethod(lUser.Id) // DB call per iteration
}

// ✅ CORRECT — batch before loop
lAllOrders, lErr := SelectOrdersByUsersMethod(lUserIds)
for userIdx, lUser := range lUsers {
    lUserOrders := filterByUser(lAllOrders, lUser.Id)
}
```

---

## Integration Rules

- ALL third-party API calls live EXCLUSIVELY in `backend/integration/[provider]/client.go`.
- Handlers and services MUST NEVER import `net/http` for external API calls.
- Retry logic and circuit-breaking live inside the integration layer — never in handlers.

---

## File I/O Rules

- ALL file reading/writing must be in `backend/services/file_reader.go`.
- FORBIDDEN elsewhere: `os.Open`, `os.ReadFile`, `bufio.Scanner`, `ioutil.ReadFile`.
- Expose named functions: `ReadCSV(pPath string)`, `ReadJSON(pPath string, pTarget interface{})`.

---

## Repository Layer Rules

- No raw SQL strings. GORM methods only.
- Receive `*gorm.DB` via dependency injection — never a global variable.
- Function naming: `SelectRecordsMethod`, `InsertRecordMethod`, `UpdateRecordMethod`, `DeleteRecordMethod`.
- Every function must handle and return errors. Never swallow (`_ = ...` is forbidden).

---

## Configuration Rules

- Load all config once at startup in `backend/config/config.go`.
- `os.Getenv()` is FORBIDDEN outside `config.go`.
- Pass the `Config` struct as a dependency.

---

## Forbidden Patterns — Backend

| ❌ NEVER                                               | ✅ Instead                                         |
| ------------------------------------------------------ | -------------------------------------------------- |
| Variables without `l` / `p` prefix                     | `lErr`, `lData`, `pParameterName`                  |
| `json.NewDecoder` in handlers                          | `io.ReadAll` + `json.Unmarshal` in `CollectMethod` |
| `return` on errors inside handler body                 | `goto Complete` with `lResponseRec.ErrMsg` set     |
| Multiple exit points in a handler                      | Single `Complete:` label → `CompleteMethod`        |
| Step logic inlined in handler                          | Each step is its own `XxxMethod` function          |
| Missing sequential error codes (`SampleAPI:001`)       | Log `HandlerName:NNN` at each error point          |
| `os.Open` / `ioutil.ReadFile` outside `file_reader.go` | Use `file_reader.go` functions                     |
| Third-party HTTP calls outside `integration/`          | `integration/[provider]/client.go`                 |
| Raw SQL strings                                        | GORM query builder                                 |
| Global `db` variable                                   | Inject `*gorm.DB`                                  |
| Missing `log.Println("Func (+/-)")`                    | Entry/exit log on every function                   |
| `os.Getenv()` outside `config.go`                      | Injected `Config` struct                           |
| Swallowed errors (`_ = someFunc()`)                    | Handle and return/log all errors                   |
