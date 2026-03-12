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

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Docs dev server |
| `npm run build` | Full library build |
| `npm run test` | Vitest watch mode |
| `npx vitest run src/components/spartan/SName/SName.test.ts` | Single test |
| `npm run foli` | Format + Lint |

## Component Structure

Every component lives in `src/components/spartan/S{Name}/`:

```
SButton/
├── SButton.vue        # Vue 3 <script setup> component
├── SButton.test.ts    # Vitest + @testing-library/vue tests
├── types.ts           # TypeScript props with bilingual JSDoc (@en/@es)
├── styles.ts          # CVA variant definitions
└── index.ts           # Re-exports
```

## Core Patterns

### 1. Vue 3.5+ Reactive Destructuring (NO withDefaults)

```typescript
// CORRECT — reactive destructuring with inline defaults
const {
    as = 'button',
    variant = 'primary',
    size = 'md',
    disabled,
    loading,
    class: propClass,
} = defineProps<TButtonProps>();
```

Never use `withDefaults()` — destructure props directly with `= default` syntax.

### 2. Same-Name Shorthand for v-bind

```vue
<!-- CORRECT -->
<ComboboxInput :id :disabled :class="twMerge(styles)" />

<!-- AVOID — redundant -->
<ComboboxInput :id="id" :disabled="disabled" />
```

### 3. CVA Styling (class-variance-authority)

All variants live in `styles.ts`. Never use inline conditional classes.

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const buttonStyles = cva(
    'inline-flex items-center justify-center font-medium transition',
    {
        variants: {
            variant: {
                primary: 'bg-spartan-primary-600 text-white hover:bg-spartan-primary-700',
                secondary: 'bg-white dark:bg-white/5 text-gray-900 dark:text-gray-50',
                danger: 'bg-red-600 text-white hover:bg-red-700',
            },
            disabled: cbv('opacity-50 pointer-events-none'),
            outline: cbv(),
        },
        compoundVariants: [
            { variant: 'primary', outline: true, class: 'bg-transparent text-spartan-primary-600 border-spartan-primary-600' },
        ],
    },
);

export type TButtonStyles = VariantProps<typeof buttonStyles>;
```

Usage in component:
```typescript
const rootClass = computed(() => twMerge(buttonStyles({ variant, disabled }), propClass));
```

The `cbv()` helper (`createBooleanVariation`) creates `{ true: classes, false: '' }` variants.

### 4. usePassthrough() — Deep Customization

Allows parent components to style internal elements via `pt:*` attributes:

```typescript
// In component
const { pt, extractor } = usePassthrough();
const [bodyClass, bodyProps] = extractor(pt.value.body);
```

```vue
<!-- Consumer usage -->
<SBadge pt:body="text-red-500" />
<SBadge pt:body:class="text-red-500" pt:body:data-custom="value" />
<SBadge :pt="{ body: { class: 'text-red-500' } }" />
```

### 5. Polymorphic `as` Prop

Components can render as different HTML elements or Vue components:

```vue
<SButton>Click me</SButton>               <!-- renders <button> -->
<SButton as="a" href="/next">Link</SButton> <!-- renders <a> -->
<SButton :as="RouterLink" to="/next">Nav</SButton> <!-- renders <RouterLink> -->
```

### 6. Types with Bilingual JSDoc

```typescript
export type TButtonProps = {
    /**
     * @en The visual variant of the button.
     * @es La variante visual del botón.
     */
    variant?: NonNullable<TButtonStyles['variant']>;
};
```

### 7. Dark Mode

All components support dark mode via Tailwind's `dark:` prefix in CVA definitions:
```typescript
'bg-white dark:bg-white/5 text-gray-900 dark:text-gray-50 border-gray-300 dark:border-white/10'
```

### 8. i18n

Components with internal text use `vue-i18n` under the `$spartan` namespace. Translations in `src/locales/{en,es,fr,it,pt}.json`. In tests, i18n is globally mocked — `useI18n().t(key)` returns the key string.

## Component Categories & Key Components

| Category | Key Components |
|----------|---------------|
| **Data Input** | SInput, SSelect, SInputDate, SCombobox, STextarea, SInputAmount, SInputMask, SInputPassword |
| **Selectors** | SCheckbox, SRadio, SSwitch, SRadioGroup, SSelector, SMultiSelector |
| **Display** | SAlert, SBadge, SCard, SToast, SAvatar, SBreadcrumbs, SLink |
| **Modals** | SModal, SPopover, STooltip, SDropdown, SModalCard, SModalConfirm |
| **Structure** | SDTable, STable, SAccordion, STab, SPaginator, SSidebar, SSteps |
| **Utilities** | SButton, SLabel, SFilter, SCopy |
| **Typography** | SPageTitle, SSectionTitle, SSectionDescription |

**Block Variants**: Input components have `*Block` wrappers (SInputBlock, SSelectBlock, etc.) that add label/help/error UI via `BlockWrapper`.

For detailed props, variants, and slots of each component, read `references/components-catalog.md`.

## Testing Patterns

Framework: **Vitest** with `jsdom`, `@testing-library/vue`, globals enabled.

```typescript
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SButton from './SButton.vue';

