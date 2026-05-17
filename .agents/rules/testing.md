---
trigger: always_on
description: >
  Testing standards for Go (backend) and Vue 3 (frontend). Covers file
  placement, naming conventions, required coverage, and tooling.
  Apply when writing or reviewing any test file.
---

# Testing Standards

---

## Go — Backend Testing

### File Placement & Naming
- Test files must be co-located with the file they test, named `[filename]_test.go`.
- Test function naming: `TestFunctionName_Scenario` (PascalCase, underscore-separated scenario).

```go
// ✅ CORRECT
func TestCreateUser_Success(t *testing.T)      { ... }
func TestCreateUser_MissingEmail(t *testing.T) { ... }
func TestCreateUser_DuplicateEmail(t *testing.T) { ... }
```

### Tooling
- Use Go's built-in `testing` package. No third-party test frameworks unless explicitly agreed.
- Use `net/http/httptest` for handler tests — never spin up a real server for unit tests.
- Use table-driven tests for functions with multiple input/output scenarios.

### Coverage Requirements
- Every service function must have at least one **happy-path** test and one **error-path** test.
- Repository tests must run against a **dedicated test database** — suffixed `_test`, separate from dev/prod.
- Never mock the database in repository tests — test against a real DB instance.

### Test Database
- Use environment variable `DB_NAME_TEST` to point to the test DB.
- Seed required data in `TestMain` or per-test setup. Clean up after each test.

---

## Vue — Frontend Testing

### File Placement
- Test files live in a `__tests__/` folder inside the component's feature folder.
- Test file naming: `[ComponentName].spec.js`.

```
[FeatureName]/
├── Main.vue
├── components/
│   └── Card.vue
└── __tests__/
    ├── Main.spec.js
    └── Card.spec.js
```

### Tooling
- Use **Vitest** as the test runner.
- Use **Vue Test Utils** for mounting and interacting with components.
- Mock all API calls — never let tests make real HTTP requests.

### Coverage Requirements
Every component test must cover:
1. **Prop rendering** — does the component render correctly given various prop values?
2. **Emitted events** — does the component emit the correct events with the correct payloads?
3. **Conditional UI** — do `v-if` / `v-show` blocks behave correctly across states?

Every function in `EventServices.js` must have a unit test with the HTTP client mocked.

### Example
```js
// ✅ CORRECT — UserCard.spec.js
import { mount } from '@vue/test-utils'
import UserCard from '../components/UserCard.vue'

describe('UserCard', () => {
  it('renders the user label prop', () => {
    const wrapper = mount(UserCard, { props: { userId: 1, label: 'Alice' } })
    expect(wrapper.text()).toContain('Alice')
  })

  it('emits select event on click', async () => {
    const wrapper = mount(UserCard, { props: { userId: 1, label: 'Alice' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
  })
})
```

---

## Forbidden Patterns — Testing

| ❌ NEVER | ✅ Instead |
|---|---|
| Real HTTP calls in frontend tests | Mock with `vi.mock` or `axios-mock-adapter` |
| Spinning up a real server in Go handler tests | Use `net/http/httptest` |
| Sharing state between tests | Isolate each test; clean up in `t.Cleanup` or `afterEach` |
| Test files in a separate top-level `tests/` folder | Co-locate with the file under test |
| Missing error-path test for a service function | Always test both happy path and error path |
