---
trigger: always_on
description: >
  Frontend rules for Vue 3 + Vuetify 3. Covers API service pattern,
  Options API enforcement, component/folder structure, router, Vuetify usage,
  bifurcation rule, and Pinia state management.
  Apply to ALL .vue, .js files under frontend/src/.
---

# Frontend Rules — Vue 3 + Vuetify 3

---

## API Calls — STRICT PROHIBITION

- **NEVER** use `axios`, `fetch`, or any HTTP client inside a `.vue` file. No exceptions.
- ALL API logic must live in `frontend/src/services/EventServices.js`.
- Components call service methods only — they never know about URLs or HTTP verbs.

```js
// ✅ CORRECT — in EventServices.js only
export const getDashboardData = async () => {
  const response = await axios.get('/api/v1/dashboard');
  return response.data;
};

// ❌ FORBIDDEN — inside any .vue file
const res = await fetch('/api/v1/dashboard');
```

---

## File & Variable Naming

- Component file names must use **PascalCase**: `UserCard.vue`, `OrderTable.vue`.
- All variable, method, and computed property names must use **camelCase**: `userId`, `fetchOrderData`.
- Variable, method, and computed names must be **meaningful and concise** — avoid names longer than 20 characters.
- Import paths must use **either `@/` or relative `../`** consistently within a project — never mix both styles.

```js
// ✅ CORRECT — consistent @/ imports
import UserCard from '@/components/UserCard/Main.vue'
import { getOrders } from '@/services/EventServices'

// ❌ WRONG — mixed import styles
import UserCard from '@/components/UserCard/Main.vue'
import { getOrders } from '../../services/EventServices'
```

---

## Coding Style

- **Always use Options API** — `data`, `methods`, `computed`, `watch`, `props`, `emits`.
- **Composition API is FORBIDDEN.** Never use `setup()`, `ref()`, `reactive()`, or `<script setup>`.
- Every component `export default {}` must declare `name:` as the first property.
- All props must declare `type` and either `default` or `required: true`.
- Options API blocks must follow this **fixed ordering**: `name` → `props` → `data` → `computed` → `watch` → `methods` → lifecycle hooks.

```js
// ✅ CORRECT — fixed Options API ordering
export default {
  name: 'UserCard',
  props: {
    userId: { type: Number, required: true },
    label:  { type: String,  default: ''   },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    displayLabel() {
      return this.label || 'Unknown'
    },
  },
  watch: {
    userId(newVal) { this.fetchUser(newVal) },
  },
  methods: {
    async fetchUser(id) { ... },
  },
  mounted() {
    this.fetchUser(this.userId)
  },
}
```

---

## JSON Response Mapping

- API/JSON responses must be mapped to a **single variable**. No fallback variables or chained assignments.

```js
// ✅ CORRECT — single variable mapping
const lResponseData = response.data

// ❌ WRONG — fallback variable anti-pattern
const lResponseData = response.data || response.result || {}
```

---

## Directory & File Structure

```
frontend/src/
├── views/                          # Entry points ONLY — import & render Main.vue, nothing else
│   └── [PageName].vue
│
├── components/
│   ├── [FeatureName]/
│   │   ├── Main.vue                # Orchestrator: imports all local sub-components
│   │   └── components/             # Granular UI pieces: Card.vue, Table.vue, Form.vue …
│   │
│   └── CommonFolder/               # Components used by 2+ features/views
│       └── [SharedComponent].vue
│
├── services/
│   └── EventServices.js            # ALL HTTP calls live here — nowhere else
│
├── router/
│   └── index.js                    # All route definitions
│
├── store/
│   └── [featureName].js            # One Pinia module per feature domain
│
└── assets/
    ├── styles/
    └── images/
```

### Layer Rules

| Layer | Responsibility | MUST NOT |
|---|---|---|
| `views/[Page].vue` | Import & render `[Feature]/Main.vue` | Contain any logic, data, or API calls |
| `[Feature]/Main.vue` | Orchestrate sub-components, own feature state | Call API directly (use services) |
| `[Feature]/components/` | Render UI, emit events upward | Own business logic or call services |
| `CommonFolder/` | Shared, reusable UI | Be coupled to any specific feature |
| `EventServices.js` | All HTTP communication | Contain any UI logic |

---

## Router Rules

- All routes defined in `frontend/src/router/index.js`.
- Every route must use **lazy loading**: `component: () => import('@/views/PageName.vue')`
- Every route must have a `name:` property.
- Use `meta: { requiresAuth: true }` on all protected routes.
- Group related routes with nested route objects under a shared path prefix.

```js
// ✅ CORRECT
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/Dashboard.vue'),
  meta: { requiresAuth: true }
}
```

---

## Vuetify 3 Rules

- Use Vuetify components for ALL UI elements. Do not use raw HTML when a Vuetify equivalent exists.
- Use Vuetify spacing/sizing utilities (`ma-`, `pa-`, `col-`) — NEVER inline styles.
- All theming (colors, typography, breakpoints) is configured in the Vuetify plugin file only — never inline.
- Icons must use the `mdi` (Material Design Icons) set unless explicitly agreed otherwise.

---

## File Size Limits

- Any `.vue` file that exceeds **200 lines** MUST be split immediately.
- Each logical section (table, form, filter bar, stats card) becomes its own file in the local `components/` sub-folder.
- Never let a single component own multiple unrelated responsibilities.
- `EventServices.js` must not exceed **300 lines**. If it grows beyond this, split by domain: `OrderServices.js`, `UserServices.js`, etc.
- Each Pinia store file must not exceed **1000 lines**. Split by feature if needed.

---

## Environment Configuration

- All environment-specific values (API base URLs, feature flags) must be stored in `.env` files — never hard-coded.
- Use separate files per environment:

```
frontend/
├── .env              # shared defaults
├── .env.development  # dev overrides
├── .env.staging      # staging overrides
└── .env.production   # production overrides
```

- Access env values only via `import.meta.env.VITE_*` — never via `process.env`.

---

## State Management — Pinia

- Use **Pinia** exclusively. Vuex is not permitted.
- One store module per feature domain. Store files: `frontend/src/store/[featureName].js`.
- Components must NEVER mutate store state directly — always call store actions.

---

## Forbidden Patterns — Frontend

| ❌ NEVER | ✅ Instead |
|---|---|
| `fetch()` or `axios` in any `.vue` file | Call from `EventServices.js` only |
| `setup()`, `ref()`, `reactive()`, `<script setup>` | Options API only |
| Inline styles on Vuetify components | Vuetify utility classes |
| Business logic in `views/` files | Move to `[Feature]/Main.vue` |
| Shared component inside a feature folder | Move to `CommonFolder/` |
| Hard-coded API base URLs | Use `import.meta.env.VITE_API_BASE_URL` |
| Vuex store | Pinia only |
| Component file over 200 lines | Split into sub-components |
