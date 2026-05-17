---
trigger: always_on
description: >
  JavaScript standards for all web page scripts. Covers file structure,
  variable naming, document ready wrapper, function organisation, selector
  usage, and forbidden patterns.
  Apply to ALL .js files under js/ and services/.
---

# JavaScript Standards

---

## File Structure

```
js/
├── common.js         # shared reusable utilities — used on all pages
├── index.js          # page-specific logic for index.html
├── terms-condition.js # page-specific logic for terms-condition.html
└── dashboard.js      # page-specific logic for dashboard.html

services/
├── [domain]Service.js  # API calls for a specific domain
└── fileReader.js        # all file I/O logic
```

- File names must use **kebab-case**: `terms-condition.js`, `user-profile.js`.
- One JS file per HTML page for page-specific logic.
- All reusable utilities must live in `common.js`.
- API calls must live in `services/[domain]Service.js` — never inline in page JS files.

---

## Variable Naming

- All variable names must use **camelCase**: `userId`, `orderTotal`, `isLoading`.
- Variable names must be **meaningful** — avoid single-letter names outside of counters.
- Avoid names longer than 20 characters.

```js
// ✅ CORRECT
let userId = '';
let orderTotal = 0;
let isLoading = false;

// ❌ WRONG — single letter, unclear
let u = '';
let t = 0;
let x = false;
```

---

## Document Ready Wrapper — MANDATORY

All JavaScript code must be wrapped inside `$(document).ready()`. Code must never execute outside of this wrapper.

```js
// ✅ CORRECT — all code inside document ready
$(document).ready(function () {
  initPage();
  bindEvents();
});

function initPage() {
  fetchOrders();
}

function bindEvents() {
  $('.submit-btn').on('click', handleSubmit);
}

// ❌ WRONG — code executing at top level
fetchOrders();
$('.submit-btn').on('click', handleSubmit);
```

---

## Function Organisation

- Separate all logic into **named, single-purpose functions**.
- Functions must be defined outside of `$(document).ready()` and called from within it.
- Group functions by purpose with a comment header:

```js
$(document).ready(function () {
  initPage();
  bindEvents();
});

/* ===== INIT ===== */
function initPage() {
  fetchOrders();
}

/* ===== EVENTS ===== */
function bindEvents() {
  $('.submit-btn').on('click', handleSubmit);
  $('.reset-btn').on('click', handleReset);
}

/* ===== API CALLS ===== */
function fetchOrders() {
  OrderService.getAll()
    .then(function (lResponse) {
      renderOrders(lResponse.data);
    })
    .catch(function (lErr) {
      showError(lErr.message);
    });
}

/* ===== RENDER ===== */
function renderOrders(pOrders) {
  // ...
}

/* ===== HELPERS ===== */
function showError(pMessage) {
  // ...
}
```

---

## Selector Rules

- Use **class selectors** (`.submit-btn`) over ID selectors (`#submitBtn`) wherever possible.
- ID selectors are permitted only when exactly one element exists on the page and will never be repeated.
- Cache selectors in variables at the top of the function — never re-query the DOM multiple times for the same element.

```js
// ✅ CORRECT — cached class selector
function bindEvents() {
  let lSubmitBtn = $('.submit-btn');
  lSubmitBtn.on('click', handleSubmit);
}

// ❌ WRONG — ID selector, re-queried multiple times
$('#submitBtn').on('click', handleSubmit);
$('#submitBtn').addClass('active');
$('#submitBtn').prop('disabled', true);
```

---

## Global Variables

- **Avoid global variables.** All variables must be declared inside functions or closures.
- If a value must be shared across functions, pass it as a parameter — do not declare it at the file's top level.

```js
// ❌ WRONG — global variable
let currentUserId = '';

$(document).ready(function () {
  currentUserId = '123';
  fetchOrders();
});

// ✅ CORRECT — passed as parameter
$(document).ready(function () {
  let lUserId = '123';
  fetchOrders(lUserId);
});

function fetchOrders(pUserId) {
  // use pUserId
}
```

---

## `common.js` — Shared Utilities

The `common.js` file must contain only functions that are used on **two or more pages**. Examples of what belongs here:

- Date formatting utilities
- Number formatting utilities
- Generic error display functions
- Common API headers builder
- Toast / notification helpers

```js
// common.js

/* ===== DATE UTILS ===== */
function formatDate(pDate) {
  return new Date(pDate).toLocaleDateString('en-IN');
}

/* ===== NOTIFICATIONS ===== */
function showToast(pMessage, pType) {
  // bootstrap toast or similar
}

/* ===== API HELPERS ===== */
function getAuthHeaders() {
  return {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    'Content-Type': 'application/json',
  };
}
```

---

## Forbidden Patterns — JavaScript

| ❌ NEVER | ✅ Instead |
|---|---|
| Code outside `$(document).ready()` | Always wrap in document ready |
| Global variables | Pass values as function parameters |
| ID selectors for repeated elements | Use class selectors |
| Re-querying the same DOM element multiple times | Cache selector in a variable |
| Inline API calls in page JS files | Use `services/[domain]Service.js` |
| `console.log` in production code | Remove before committing |
| camelCase or PascalCase file names | kebab-case only |
| Logic mixed with rendering in one function | Separate into named single-purpose functions |
| `var` declarations | Use `let` or `const` |
