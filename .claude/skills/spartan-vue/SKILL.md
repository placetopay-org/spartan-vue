---
name: spartan-vue
description: >-
  Consume Spartan Vue — PlaceToPay's Vue 3 component library
  (`@placetopay/spartan-vue`) — from any Vue 3 / Nuxt project. Built on TailwindCSS v4
  + class-variance-authority. Use this skill when the user mentions Spartan Vue
  components (`SButton`, `SInput`, `SSelector`, `SDTable`, `SAlert`, `SBadge`, `SModal`,
  etc.), imports from `@placetopay/spartan-vue`, configures Spartan styles or i18n,
  customizes a component via `pt:` (passthrough), or asks "how do I build {form |
  modal | table} with Spartan." Even if the user only says "add a button" or "create
  a form" while working in a project that depends on Spartan, use this skill. Skip
  this skill when working **inside the spartan-vue repo itself** — that repo's own
  CLAUDE.md covers contributor patterns.
---

# Spartan Vue (consumer)

`@placetopay/spartan-vue` is PlaceToPay's Vue 3 component library. Stack: Vue 3.5+, TailwindCSS v4, TypeScript, class-variance-authority + tailwind-merge under the hood.

This skill helps you **consume** Spartan from another project. For working on the library itself, the spartan-vue repo has its own `CLAUDE.md`.

---

## Find a component

Use `references/components-index.md` to map a need (e.g. "multi-select", "side modal", "data table") to the right `S*` import name. From there:

- Trust your editor's TypeScript IntelliSense — every prop has bilingual JSDoc (`@en` / `@es`).
- Or read the shipped `.d.ts`: `node_modules/@placetopay/spartan-vue/dist/components/SXxx/types.d.ts`.
- Or browse the live docs site (interactive playground per prop/slot).

Don't guess prop names from training data — Spartan's API drifts and the published types are the source of truth.

---

## Quick start

```bash
npm install -D @placetopay/spartan-vue
```

```css
/* styles.css */
@import "@placetopay/spartan-vue/styles.css";
@source '../src/**/*.{vue,js,ts}';
```

```vue
<script setup>
import { SButton } from '@placetopay/spartan-vue'
</script>

<template>
  <SButton variant="primary">Click me</SButton>
</template>
```

For the full installation walkthrough (Vite/Nuxt configs, plugin variants, font handling), read `references/installation-guide.md`.

### Import paths

| Path | What it provides |
|------|-----------------|
| `@placetopay/spartan-vue` | All components + i18n helpers |
| `@placetopay/spartan-vue/styles.css` | Complete styles (includes Inter font) |
| `@placetopay/spartan-vue/styles/plugin.css` | Styles without Inter font |
| `@placetopay/spartan-vue/styles/spartan-vue.css` | Component-only styles |
| `@placetopay/spartan-vue/locales` | Translation files (es, en, pt, it, fr) |
| `@placetopay/spartan-vue/i18n` | i18n bootstrap helpers |

---

## Key usage patterns

### `v-model`

Form components emit `update:modelValue`:

```vue
<SInput v-model="name" placeholder="Enter name" />
<SCheckbox v-model="agreed">I agree</SCheckbox>
<SSelect v-model="country">
  <option value="CO">Colombia</option>
</SSelect>
```

### Polymorphic `as`

`SButton`, `SLink`, `STabItem`, etc. accept `as` to render as a different element or component:

```vue
<SButton>Click me</SButton>                     <!-- <button> -->
<SButton as="a" href="/next">Link</SButton>     <!-- <a> -->
<SButton :as="RouterLink" to="/dashboard">Nav</SButton>
```

### Form states

Every form component accepts `disabled` and `error`. `error` paints a red border + ring; `disabled` reduces opacity and blocks input.

### Block variants

`*Block` wrappers add label / helpText / errorText UI around a base form component:

```vue
<SInputBlock
  v-model="email"
  label="Email"
  help-text="We'll never share your email"
  :error-text="errorMessage"
/>
```

The 10 blocks: `SInputBlock`, `SInputAmountBlock`, `SInputDateBlock`, `SInputIncrementBlock`, `SInputMaskBlock`, `SInputOtpBlock`, `SInputPasswordBlock`, `SSelectBlock`, `SSelectorBlock`, `STextAreaBlock`.

