---
trigger: always_on
description: >
  HTML standards for all web pages. Covers file naming, folder structure,
  head section requirements, Bootstrap usage, accessibility, semantic
  structure, and forbidden patterns.
  Apply to ALL .html files in the project.
---

# HTML Standards

---

## File & Folder Structure

Every HTML project must follow this structure:

```
project/
├── [page-name].html          # kebab-case filenames: terms-condition.html
├── images/
│   └── image.png             # all images here
├── css/
│   ├── index.css             # page-specific stylesheets
│   └── terms-condition.css
├── js/
│   ├── index.js              # page-specific scripts
│   └── terms-condition.js
├── document/
│   └── [domain].docx         # downloadable documents
└── services/
    ├── [domain]Service.js    # API call logic
    └── fileReader.js         # file I/O logic
```

- File names must use **kebab-case**: `terms-condition.html`, `user-profile.html`.
- Never use PascalCase, camelCase, or spaces in HTML file names.

---

## `<head>` Section — Mandatory

Every HTML page MUST include all of the following in `<head>`:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description here — 150–160 characters">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  <title>Page Title — Site Name</title>

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

  <!-- External page stylesheet ONLY — no internal or inline CSS -->
  <link rel="stylesheet" href="css/page-name.css">
</head>
```

Missing any of these — `meta charset`, `viewport`, `description`, `keywords`, `title` — is a violation.

---

## CSS Rules — Strictly External Only

- **NEVER** use internal `<style>` tags inside HTML files.
- **NEVER** use inline `style=""` attributes on any element.
- All styles must live in external `.css` files under `css/`.
- Use **Bootstrap utility classes** for layout and spacing: `container`, `row`, `col-`, `d-flex`, `gap-`, etc.
- For any style not covered by Bootstrap, create and use an external stylesheet.

```html
<!-- ✅ CORRECT — Bootstrap utilities + external CSS -->
<div class="hero-section d-flex align-items-center">
  <h1 class="hero-title">Welcome</h1>
</div>

<!-- ❌ WRONG — inline style -->
<div style="display: flex; padding: 60px;">
  <h1 style="font-size: 40px;">Welcome</h1>
</div>

<!-- ❌ WRONG — internal style tag -->
<style>
  .hero { padding: 60px; }
</style>
```

---

## Page Structure — Mandatory

- Every page must have a **single root `<div>`** with a class matching the page name.
- Inside the root div, all content must be divided into **`<section>` elements**.
- Each `<section>` must have a meaningful, descriptive class name.
- Avoid deeply nested, unnecessary `<div>` elements.

```html
<!-- ✅ CORRECT -->
<div class="landingpage">

  <section class="hero-section">
    <h1 class="hero-title">Welcome</h1>
    <p class="hero-subtitle">Build something great.</p>
  </section>

  <section class="feature-section">
    <div class="feature-card">Feature 1</div>
    <div class="feature-card">Feature 2</div>
  </section>

</div>

<!-- ❌ WRONG — no root div, no sections, excessive nesting -->
<div>
  <div>
    <div>
      <div>
        <h1>Welcome</h1>
      </div>
    </div>
  </div>
</div>
```

---

## Accessibility — Mandatory

All interactive and meaningful elements must include accessibility attributes:

- `aria-label` on icons, buttons, and inputs that lack visible text labels.
- `tabindex` on custom interactive elements that are not natively focusable.
- `alt` attribute on every `<img>` — never leave it empty unless the image is purely decorative.
- Use semantic HTML elements (`<nav>`, `<main>`, `<header>`, `<footer>`, `<button>`, `<a>`) over generic `<div>` wherever applicable.

```html
<!-- ✅ CORRECT -->
<button aria-label="Close dialog" tabindex="0">
  <img src="images/close-icon.svg" alt="Close">
</button>

<nav aria-label="Main navigation">
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>

<!-- ❌ WRONG — no accessibility attributes -->
<div onclick="closeDialog()">
  <img src="images/close-icon.svg">
</div>
```

---

## Forbidden Patterns — HTML

| ❌ NEVER | ✅ Instead |
|---|---|
| Inline `style=""` attributes | External CSS file |
| Internal `<style>` tag in `<head>` | External CSS file |
| camelCase or PascalCase file names | kebab-case: `user-profile.html` |
| Missing `<meta>` tags | Include charset, viewport, description, keywords |
| Missing `<title>` | Every page must have a descriptive title |
| Generic `<div>` where semantic element fits | Use `<nav>`, `<main>`, `<header>`, `<section>` |
| Deep unnecessary div nesting | Flatten structure; use sections |
| Images without `alt` attribute | Always add `alt` text |
| Interactive elements without `aria-label` | Add aria-label on all icon buttons |
| Multiple root `<div>` elements per page | Single root div with page class |
