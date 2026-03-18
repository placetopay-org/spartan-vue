---
name: spartan-vue
description: >-
  Build UIs and work with Spartan Vue — a Vue 3 component library (68 components) by PlaceToPay,
  built with TailwindCSS v4, TypeScript, and class-variance-authority (CVA). Use this skill whenever
  the user mentions Spartan Vue components (SButton, SInput, SModal, SDTable, SAlert, SBadge, etc.),
  asks to create/edit/test/document components following Spartan patterns, works with CVA styling,
  usePassthrough(), or the Spartan docs site. Also trigger when the user imports from
  '@placetopay/spartan-vue', references component files in src/components/spartan/, or asks about
  Vue 3.5+ patterns with reactive destructuring. Even if the user just says "add a button" or
  "create a form" in a Spartan Vue project context, use this skill.
---

# Spartan Vue Component Library

Spartan Vue is a **Vue 3 component library** (68 components) by PlaceToPay. Package: `@placetopay/spartan-vue`.

**Stack**: Vue 3.5+, TailwindCSS v4, TypeScript, class-variance-authority (CVA), tailwind-merge.

---

## Quick Start

```bash
npm install -D @placetopay/spartan-vue
```

```css
/* styles.css */
@import "@placetopay/spartan-vue/styles.css";
@source '../src/**/*.{vue,js,ts}';
```

```ts
// main.ts
import './styles.css'
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

```vue
<script setup>
import { SButton } from '@placetopay/spartan-vue'
</script>

<template>
  <SButton variant="primary">Click me</SButton>
</template>
```

For full installation details, read `references/consumer/installation-guide.md`.

## Import Paths

| Path | What it provides |
|------|-----------------|
| `@placetopay/spartan-vue` | All components + i18n helpers |
| `@placetopay/spartan-vue/styles.css` | Complete styles (includes Inter font) |
| `@placetopay/spartan-vue/styles/plugin.css` | Styles without Inter font |
| `@placetopay/spartan-vue/styles/spartan-vue.css` | Component-only styles |
| `@placetopay/spartan-vue/locales` | Translation files (es, en, pt, it, fr) |

## Component Categories

| Category | Components | Description |
|----------|-----------|-------------|
| **Data Input** | SInput, SSelect, SInputDate, SCombobox, STextarea, SInputAmount, SInputMask, SInputPassword, SInputIncrement, SInputOtp, SInputTag | Form fields for capturing user data |
| **Selectors** | SCheckbox, SRadio, SRadioGroup, SSwitch, SSelector, SMultiSelector | Toggle and selection controls |
| **Display** | SAlert, SBadge, SCard, SToast, SLink, SAvatar, SBreadcrumbs, SCaption, SSkeleton | Visual feedback and content display |
| **Modals & Overlays** | SModal, SModalCard, SModalConfirm, SModalLeft, SModalSide, SPopover, STooltip, SDropdown | Overlays, dialogs, and floating UI |
| **Structure & Layout** | SDTable, STable, SAccordion, STab, SPaginator, SSidebar, SSteps, SStackedList, SButtonGroup, STemplateHeaderTable | Page structure and data layout |
| **Utilities** | SButton, SLabel, SFilter, SCopy, SColorSwitch | Actions, labels, and utility controls |
| **Typography** | SPageTitle, SSectionTitle, SSectionDescription | Text heading components |

**Block Variants**: Input components have `*Block` wrappers (SInputBlock, SSelectBlock, SComboboxBlock, etc.) that add label, help text, and error UI via BlockWrapper.

For the complete API of every component (props, emits, slots), read `references/consumer/components-api.md`.

---

## Customization

### Theme Colors

Override the primary palette using CSS variables in `@theme`, placed **after** the Spartan `@import`:

```css
@import "@placetopay/spartan-vue/styles.css";
@source '../src/**/*.{vue,js,ts}';

@theme {
  --color-spartan-primary-50:  rgb(228 242 253);
  --color-spartan-primary-100: rgb(187 222 251);
  /* ... 50 through 900 */
  --color-spartan-primary-900: rgb(13 42 84);
}
```

For the default palette values and all CSS utilities, read `references/consumer/theme-customization.md`.

### Passthrough (pt) — Style Internal Elements

Customize internal parts of a component using `pt:` attributes:

```vue
<!-- Class shorthand -->
<SBadge pt:body="text-red-500 font-bold" />

<!-- Attribute syntax -->
<SCard pt:title:class="text-2xl" pt:title:data-testid="card-title" />