describe('SButton', () => {
    test('renders with primary variant by default', () => {
        render(SButton, { slots: { default: 'Click me' } });
        const button = screen.getByRole('button', { name: 'Click me' });
        expect(button.className).toContain('bg-spartan-primary-600');
    });

    test('emits click and handles disabled', async () => {
        const user = userEvent.setup();
        render(SButton, { props: { disabled: true }, slots: { default: 'Disabled' } });
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    test('supports dark mode classes', () => {
        render(SButton, { props: { variant: 'secondary' }, slots: { default: 'Dark' } });
        const button = screen.getByRole('button');
        expect(button.className).toContain('dark:bg-white/5');
    });
});
```

Key patterns:
- `render(Component, { props, slots, attrs })` — render with options
- `screen.getByRole()`, `screen.getByText()` — DOM queries
- `userEvent.setup()` then `user.type()`, `user.click()` — interactions
- `emitted()['update:modelValue']` — capture emitted events
- `rerender({ newProp })` — update props
- `container.firstElementChild` — access wrapper for class assertions
- Test both light AND dark mode classes from CVA

For comprehensive testing reference, read `references/testing-guide.md`.

## Documentation Site (Nuxt 4)

Docs live in `docs/`. Each component needs bilingual markdown + Vue example files.

### File Structure
- Content: `docs/content/{en,es}/2.components/{category}/{n}.{slug}.md`
- Examples: `docs/examples/SName/{example}.vue`
- Status: `docs/app/data/componentStatus.ts` (tests = coverage %, not count)

### usePreview Composable

Example files call `usePreview()` to create interactive controls:

**Playground mode** (first/Usage example — full sandbox):
```typescript
const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SButton',
    props: {
        variant: { type: 'select', options: ['primary', 'secondary', 'danger'], default: 'primary' },
        disabled: { type: 'boolean', default: false },
    },
    slots: {
        default: { default: 'Click me', label: 'Label' },
    },
});
```

**Feature mode** (subsequent examples — minimal pill bar):
```typescript
const { controls } = usePreview({
    props: {
        size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: 'size' },
    },
});
```

### Markdown with ::component-preview

```markdown
# Usage

::component-preview{file="SButton/basic"}
::

## Variants

::component-preview{file="SButton/variants"}
::
```

Static `` ```vue `` blocks do NOT render live components — always use `::component-preview`.

For icons in examples, import from `@placetopay/iconsax-vue/bold` (only bold reliably available).

For full documentation reference, read `references/docs-guide.md`.

## Path Aliases

| Alias | Path |
|-------|------|
| `@/*` | `./src/*` |
| `@spartan*` | `./src/components/spartan` |
| `@internal*` | `./src/components/internal` |

## Key Dependencies

| Library | Purpose | Used By |
|---------|---------|---------|
| `@headlessui/vue` | Accessible primitives | SCheckbox, SRadio, SSwitch, SDropdown, modals |
| `@floating-ui/vue` | Positioning | SPopover, STooltip, SDropdown |
| `@tanstack/vue-table` | Data table engine | SDTable |
| `@vuepic/vue-datepicker` | Date picker | SInputDate |
| `class-variance-authority` | Type-safe variants | All styled components |
| `tailwind-merge` | Smart class merging | All styled components |
| `zod` | Schema validation | Optional |
| `imask` | Input masking | SInputMask |

## Internal Components

Shared components in `src/components/internal/`:
- **BlockWrapper** — Label + help + error UI for form blocks
- **InputContainer** — Shared form input styling
- **Transitions** — FadeTransition, SlideTransition
- **Loader** — Loading spinner
- **Wrapper** — Polymorphic container (`as` prop)

## Code Style

- **Prettier**: Single quotes, 4-space indent, 120 chars, Tailwind class sorting
- **ESLint**: `vue/vue3-recommended` + `@typescript-eslint/recommended`
- `@typescript-eslint/no-explicit-any` is OFF

## Build Pipeline

`npm run build` = Vite (per-component) → vue-tsc (types) → Rollup (plugin) → copy locales → copy CSS → sanitize.

Each component gets its own entry point for tree-shaking:
```typescript
import { SButton } from '@placetopay/spartan-vue';
import '@placetopay/spartan-vue/styles.css';
```
