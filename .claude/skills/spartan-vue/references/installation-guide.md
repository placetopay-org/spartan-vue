# Installation & Setup Guide

Reference for AI assistants helping consumers install and configure `@placetopay/spartan-vue`.

## Requirements

| Dependency     | Version          |
|----------------|------------------|
| Node.js        | `20.19` or `^22.12` |
| NPM            | `^10`            |
| TailwindCSS    | `^4`             |
| Vue            | `3`              |

The consumer must have a working Vue 3 project with TailwindCSS v4 already configured before installing Spartan.

## Install Package

The package is installed as a dev dependency:

```bash
# npm
npm install -D @placetopay/spartan-vue

# pnpm
pnpm add -D @placetopay/spartan-vue

# yarn
yarn add --dev @placetopay/spartan-vue
```

### pnpm users

pnpm requires flat hoisting for Spartan to resolve correctly. Create or update `.npmrc` in the project root:

```ini
# .npmrc
shamefully-hoist=true
```

Then reinstall dependencies (`pnpm install`).

## Configure TailwindCSS v4

TailwindCSS v4 is configured entirely from CSS (no `tailwind.config.js`). Two directives are required in the consumer's main stylesheet:

```css
/* styles.css */
@import "@placetopay/spartan-vue/styles.css";

@source '../src/**/*.{vue,js,ts}';
```

### Rules

1. **`@import` must come first** -- before any custom styles, `@theme` blocks, or other `@import` statements.
2. **`@source` must include the consumer's Vue files** -- Tailwind uses this to scan for utility classes. Adjust the glob pattern to match the project structure.

## Import Styles in Entry Point

The stylesheet must be imported in the application entry point so it is included in the build:

```ts
// main.ts
import './styles.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

`import './styles.css'` should be the **first import** in `main.ts`.

## Use Components

All components are tree-shakeable. Import them individually:

```vue
<script setup>
import { SButton } from '@placetopay/spartan-vue'
</script>

<template>
  <SButton>Create</SButton>
</template>
```

No plugin registration or `app.use()` call is needed. Components are used directly after import.

## Import Paths Reference

| What          | Import Path                                    |
|---------------|------------------------------------------------|
| Components    | `@placetopay/spartan-vue`                      |
| Main styles   | `@placetopay/spartan-vue/styles.css`           |
| Locales (i18n)| `@placetopay/spartan-vue/locales`              |
| Plugin CSS    | `@placetopay/spartan-vue/styles/plugin.css`    |
| Component CSS | `@placetopay/spartan-vue/styles/spartan-vue.css` |

## Theme Customization (Optional)

Spartan ships a default primary color palette. Consumers override it with CSS variables inside a `@theme` block, placed **after** the Spartan `@import`:

```css
@import "@placetopay/spartan-vue/styles.css";

@source '../src/**/*.{vue,js,ts}';

@theme {
  --color-spartan-primary-50:  rgb(228 242 253);
  --color-spartan-primary-100: rgb(187 222 251);
  --color-spartan-primary-200: rgb(144 202 249);
  --color-spartan-primary-300: rgb(100 181 246);
  --color-spartan-primary-400: rgb(66 165 245);
  --color-spartan-primary-500: rgb(33 150 243);
  --color-spartan-primary-600: rgb(30 132 229);
  --color-spartan-primary-700: rgb(25 103 196);
  --color-spartan-primary-800: rgb(21 78 148);
  --color-spartan-primary-900: rgb(13 42 84);
}
```

**Color format:** Values must use `rgb()` with space-separated channels, **no commas** (e.g. `rgb(33 150 243)`, not `rgb(33, 150, 243)`).

## Separate Style Imports (Excluding the Inter Font)

Spartan bundles the Inter font by default. If the consumer already uses a different typeface, they can import the style files separately to skip the font:

```css
@import "tailwindcss";
@import "@placetopay/spartan-vue/styles/plugin.css";
@import "@placetopay/spartan-vue/styles/spartan-vue.css";

@source '../src/**/*.{vue,js,ts}';
```

This replaces the single `@import "@placetopay/spartan-vue/styles.css"` line. Use this approach only when the Inter font is unwanted.

## Common Issues

### Styles not applying

**Cause:** Missing `@import` or `@source` directive in the stylesheet, or the stylesheet is not imported in `main.ts`.

**Checklist:**
1. `@import "@placetopay/spartan-vue/styles.css"` is present in the CSS file.
2. `@source` glob covers the project's `.vue`, `.js`, and `.ts` files.
3. The CSS file is imported in `main.ts` as the first import.

### Primary colors not working

**Cause:** `@theme` block is placed before the Spartan `@import`, or color values use comma-separated RGB.

**Fix:** Move `@theme` after `@import` and use `rgb(R G B)` format without commas.

### Module not found: @placetopay/spartan-vue

**Cause:** Package is not installed or node_modules is out of sync.

**Fix:** Reinstall the package (`npm install -D @placetopay/spartan-vue`) and verify `node_modules/@placetopay/spartan-vue/` exists.

### pnpm module resolution errors

**Cause:** pnpm's strict node_modules structure.

**Fix:** Add `shamefully-hoist=true` to `.npmrc` and run `pnpm install`.

### Component internal texts not translating

**Cause:** `vue-i18n` is not configured. Some components include default text (buttons, placeholders) that relies on i18n.

**Fix:** Install `vue-i18n`, register it as a plugin with `legacy: false`, and import Spartan's locale files from `@placetopay/spartan-vue/locales`. See the i18n guide for details.

### Unrecognized TypeScript types

**Cause:** `tsconfig.json` may explicitly exclude the Spartan package from `node_modules`.

**Fix:** Ensure `node_modules/@placetopay/spartan-vue` is not excluded in `tsconfig.json`.