<!-- Object prop -->
<SDTable :pt="{ thead: { class: 'bg-gray-50 dark:bg-gray-800' } }" />
```

16 components support passthrough. For the complete key reference by component, read `references/consumer/passthrough-reference.md`.

### Internationalization (i18n)

Components with internal text (SDTable, SFilter, SModalConfirm, etc.) use `vue-i18n`:

```ts
import { createI18n } from 'vue-i18n'
import { es, en } from '@placetopay/spartan-vue/locales'

const i18n = createI18n({
  legacy: false,  // Required for Composition API
  locale: 'en',
  messages: { es, en },
})

app.use(i18n)
```

5 languages supported: es, en, pt, it, fr. For helpers and component-to-key mapping, read `references/consumer/i18n-guide.md`.

---

## Key Patterns

### v-model Binding

Form components use `modelValue` + `update:modelValue`:

```vue
<SInput v-model="name" placeholder="Enter name" />
<SCheckbox v-model="agreed">I agree</SCheckbox>
<SSelect v-model="country">
  <option value="CO">Colombia</option>
</SSelect>
```

### Polymorphic `as` Prop

Components can render as different HTML elements or Vue components:

```vue
<SButton>Click me</SButton>                    <!-- renders <button> -->
<SButton as="a" href="/next">Link</SButton>     <!-- renders <a> -->
<SButton :as="RouterLink" to="/dashboard">Nav</SButton>
```

### Form States

All form components accept `disabled` and `error` props:

```vue
<SInput v-model="email" :error="!isValid" disabled />
```

`error` shows a red border and red focus ring. `disabled` applies reduced opacity.

### Block Variants

Block variants add label, help text, and error message UI around a form component:

```vue
<SInputBlock
  v-model="email"
  label="Email"
  help="We'll never share your email"
  error="Invalid email format"
/>
```

Available blocks: SInputBlock, SSelectBlock, SComboboxBlock, SInputDateBlock, STextAreaBlock, SInputAmountBlock, SInputMaskBlock, SInputPasswordBlock, SInputIncrementBlock, SInputOtpBlock, SSelectorBlock, SCustomBlock.

### Dark Mode

All components support dark mode automatically. Spartan defines `@custom-variant dark (&:where(.dark, .dark *))`. Just add `class="dark"` to your root `<html>` element.

### Icons

Components accepting icons use `FunctionalComponent` type props:

```vue
<script setup>
import { AddIcon } from '@placetopay/iconsax-vue/bold'
</script>

<SButton :icon="AddIcon">Add item</SButton>
<SAlert :icon="AddIcon" title="Success" color="success" />
```

---

## For Contributors

This section covers patterns for developing inside the Spartan Vue repository.

### Repository Structure

Every component lives in `src/components/spartan/S{Name}/`:

```
SButton/
├── SButton.vue        # Vue 3 <script setup> component
├── SButton.test.ts    # Vitest + @testing-library/vue tests
├── types.ts           # TypeScript props with bilingual JSDoc (@en/@es)
├── styles.ts          # CVA variant definitions
└── index.ts           # Re-exports
```

### Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Docs dev server |
| `npm run build` | Full library build |
| `npm run test` | Vitest watch mode |
| `npx vitest run src/components/spartan/SName/SName.test.ts` | Single test |
| `npm run foli` | Format + Lint |
| `npm run typecheck` | TypeScript type checking |

### Code Patterns

- **Vue 3.5+**: Reactive destructuring with defaults for `defineProps` (no `withDefaults`)
- **Same-name shorthand**: `:id` instead of `:id="id"` in templates
- **CVA styling**: All variants in `styles.ts` using `class-variance-authority` + `createBooleanVariation`
- **Bilingual JSDoc**: `@en` and `@es` tags on all prop types

For detailed contributor guides:
- **Styling & CVA**: `references/contributor/styling-guide.md`
- **Testing**: `references/contributor/testing-guide.md`
- **Documentation site**: `references/contributor/docs-guide.md`
- **Component catalog (internals)**: `references/contributor/components-catalog.md`

### Path Aliases

| Alias | Path |
|-------|------|
| `@/*` | `./src/*` |
| `@spartan*` | `./src/components/spartan` |
| `@internal*` | `./src/components/internal` |

### Build Pipeline

`npm run build` = Vite (per-component) → vue-tsc (types) → Rollup (plugin) → copy locales → copy CSS → sanitize.