Block wrappers forward the base component's named scoped slots — e.g. on `SSelectorBlock` you can pass `<template #trigger="{ option }">…</template>` and `<template #option="{ option }">…</template>` exactly as you would on `SSelector`.

### Dark mode

Add `class="dark"` to your root `<html>` element (or toggle it dynamically). Spartan defines `@custom-variant dark (&:where(.dark, .dark *))` so every component reacts automatically — you don't need to opt in per component.

### Icons

Components with icon props expect a Vue `FunctionalComponent`:

```vue
<script setup>
import { AddIcon } from '@placetopay/iconsax-vue/bold'
</script>

<SButton :icon="AddIcon">Add item</SButton>
<SAlert :icon="AddIcon" title="Success" color="success" />
```

Recommended icon packs: `@placetopay/iconsax-vue` (PlaceToPay's set, with `bold` / `outline` / `linear` variants), `@heroicons/vue`. Any FunctionalComponent works — Lucide, custom SVG components, etc.

### Custom slot scope (selectors)

Many components expose scoped slots so you can render rich content. Common ones:

```vue
<SSelector v-model="country" :options="countries" option-label="name" option-value="id">
  <!-- Trigger button content (gets the resolved option object, even when modelValue is the primitive id) -->
  <template #trigger="{ option, placeholder }">
    <span v-if="option" class="flex items-center gap-2">{{ option.flag }} {{ option.name }}</span>
    <span v-else class="text-gray-400">{{ placeholder }}</span>
  </template>

  <!-- Each dropdown option -->
  <template #option="{ option }">
    <span class="flex items-center gap-2">{{ option.flag }} {{ option.name }}</span>
  </template>
</SSelector>
```

`SSelectorBlock` and `SMultiSelector` expose the same slots (in `SMultiSelector` the trigger scope is `{ options: TOption[], placeholder }` — an array of resolved selections).

---

## Customization

### Theme colors

Override the primary palette using CSS variables in `@theme`, placed **after** the Spartan import:

```css
@import "@placetopay/spartan-vue/styles.css";

@theme {
  --color-spartan-primary-50:  rgb(228 242 253);
  /* ... 50 through 900 */
  --color-spartan-primary-900: rgb(13 42 84);
}
```

For the default palette, all CSS utility classes Spartan exposes, and how to override semantic ring/focus tokens, read `references/theme-customization.md`.

### Passthrough (`pt:`) — style internal elements

Customize internal parts of a component without subclassing:

```vue
<SBadge pt:body="text-red-500 font-bold" />
<SCard pt:title:class="text-2xl" pt:title:data-testid="card-title" />
<SDTable :pt="{ thead: { class: 'bg-gray-50 dark:bg-gray-800' } }" />
```

Three syntaxes:
- `pt:key="classes"` — class shorthand
- `pt:key:attribute="value"` — set any HTML attribute on the inner element
- `:pt="{ key: { class, ...attrs } }"` — object form for full control

Components that support passthrough: `SAccordion`, `SBadge`, `SButton`, `SCard`, `SDTable`, `SDefinitionTerm`, `SInputTag`, `SModal`, `SSelect`, `SSelector`, `SMultiSelector`, `SStackedListItem` (the leaf, not `SStackedList`), `STabItem` (the leaf, not `STab`).

For the per-component key reference (which inner element each `pt:` key targets), read `references/passthrough-reference.md`.

### Internationalization (i18n)

Components that render internal text use `vue-i18n`. Bootstrap once:

```ts
import { createI18n } from 'vue-i18n'
import { es, en } from '@placetopay/spartan-vue/locales'

const i18n = createI18n({
  legacy: false,  // required for Composition API
  locale: 'en',
  messages: { es, en },
})

app.use(i18n)
```

5 locales ship: `en`, `es`, `pt`, `it`, `fr`.

Components that need translations: `SCopy`, `SFilter`, `SModalConfirm`, `SMultiSelector`, `SPaginator`, `STemplateHeaderTable`. `SSelector` and `SInputDate` consume translations through internal sub-components.

If you only use components without internal text (`SButton`, `SInput`, `SAlert`, `SBadge`, etc.), you can technically skip i18n — but installing it is recommended so you're ready when you add a component that needs it.

For the `$spartan` namespace map, helpers, and dynamic locale switching, read `references/i18n-guide.md`.
