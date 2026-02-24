# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spartan Vue is a Vue 3 component library (68 components) by PlaceToPay, built with TailwindCSS v4 and TypeScript. Package: `@placetopay/spartan-vue`. This is a **library**, not an application.

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Nuxt docs dev server (alias: `npm run docs:dev`) |
| `npm run build` | Full library build: Vite → types → Rollup → locales → CSS → sanitize |
| `npm run test` | Vitest watch mode with UI & coverage |
| `npm run test:ci` | CI test run with coverage |
| `npx vitest run src/components/spartan/SButton/SButton.test.ts` | Run a single test file |
| `npm run lint` | ESLint with auto-fix (`.ts`, `.vue`) |
| `npm run format` | Prettier formatting |
| `npm run foli` | Format + Lint combined |
| `npm run typecheck` | TypeScript type checking via `vue-tsc` |

## Architecture

### Component Structure

Every component lives in `src/components/spartan/S{Name}/` with this standard layout:

```
SButton/
├── SButton.vue        # Vue 3 <script setup> component
├── SButton.test.ts    # Vitest + @testing-library/vue tests
├── types.ts           # TypeScript prop types with bilingual JSDoc (@en/@es)
├── styles.ts          # CVA (class-variance-authority) variant definitions
└── index.ts           # Re-exports component + types
```

Internal shared components live in `src/components/internal/` (InputContainer, Transitions, etc.).

### Key Patterns

- **Vue 3.5+ syntax**: Use reactive destructuring with defaults for `defineProps` (no `withDefaults`). Use same-name shorthand for bindings: `:variant` instead of `:variant="variant"`.
- **Styling**: All variant styling uses CVA (`class-variance-authority`) with `tailwind-merge` for class composition. Never use inline conditional classes — define variants in `styles.ts`.
- **Pass-through props**: Components use `usePassthrough()` from `@/helpers` to allow deep customization of internal elements.
- **Polymorphic rendering**: Many components accept an `as` prop to render as different HTML elements or Vue components.
- **i18n**: Components using internal text depend on `vue-i18n`. Translations live in `src/locales/` (es, en, pt, it, fr) under the `$spartan` namespace.

### Path Aliases

| Alias | Path |
|-------|------|
| `@/*` | `./src/*` |
| `@spartan*` | `./src/components/spartan` |
| `@internal*` | `./src/components/internal` |

### Code Style

- **Prettier**: Single quotes, 4-space indent, 120 char line width, Tailwind class sorting plugin
- **ESLint**: `vue/vue3-recommended` + `@typescript-eslint/recommended` + Prettier integration
- `@typescript-eslint/no-explicit-any` is OFF
- Ignores: `dist/`, `src/components/deprecated/`

### Testing

- Framework: Vitest with `jsdom` environment and `vitest/globals` (no imports needed for `describe`, `test`, `expect`)
- Uses `@testing-library/vue` (`render`) and `@testing-library/dom` (`screen`)
- `vue-i18n` is globally mocked in `src/vitest-setup.ts` — `useI18n().t()` returns the key string
- Test files: `src/components/spartan/**/*.test.ts`

### Documentation Site

The docs site is a Nuxt 4 app in `docs/`. Each component needs bilingual docs:

- English: `docs/content/en/2.components/{category}/{n}.{slug}.md`
- Spanish: `docs/content/es/2.components/{category}/{n}.{slug}.md`
- Status tracking: `docs/app/data/componentStatus.ts` — the `tests` field represents **coverage percentage** (e.g., `100` means 100% coverage), not the number of test cases

Categories: `1.data-input`, `2.selectors`, `3.display`, `4.modals`, `5.structure`, `6.utilities`

Documentation uses the `::component-preview` directive for interactive examples, backed by `.vue` files in `docs/examples/SName/`.

#### First example convention: Usage playground

The **first `::component-preview`** in every component doc page is always the **"Usage"** (Uso) example and must function as a full playground. Its corresponding example file in `docs/examples/` must call `usePreview()` with `mode: 'playground'` and `component: 'SComponentName'`. This registers all relevant props and slots as interactive controls, giving readers a full-featured sandbox.

All subsequent examples focus on a single feature and use **feature-mode controls** (pill toggle group for `select` props, toggle switch for `boolean` props). Feature examples call `usePreview()` without `mode` (defaults to `'feature'`) and only define the protagonist prop(s).

```typescript
// Usage example (basic.vue) — full playground
usePreview({
    mode: 'playground',
    component: 'SButton',
    props: {
        variant: { type: 'select', options: ['primary', 'secondary', ...], default: 'primary' },
        size:    { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
        disabled: { type: 'boolean', default: false },
    },
    slots: {
        default: { default: 'Click me', label: 'Label' },
    },
})

// Feature example (sizes.vue) — minimal pill bar, only the protagonist prop
usePreview({
    props: {
        size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: 'size' },
    },
})
```

The `ComponentPreview.vue` component automatically generates **live code** from the current control values (showing clean, copyable code without `controls.` references). The code panel always reflects the current state of the controls.

**IMPORTANT:** For all component documentation tasks, use the `document-component` skill (`/document-component SComponentName`). This skill contains the complete workflow, quality rules, and bilingual templates needed to generate correct documentation.

#### Static code blocks do NOT render in docs

The docs site **only renders components via the `::component-preview` directive**. Static `` ```vue `` code blocks are displayed as plain code snippets — they do NOT render a live component. Always prefer `::component-preview` for interactive examples. Only use static code blocks when the feature absolutely requires Vue components as props (FunctionalComponent), callback functions, or named slots with HTML/component content.

#### Icons in `::component-preview` examples

Import icons directly in the `.vue` example file from `@placetopay/iconsax-vue/bold`. Only bold iconsax icons are reliably available in the docs site (the site auto-imports from that package). Heroicons and iconsax `outline`/`linear` variants can be imported normally in the `.vue` file but are not auto-resolved elsewhere.

### Build Pipeline

The `npm run build` command runs a multi-step pipeline:
1. **Vite** — Library mode build with per-component entry points (generated by `scripts/components.js`)
2. **vue-tsc** — TypeScript declaration generation
3. **Rollup** — Bundles the Tailwind plugin (`plugin.mjs`/`plugin.cjs`)
4. **Copy locales** — Copies `src/locales/` to `dist/locales/`
5. **Copy CSS** — Copies stylesheets to `dist/styles/`
6. **Sanitize** — Cleans up the build output

### Key Dependencies

- `@headlessui/vue` — Unstyled accessible UI primitives
- `@floating-ui/vue` — Popover/tooltip positioning
- `@heroicons/vue` and `@placetopay/iconsax-vue` — Icon libraries
- `@tanstack/vue-table` — Data table engine (used by SDTable)
- `@vuepic/vue-datepicker` — Date picker (used by SInputDate)
- `class-variance-authority` — Type-safe style variants
- `tailwind-merge` — Smart Tailwind class merging
- `zod` — Schema validation
- `imask` — Input masking
