# Spartan Vue Documentation Guide

## Table of Contents

1. [File Structure](#1-file-structure)
2. [Markdown Documentation Template](#2-markdown-documentation-template)
3. [usePreview Composable](#3-usepreview-composable)
4. [Example File Patterns](#4-example-file-patterns)
5. [ComponentPreview Behavior](#5-componentpreview-behavior)
6. [Component Status Tracking](#6-component-status-tracking)
7. [Icons in Examples](#7-icons-in-examples)
8. [Bilingual Docs](#8-bilingual-docs)
9. [Complete Example Walkthrough](#9-complete-example-walkthrough)

---

## 1. File Structure

```
docs/
├── content/
│   ├── en/2.components/{category}/{n}.{slug}.md    # English docs
│   └── es/2.components/{category}/{n}.{slug}.md    # Spanish docs
├── examples/
│   └── SComponentName/
│       ├── basic.vue           # Usage playground (FIRST example)
│       ├── variants.vue        # Feature example
│       └── sizes.vue           # Feature example
└── app/
    ├── composables/usePreview.ts
    ├── components/content/ComponentPreview.vue
    └── data/componentStatus.ts
```

**Categories**: `1.data-input`, `2.selectors`, `3.display`, `4.modals`, `5.structure`, `6.utilities`, `7.typography`

## 2. Markdown Documentation Template

### English Template

```markdown
---
title: ComponentName
description: Brief description of the component.
navigation:
  icon: i-lucide-icon-name
---

::component-status
::

# Usage

Brief description of what the component does and its primary use case.

::component-preview{file="SComponentName/basic"}
::

## Feature Name

Description of this feature.

::component-preview{file="SComponentName/feature-name"}
::

## Another Feature

Description.

::component-preview{file="SComponentName/another-feature"}
::
```

### Frontmatter Fields

- `title` — Component display name
- `description` — Short summary for overview pages
- `navigation.icon` — Lucide icon for sidebar (e.g., `i-lucide-text-cursor-input`)

### Key Directives

- `::component-status` — Renders status bar (coverage, dark mode, docs status)
- `::component-preview{file="SName/example"}` — Renders interactive preview + live code

**CRITICAL**: Static `` ```vue `` code blocks do NOT render components. Always use `::component-preview` for interactive examples. Only use static code blocks when the feature requires Vue components as props (FunctionalComponent), callback functions, or named slots with HTML/component content.

## 3. usePreview Composable

### Interface

```typescript
interface ControlDefinition {
    type: 'select' | 'boolean' | 'text' | 'number';
    options?: (string | number | boolean)[];
    default?: any;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;  // Always show in generated code
}

interface SlotDefinition {
    default?: string;
    label?: string;
}

interface PreviewDefinition {
    mode?: 'playground' | 'feature';  // Default: 'feature'
    component?: string;
    props?: Record<string, ControlDefinition>;
    slots?: Record<string, SlotDefinition>;
    staticAttrs?: Record<string, string>;
    imports?: Record<string, string>;
}
```

### Two Modes

**Playground mode** (`mode: 'playground'`):
- ONLY for the FIRST example (Usage) on every component doc page
- Shows full control panel with Props row + Slots row
- All props and slots visible at once
- Must set `component: 'SComponentName'` for code generation

**Feature mode** (`mode: 'feature'` — default):
- For all subsequent examples
- Minimal pill bar: select→pills, boolean→toggle, number/text→compact input
- Only protagonist prop(s) shown

### Returns

```typescript
const { controls, slots } = usePreview({ ... });
// controls = reactive object with current prop values
// slots = reactive object with current slot text values
```

## 4. Example File Patterns

### Usage/Playground Example (basic.vue)

```vue
<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SButton',
    props: {
        variant: {
            type: 'select',
            options: ['primary', 'secondary', 'danger'],
            default: 'primary',
            label: 'variant',
        },
        size: {
            type: 'select',
            options: ['sm', 'md', 'lg'],
            default: 'md',
            label: 'size',
        },
        outline: { type: 'boolean', default: false, label: 'outline' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        loading: { type: 'boolean', default: false, label: 'loading' },
    },
    slots: {
        default: { default: 'Click me', label: 'Label' },
    },
});
</script>

<template>
    <SButton
        :variant="controls.variant"
        :size="controls.size"
        :outline="controls.outline"
        :disabled="controls.disabled"
        :loading="controls.loading"
    >
        {{ slots.default }}
    </SButton>
</template>
```

### Feature Example (variants.vue)

```vue
<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        variant: {
            type: 'select',
            options: ['primary', 'secondary', 'danger'],
            default: 'primary',
            label: 'variant',
        },
    },
});
</script>

<template>
    <SButton :variant="controls.variant">Variants</SButton>
</template>
```

### Feature Example with Icons

```vue
<script setup lang="ts">
import { AddIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    component: 'SButton',
    imports: {
        AddIcon: '@placetopay/iconsax-vue/bold',
    },
    staticAttrs: {
        ':icon': 'AddIcon',  // ':' prefix = v-bind in generated code
    },
    props: {
        circular: { type: 'boolean', default: true, label: 'circular' },
    },
});
</script>

<template>
    <SButton :circular="controls.circular" :icon="AddIcon" />
</template>
```

### Feature Example with Multiple Components

```vue
<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        size: {
            type: 'select',
            options: ['sm', 'md', 'lg'],
            default: 'md',
            label: 'size',
        },
    },
});
</script>

<template>
    <div class="flex gap-4">
        <SButton :size="controls.size" variant="primary">Primary</SButton>
        <SButton :size="controls.size" variant="secondary">Secondary</SButton>
        <SButton :size="controls.size" variant="danger">Danger</SButton>
    </div>
</template>
```

## 5. ComponentPreview Behavior

### Live Code Generation

ComponentPreview.vue generates code from store values:

1. **Boolean props**: `true` → flagged attr (`disabled`), `false` → omitted
2. **Select/text/number**: value != default → `key="value"` (or `:key="value"` for numbers)
3. **`required: true`** → always include regardless of value
4. **staticAttrs** added as fixed attributes
5. **imports** grouped by package into single `import { a, b } from 'pkg'` lines
6. **Slots**: single default → inline, multiple → `<template #name>` blocks

### Interactive Features

- Zoom (20%-200%)
- Resizable viewport with drag handle
- Code toggle with syntax highlighting (Shiki)
- Copy button for generated code

## 6. Component Status Tracking

In `docs/app/data/componentStatus.ts`:

```typescript
{
    name: 'SButton',
    tests: 100,          // Coverage % (NOT test count)
    typescript: true,
    jsdoc: true,
    darkMode: true,
    responsive: true,
    docs: 'complete',    // 'complete' | 'partial' | 'minimal'
    figmaLink: 'https://...',
}
```

## 7. Icons in Examples

Import icons from `@placetopay/iconsax-vue/bold` — only bold variants are reliably auto-imported in the docs site.

```typescript
import { AddIcon } from '@placetopay/iconsax-vue/bold';
import { CommandSquareIcon } from '@placetopay/iconsax-vue/bold';
```

Heroicons can be imported normally but are not auto-resolved:
```typescript
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
```

## 8. Bilingual Docs

Every component needs both English and Spanish docs:
- EN: `docs/content/en/2.components/{category}/{n}.{slug}.md`
- ES: `docs/content/es/2.components/{category}/{n}.{slug}.md`

Both files reference the SAME example `.vue` files — only the markdown text differs.

## 9. Complete Example Walkthrough

To document a new component `SMyComponent`:

1. **Create example files**:
   - `docs/examples/SMyComponent/basic.vue` (playground mode)
   - `docs/examples/SMyComponent/feature-a.vue` (feature mode)
   - `docs/examples/SMyComponent/feature-b.vue` (feature mode)

2. **Create markdown** (EN + ES):
   ```markdown
   ---
   title: MyComponent
   description: ...
   navigation:
     icon: i-lucide-component
   ---

   ::component-status
   ::

   # Usage

   ::component-preview{file="SMyComponent/basic"}
   ::

   ## Feature A

   ::component-preview{file="SMyComponent/feature-a"}
   ::
   ```

3. **Update component status** in `docs/app/data/componentStatus.ts`

4. **For full workflow**, use the `/document-component SMyComponent` skill.
