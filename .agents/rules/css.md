---
trigger: always_on
description: >
  CSS standards for all stylesheets. Covers variable definition, file structure,
  selector hierarchy, naming conventions, media queries, and forbidden patterns.
  Apply to ALL .css files in the project.
---

# CSS Standards

---

## File Naming & Organisation

- CSS file names must use **kebab-case** matching the HTML page they style: `terms-condition.css`, `user-profile.css`.
- One CSS file per HTML page — never mix styles for multiple pages in one file.
- Shared/common styles that appear on multiple pages go in `common.css`.

---

## Variable Definition

- ALL CSS custom properties (variables) must be defined at the top of the file inside `:root`.
- Never hard-code colors, font sizes, or spacing values directly in rules — always reference a variable.

```css
/* ✅ CORRECT — all variables in :root */
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --text-color: #333333;
  --bg-color: #ffffff;
  --font-size-base: 16px;
  --font-size-heading: 40px;
  --spacing-sm: 20px;
  --spacing-md: 40px;
  --spacing-lg: 60px;
  --border-radius: 8px;
}

/* ❌ WRONG — hardcoded values scattered in rules */
.hero-title {
  color: #0d6efd;
  font-size: 40px;
}
```

---

## File Structure & Grouping

Styles must be grouped **page-wise then section-wise** in this exact order:

```css
/* ================= VARIABLES ================= */
:root { }

/* ================= GLOBAL / RESET ================= */
/* Only if truly global — keep minimal */

/* ================= PAGE NAME ================= */
.pagename { }

/* ===== SECTION NAME ===== */
.pagename .section-name { }
.pagename .section-name .element-name { }

/* Hover */
.pagename .section-name .element-name:hover { }

/* Media Queries — immediately after section styles */
@media (max-width: 1024px) {
  .pagename .section-name .element-name { }
}

@media (max-width: 576px) {
  .pagename .section-name .element-name { }
}

/* ===== NEXT SECTION ===== */
```

Full example:

```css
/* ================= VARIABLES ================= */
:root {
  --primary-color: #0d6efd;
  --text-color: #333;
  --spacing-lg: 60px;
}

/* ================= LANDING PAGE ================= */
.landingpage {
  background-color: var(--bg-color);
}

/* ===== HERO SECTION ===== */
.landingpage .hero-section {
  padding: var(--spacing-lg);
}

.landingpage .hero-section .hero-title {
  font-size: var(--font-size-heading);
  color: var(--text-color);
}

/* Hover */
.landingpage .hero-section .hero-title:hover {
  color: var(--primary-color);
}

/* ===== MEDIA QUERY — HERO ===== */
@media (max-width: 1024px) {
  .landingpage .hero-section .hero-title {
    font-size: 30px;
  }
}

@media (max-width: 576px) {
  .landingpage .hero-section {
    padding: var(--spacing-sm);
  }
  .landingpage .hero-section .hero-title {
    font-size: 24px;
  }
}

/* ===== FEATURE SECTION ===== */
.landingpage .feature-section {
  padding: var(--spacing-md);
}

.landingpage .feature-section .feature-card {
  border-radius: var(--border-radius);
}
```

---

## Selector Hierarchy — MANDATORY

All selectors must follow the three-level hierarchy. Never write flat global rules for page-specific elements.

```
.page-name .section-name .element-name
```

```css
/* ✅ CORRECT — scoped hierarchy */
.landingpage .hero-section .hero-title { }
.dashboard .stats-section .stat-card { }

/* ❌ WRONG — flat global selector */
.hero-title { }
.stat-card { }
```

---

## Naming Convention — kebab-case Only

All class names must use **kebab-case**. Never use camelCase, PascalCase, or underscores.

| Type | Naming Pattern | Examples |
|---|---|---|
| Page wrapper | page identity word | `landingpage`, `homepage`, `dashboard` |
| Sections | `[name]-section` | `hero-section`, `about-section`, `feature-section` |
| Elements | `[name]-[type]` | `hero-title`, `feature-card`, `nav-link` |

---

## Media Queries — Mandatory Two Breakpoints

Every section that has responsive behaviour must define media queries at **both breakpoints**, placed immediately after the section's base styles:

- **1024px** — tablet breakpoint
- **576px** — mobile breakpoint

```css
/* ❌ WRONG — media query at end of file */
.hero-section { padding: 60px; }
.feature-section { padding: 40px; }

@media (max-width: 576px) {
  .hero-section { padding: 20px; }
  .feature-section { padding: 20px; }
}

/* ✅ CORRECT — media query immediately after section */
.landingpage .hero-section { padding: 60px; }

@media (max-width: 1024px) {
  .landingpage .hero-section { padding: 40px; }
}

@media (max-width: 576px) {
  .landingpage .hero-section { padding: 20px; }
}

.landingpage .feature-section { padding: 40px; }

@media (max-width: 1024px) {
  .landingpage .feature-section { padding: 24px; }
}

@media (max-width: 576px) {
  .landingpage .feature-section { padding: 16px; }
}
```

---

## Forbidden Patterns — CSS

| ❌ NEVER | ✅ Instead |
|---|---|
| Hard-coded color values in rules | Define in `:root`, reference via `var(--name)` |
| camelCase or PascalCase class names | kebab-case only |
| Global styles for page-specific elements | Scope with `.pagename .section .element` |
| Media queries scattered at end of file | Place immediately after each section's styles |
| Duplicated / redundant rules | Keep styles DRY; extract to `:root` variables |
| Missing 1024px or 576px breakpoint | Both breakpoints required per section |
| Internal `<style>` in HTML | Always use external `.css` files |
| Overriding Bootstrap core with `!important` | Use scoped selectors with sufficient specificity |
