# Spartan Vue Styling Guide (CVA Patterns)

## Table of Contents

1. [CVA Basics](#1-cva-basics)
2. [Boolean Variations (cbv)](#2-boolean-variations-cbv)
3. [Compound Variants](#3-compound-variants)
4. [Dark Mode Pattern](#4-dark-mode-pattern)
5. [tailwind-merge Integration](#5-tailwind-merge-integration)
6. [usePassthrough() Deep Customization](#6-usepassthrough-deep-customization)
7. [Complete styles.ts Template](#7-complete-stylests-template)
8. [Real Component Examples](#8-real-component-examples)

---

## 1. CVA Basics

Every styled component has a `styles.ts` file using `class-variance-authority`:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const componentStyles = cva(
    // Base classes (always applied)
    'inline-flex items-center justify-center font-medium transition',
    {
        variants: {
            // Named variant groups
            variant: {
                primary: 'bg-spartan-primary-600 text-white',
                secondary: 'bg-white text-gray-900',
            },
            size: {
                sm: 'h-7 text-xs px-2.5',
                md: 'h-9 text-sm px-4',
                lg: 'h-11 text-base px-6',
            },
        },
        compoundVariants: [],
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

// Export the type for use in types.ts
export type TComponentStyles = VariantProps<typeof componentStyles>;
```

## 2. Boolean Variations (cbv)

The `createBooleanVariation` helper (aliased `cbv`) creates true/false variants:

```typescript
import { createBooleanVariation as cbv } from '@/helpers';

// With classes for `true` state
disabled: cbv('opacity-50 pointer-events-none'),
// Result: { true: 'opacity-50 pointer-events-none', false: '' }

// Empty (for compound variant targeting)
outline: cbv(),
// Result: { true: '', false: '' }
// Useful when the actual classes come from compoundVariants
```

## 3. Compound Variants

Apply classes when multiple variants match simultaneously:

```typescript
compoundVariants: [
    // When variant='primary' AND outline=true
    {
        variant: 'primary',
        outline: true,
        class: 'bg-transparent text-spartan-primary-600 border-spartan-primary-600',
    },
    // When variant='danger' AND link=true
    {
        variant: 'danger',
        link: true,
        class: 'text-red-600 bg-transparent border-transparent hover:text-red-700',
    },
],
```

### Factory Pattern for Many Combinations

When you have many color×variant combinations (like SAlert, SBadge):

```typescript
const compoundVariant = (color: string, variant: string, className: string) => ({
    color,
    variant,
    class: className,
});

compoundVariants: [
    compoundVariant('primary', 'solid', 'text-white bg-spartan-primary-600'),
    compoundVariant('primary', 'outline', 'text-spartan-primary-600 border-spartan-primary-600'),
    compoundVariant('success', 'solid', 'text-white bg-green-600'),
    // ... more combinations
],
```

## 4. Dark Mode Pattern

Always include dark mode classes in variant definitions using Tailwind's `dark:` prefix:

```typescript
variant: {
    primary: [
        'bg-spartan-primary-600 hover:bg-spartan-primary-700',
        'dark:bg-spartan-primary-500 dark:hover:bg-spartan-primary-400',
    ],
    secondary: [
        'bg-white text-gray-900 border-gray-300',
        'dark:bg-white/5 dark:text-gray-50 dark:border-white/10',
    ],
},
```

Common dark mode color mappings:
- `bg-white` → `dark:bg-white/5` or `dark:bg-gray-800`
- `text-gray-900` → `dark:text-gray-50` or `dark:text-white`
- `border-gray-300` → `dark:border-white/10` or `dark:border-gray-700`
- `bg-gray-50` → `dark:bg-gray-800` or `dark:bg-white/5`
- `text-gray-500` → `dark:text-gray-400`
- Focus rings: `focus:ring-gray-300` → `dark:focus:ring-gray-600`

## 5. tailwind-merge Integration

Components use `twMerge()` to combine CVA output with user-provided classes:

```typescript
import { twMerge } from 'tailwind-merge';

const rootClass = computed(() =>
    twMerge(
        componentStyles({ variant, size, disabled }),
        propClass,  // User's class prop wins for conflicts
    )
);
```

`twMerge` intelligently resolves conflicts — `twMerge('p-4', 'p-2')` → `'p-2'`.

## 6. usePassthrough() Deep Customization

Components that need internal element customization use `usePassthrough()`:

```typescript
// In component setup
const { pt, extractor } = usePassthrough();
const [bodyClass, bodyProps] = extractor(pt.value.body);
const [iconClass, iconProps] = extractor(pt.value.icon);
```

```vue
<!-- In template -->
<div v-bind="bodyProps" :class="twMerge(baseStyles, bodyClass)">
    <component :is="icon" v-bind="iconProps" :class="twMerge('h-5 w-5', iconClass)" />
</div>
```

Consumer usage:
```vue
<SBadge pt:body="text-red-500" />
<SBadge pt:body:class="font-bold" pt:body:data-custom="value" />
<SBadge :pt="{ body: { class: 'text-red-500', 'data-custom': 'value' } }" />
```

## 7. Complete styles.ts Template

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

// Main component styles
export const componentStyles = cva(
    // Base classes
    'relative flex items-center gap-2 rounded-lg transition-colors',
    {
        variants: {
            variant: {
                primary: [
                    'bg-spartan-primary-50 text-spartan-primary-800',
                    'dark:bg-spartan-primary-500/10 dark:text-spartan-primary-400',
                ],
                secondary: [
                    'bg-gray-50 text-gray-800',
                    'dark:bg-gray-800 dark:text-gray-200',
                ],
            },
            size: {
                sm: 'p-2 text-sm',
                md: 'p-4 text-base',
                lg: 'p-6 text-lg',
            },
            disabled: cbv('opacity-50 pointer-events-none'),
            bordered: cbv('border'),
        },
        compoundVariants: [
            {
                variant: 'primary',
                bordered: true,
                class: 'border-spartan-primary-200 dark:border-spartan-primary-500/30',
            },
            {
                variant: 'secondary',
                bordered: true,
                class: 'border-gray-200 dark:border-gray-700',
            },
        ],
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

// Secondary styles for sub-elements (optional)
export const iconStyles = cva('shrink-0', {
    variants: {
        size: {
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
        },
    },
});

// Type exports
export type TComponentStyles = VariantProps<typeof componentStyles>;
```

## 8. Real Component Examples

### SButton/styles.ts (Simplified)

```typescript
export const buttonStyles = cva(
    'inline-flex items-center justify-center h-fit w-fit border font-medium transition focus:outline-none gap-2 box-border',
    {
        variants: {
            variant: {
                primary: [
                    'text-white focus-within:s-ring',
                    'bg-spartan-primary-600 hover:bg-spartan-primary-700',
                    'border-spartan-primary-600 shadow-sm',
                ],
                secondary: [
                    'text-gray-900 dark:text-gray-50 focus-within:s-ring-secondary',
                    'bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10',
                    'border-gray-300 dark:border-white/10 shadow-sm',
                ],
                danger: [
                    'text-white focus-within:s-ring-danger',
                    'bg-red-600 hover:bg-red-700',
                    'border-red-600 shadow-sm',
                ],
            },
            outline: cbv(),
            link: cbv(),
            circular: cbv(),
            loading: cbv('text-transparent select-none pointer-events-none'),
            disabled: cbv('opacity-50 pointer-events-none'),
        },
        compoundVariants: [
            { variant: 'primary', outline: true, class: 'text-spartan-primary-600 bg-transparent hover:bg-spartan-primary-50 dark:hover:bg-spartan-primary-600/10 border-spartan-primary-600' },
            { variant: 'secondary', outline: true, class: 'text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-white/10' },
            { variant: 'danger', outline: true, class: 'text-red-600 bg-transparent hover:bg-red-50 dark:hover:bg-red-600/10 border-red-600' },
            { variant: 'primary', link: true, class: 'text-spartan-primary-600 bg-transparent border-transparent hover:text-spartan-primary-700 shadow-none' },
        ],
    },
);
```

### SAlert/styles.ts Pattern

```typescript
// Factory for color×variant compound variants
const compoundVariant = (color: string, variant: string, className: string) => ({
    color, variant, class: className,
});

export const alertStyles = cva(
    'relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5 items-start',
    {
        variants: {
            variant: { solid: '', outline: 'border', soft: '', subtle: 'border' },
            color: { neutral: '', primary: '', success: '', info: '', warning: '', error: '' },
        },
        compoundVariants: [
            compoundVariant('primary', 'solid', 'bg-spartan-primary-400 dark:bg-spartan-primary-500 text-white'),
            compoundVariant('primary', 'soft', 'bg-spartan-primary-50 dark:bg-spartan-primary-500/10 text-spartan-primary-800 dark:text-spartan-primary-400'),
            // ... 28 combinations (7 colors × 4 variants)
        ],
    },
);
```

### SBadge/styles.ts Pattern

```typescript
export const badgeStyles = cva(
    'inline-flex items-center font-medium h-fit w-fit rounded gap-2',
    {
        variants: {
            color: {
                primary: '', gray: '', red: '', blue: '', green: '',
                yellow: '', indigo: '', white: '', purple: '', neutral: '',
            },
            size: { sm: 'px-2.5 py-0.5 text-xs', md: 'px-3 py-0.5 text-sm', lg: 'px-3 py-1.5 text-sm' },
            border: cbv('border'),
            pill: cbv('rounded-full'),
            outline: cbv('outline outline-1 -outline-offset-1'),
            tag: cbv(),
            dot: cbv(),
            removable: cbv(),
            reverse: cbv(),
        },
        compoundVariants: [
            // Color-specific classes
            { color: 'primary', class: 'bg-spartan-primary-50 text-spartan-primary-700 dark:bg-spartan-primary-500/10 dark:text-spartan-primary-400' },
            // Size + feature compound variants for padding adjustments
            { tag: true, size: 'sm', reverse: false, dot: false, class: 'pl-0.5 pr-2.5' },
        ],
    },
);

// Sub-element styles
export const bodyStyles = cva('inline-flex gap-2 items-center', {
    variants: { reverse: cbv('flex-row-reverse') },
});
```

## Naming Conventions

- Styles function: `{componentName}Styles` (e.g., `buttonStyles`, `alertStyles`)
- Type export: `T{ComponentName}Styles` (e.g., `TButtonStyles`)
- Sub-element styles: `{elementName}Styles` (e.g., `bodyStyles`, `iconStyles`)
- Helper: `cbv()` for boolean variants, factory functions for compound variant generation
