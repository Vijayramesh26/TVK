---
trigger: always_on
description: >
  Database rules for PostgreSQL and MariaDB via GORM. Covers mandatory audit
  columns, file-upload staging pattern, multi-dialect support, migration
  conventions, and indexing rules.
  Apply to ALL files under backend/models/, backend/repository/, backend/migrations/.
---

# Database Rules — PostgreSQL / MariaDB via GORM

---

## Table Design Rules

- Every table MUST have an `id` column as the primary key with **auto-increment**.
- Table names and column names must use **camelCase**: `orderItems`, `userId`, `createdDate`.
- Never use snake_case or PascalCase for table or column names.

```sql
-- ✅ CORRECT
CREATE TABLE orderItems (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  userId      INT NOT NULL,
  productName VARCHAR(255) NOT NULL,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ❌ WRONG — snake_case column names
CREATE TABLE order_items (
  user_id     INT,
  product_name VARCHAR(255)
);
```

---

## Database Connection Rules

- All DB connection configuration MUST include:
  - `maxOpenConnections` — maximum number of open connections
  - `maxIdleConnections` — maximum number of idle connections
  - `connectionPoolSize` — size of the connection pool

```go
lDb, lErr = gorm.Open(mysql.Open(lDsn), &gorm.Config{})
lSqlDb, _ := lDb.DB()
lSqlDb.SetMaxOpenConns(25)
lSqlDb.SetMaxIdleConns(10)
lSqlDb.SetConnMaxLifetime(5 * time.Minute)
```

- A **global `openDBConnection` variable** must be initialised once at startup and reused across the entire application. Never open a new connection per request.
- Database connections **must always be properly closed** — call `db.Close()` on shutdown and `rows.Close()` after every query.

---

## NULL / NVL Handling

- Every SQL query that may return NULL values MUST handle them explicitly.
- Use `COALESCE` (PostgreSQL) or `IFNULL` (MariaDB/MySQL) for all nullable columns in queries.
- GORM model fields for nullable columns must use pointer types or `sql.NullString` / `sql.NullInt64`.

```go
// ✅ CORRECT — pointer type for nullable field
type Order struct {
    gorm.Model
    BaseModel
    Notes *string `gorm:"column:notes" json:"notes"`
}

// ✅ CORRECT — COALESCE in raw query
SELECT id, COALESCE(notes, '') as notes FROM orders WHERE id = ?
```

---

## Query Safety Rules

- Never use single-line functions on **indexed columns** in WHERE clauses — it disables index usage.
- Always validate concatenated values before concatenation — never concatenate unvalidated user input.

```sql
-- ❌ WRONG — function on indexed column kills index
SELECT * FROM users WHERE UPPER(email) = 'TEST@EXAMPLE.COM';

-- ✅ CORRECT — store normalised values, query directly
SELECT * FROM users WHERE email = 'test@example.com';
```

---

## Mandatory Audit Columns

**Every table, without exception**, must have these six columns:

| Column | Type | Behavior |
|---|---|---|
| `created_by` | VARCHAR(100) | Set on INSERT, never changed |
| `updated_by` | VARCHAR(100) | Set on INSERT and every UPDATE |
| `created_date` | TIMESTAMP | Auto-set on INSERT |
| `updated_date` | TIMESTAMP | Auto-set on INSERT and UPDATE |
| `created_program` | VARCHAR(100) | Name of the program/API that created the record |
| `updated_program` | VARCHAR(100) | Name of the program/API that last updated the record |

Embed `BaseModel` in every GORM model struct — no exceptions:

```go
type BaseModel struct {
    CreatedBy      string    `gorm:"column:createdBy;not null"          json:"createdBy"`
    UpdatedBy      string    `gorm:"column:updatedBy;not null"          json:"updatedBy"`
    CreatedDate    time.Time `gorm:"column:createdDate;autoCreateTime"  json:"createdDate"`
    UpdatedDate    time.Time `gorm:"column:updatedDate;autoUpdateTime"  json:"updatedDate"`
    CreatedProgram string    `gorm:"column:createdProgram;not null"     json:"createdProgram"`
    UpdatedProgram string    `gorm:"column:updatedProgram;not null"     json:"updatedProgram"`
}

// ✅ Every model embeds BaseModel
type User struct {
    gorm.Model
    BaseModel
    Email string `gorm:"uniqueIndex;not null"`
}
```

---

## Staging Pattern for File Uploads

Every file-upload feature requires **two tables**: `[name]_stage` and `[name]`.

### Stage table must include (on top of audit columns):
- `status` — ENUM or VARCHAR: `PENDING` / `VALID` / `ERROR`
- `error_message` — VARCHAR/TEXT, nullable

### Processing logic MUST follow this exact sequence:

1. Insert ALL uploaded rows into `[name]_stage` with `status = 'PENDING'`.
2. Run all validation rules against `[name]_stage` rows.
3. **On full pass** → move rows (INSERT into `[name]` + DELETE from `[name]_stage`).
4. **On any failure** → mark the failing row `status = 'ERROR'`, populate `error_message`. Do NOT touch `[name]`. Do NOT partially commit.

Never insert directly into the main table from a file upload. Always go through the stage table.

---

## Multi-Dialect GORM Support

The application must support both MariaDB and PostgreSQL via a dialect switch at startup in `backend/config/config.go`:

```go
func InitDB(cfg config.Config) (*gorm.DB, error) {
    log.Println("InitDB(+)")
    defer log.Println("InitDB(-)")

    var db *gorm.DB
    var err error

    switch cfg.DBDialect {
    case "postgres":
        dsn := fmt.Sprintf(
            "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
            cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName,
        )
        db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    case "mariadb", "mysql":
        dsn := fmt.Sprintf(
            "%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
            cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName,
        )
        db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
    default:
        return nil, fmt.Errorf("ERR_DB_001: unsupported dialect: %s", cfg.DBDialect)
    }

    return db, err
}
```

---

## Migration Rules

- `AutoMigrate` is **permitted in development only**. It is FORBIDDEN in staging and production builds.
- In staging/production, use versioned SQL migration files managed by `golang-migrate` or equivalent.
- Migration file naming: `YYYYMMDDHHMMSS_description.up.sql` / `YYYYMMDDHHMMSS_description.down.sql`.
- Never drop a column in a migration without a prior deprecation cycle (at least one release marking it unused).
- Every migration file must be idempotent where possible.

---

## Indexing Rules

- All foreign key columns MUST have an index.
- All columns used in `WHERE` clauses of frequently-called queries MUST be indexed.
- Composite indexes must include a comment in the migration file justifying why the composite is needed.

---

## Forbidden Patterns — Database

| ❌ NEVER | ✅ Instead |
|---|---|
| Table without all 4 audit columns | Embed `BaseModel` in every GORM model |
| Direct INSERT to main table from file upload | Stage → validate → promote pattern |
| `AutoMigrate` in staging or production | Versioned `.up.sql` / `.down.sql` files |
| Unindexed foreign key columns | Add index on every FK column |
| Dropping a column without deprecation | Mark unused first, drop in next release |
| Raw SQL strings in repository layer | GORM query builder methods only |
