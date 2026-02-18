---
name: document-component
description: |
  Create complete bilingual documentation for Spartan Vue components. Use when asked to:
  "document component", "create docs for S*", "update component documentation",
  "add docs for component", "document S*". Generates interactive documentation
  with ::component-preview examples in English and Spanish, following the
  established pattern with props tables, events, slots, and componentStatus updates.
---

# Document Spartan Vue Component

Generate complete, bilingual (EN/ES) interactive documentation for a Spartan Vue component.

## Workflow

1. **Read source files** - Understand the component fully
2. **Create example `.vue` files** - Interactive previews in `docs/examples/SName/`
3. **Write English docs** - Markdown referencing the example files
4. **Write Spanish docs** - Mirror structure with translations
5. **Update componentStatus.ts** - Mark typescript and docs status

---

## Step 1: Read Source Files

Before writing docs, read ALL of these files for the target component:

| File | What to extract |
|------|-----------------|
| `src/components/spartan/{Name}/{Name}.vue` | Template, props, emits, slots |
| `src/components/spartan/{Name}/types.ts` | TypeScript types |
| `src/components/spartan/{Name}/index.ts` | Exports |
| `src/components/spartan/{Name}/styles.ts` | CVA variants (if exists) |
| `src/components/spartan/{Name}/*.test.ts` | Real usage examples |

---

## Step 2: File Locations

| File | Path |
|------|------|
| English doc | `docs/content/en/2.components/{category}/{n}.{slug}.md` |
| Spanish doc | `docs/content/es/2.components/{category}/{n}.{slug}.md` |
| Example files | `docs/examples/SName/{example-name}.vue` |
| Status entry | `docs/app/data/componentStatus.ts` |

Categories:

| Folder | Category |
|--------|----------|
| `1.data-input` | dataInput |
| `2.selectors` | selectors |
| `3.display` | display |
| `4.modals` | modals |
| `5.structure` | structure |
| `6.utilities` | utilities |

---

## Step 3: Markdown Frontmatter

**English:**

```yaml
---
title: ComponentName
description: A brief description of the component in English.
navigation:
  icon: i-lucide-{icon-name}
---
```

**Spanish:**

```yaml
---
title: ComponentName
description: Una breve descripcion del componente en espanol.
navigation:
  icon: i-lucide-{icon-name}
---
```

**IMPORTANT:** Always start with `::component-status` after the frontmatter:

```markdown
::component-status
::
```

---

## Step 4: The ::component-preview Directive

Interactive examples use `.vue` files in `docs/examples/SName/` rendered via:

```markdown
::component-preview{file="SName/example-name"}
::
```

### Example File Patterns

**First/Usage example (`basic.vue`) — Full playground:**

```vue
<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SButton',
    props: {
        variant: { type: 'select', options: ['primary', 'secondary', 'danger'], default: 'primary', label: 'variant' },
        size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: 'size' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
    },
    slots: {
        default: { default: 'Click me', label: 'Label' },
    },
})
</script>

<template>
    <SButton :variant="controls.variant" :size="controls.size" :disabled="controls.disabled">
        {{ slots.default }}
    </SButton>
</template>
```

**Feature example — Single protagonist prop (select):**

```vue
<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: 'size' },
    },
})
</script>

<template>
    <SButton :size="controls.size">Button</SButton>
</template>
```

**Feature example — Single boolean prop:**

```vue
<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SButton :disabled="controls.disabled">Button</SButton>
</template>
```

**Static example (compound components, complex props, or v-model):**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('startup')
usePreview({ component: 'SRadioGroup' })
</script>

<template>
    <SRadioGroup v-model="selected">
        <SRadioGroupItem value="startup">
            <template #title>Startup</template>
            <template #description>12GB / 6 CPUs</template>
        </SRadioGroupItem>
        <SRadioGroupItem value="pro">
            <template #title>Pro</template>
            <template #description>32GB / 12 CPUs</template>
        </SRadioGroupItem>
    </SRadioGroup>
</template>
```

### Control Types

| Type | UI Control | Usage |
|------|-----------|-------|
| `select` | Pill toggle group | Enum props with finite options |
| `boolean` | Toggle switch | Boolean props |
| `text` | Text input | String props (playground mode only) |
| `number` | Number input | Numeric props (playground mode only) |

### When to Use Static vs Interactive Examples

**Use `usePreview` controls when:**
- Prop has a finite set of values (use `type: 'select'`)
- Prop is boolean (use `type: 'boolean'`)
- Text/number values in playground mode (`type: 'text'` / `type: 'number'`)

**Use static `.vue` file (no controls) when:**
- Compound components (SBreadcrumbs, SRadioGroup) — children define the structure
- Complex array/object props (fields, columns, actions)
- Props that are Vue components (FunctionalComponent: icons)
- v-model state that must persist between interactions

---

## Step 5: Document Structure Pattern

Follow this order for every component:

```
# Usage                    -> Brief description + main playground example
## {Feature sections}      -> One section per notable feature
## Props                   -> Table of all props
## Events                  -> Table of all events (only if component has emits)
## Slots                   -> Table of all slots (only if component has named slots)
```

### Feature Sections Guidelines

- Create one section per visual/functional variant the component supports
- Each feature section uses `::component-preview` pointing to a focused example file
- Feature examples register ONLY the protagonist prop(s) via `usePreview`
- Use static `` ```vue `` blocks ONLY when `::component-preview` is impossible
  (e.g., FunctionalComponent props, HTML in named slots, multi-component compositions)
- For enum props (color, variant, size), use `type: 'select'` with ALL possible values
- For boolean props, default to `true` in feature examples to show the feature ON

### Props Table Format

**English:**

```markdown
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `propName` | `'opt1' \| 'opt2'` | `'opt1'` | What this prop does |
| `boolProp` | `boolean` | `false` | What this does |
| `noDefault` | `string` | - | Prop without default |
```

**Spanish:**

```markdown
| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `propName` | `'opt1' \| 'opt2'` | `'opt1'` | Lo que hace esta prop |
```

### Events Table Format

**English:**

```markdown
| Event | Payload | Description |
|-------|---------|-------------|
| `eventName` | `PayloadType` | When this is emitted |
| `close` | - | Use - for no payload |
```

**Spanish:**

```markdown
| Evento | Payload | Descripción |
|--------|---------|-------------|
| `eventName` | `PayloadType` | Cuando se emite |
```

### Slots Table Format

**English:**

```markdown
| Name | Description |
|------|-------------|
| `default` | Main content |
| `slotName` | What goes here |
```

**Spanish:**

```markdown
| Nombre | Descripción |
|--------|-------------|
| `default` | Contenido principal |
| `slotName` | Qué va aquí |
```

---

## Step 6: Update componentStatus.ts

After documenting a component, update its entry in `docs/app/data/componentStatus.ts`.

Add these flags:

```typescript
{ name: 'SComponentName', typescript: true, docs: 'complete' }
```

**IMPORTANT about `typescript: true`:**
- Set `typescript: true` if the component is typed with TypeScript (`defineProps<Type>()`)
- This is true even if no types are exported (e.g., inline types like `defineProps<{ class?: string }>()`)
- The concept: "the component IS typed", not "it exports types"

---

## Step 7: Bilingual Documentation

Both English and Spanish files must have the **same structure and examples**.

The `::component-preview` directives are identical in both languages — they reference the same `.vue` files (no separate EN/ES example files).

### What Changes Between Languages

| Element | English | Spanish |
|---------|---------|---------|
| Frontmatter description | English | Spanish |
| `# Usage` | `# Usage` | `# Uso` |
| Section headings | English | Spanish |
| Prose descriptions | English | Spanish |
| Props table header | `Type \| Default \| Description` | `Tipo \| Default \| Descripción` |
| Events table header | `Event \| Payload \| Description` | `Evento \| Payload \| Descripción` |
| Slots table header | `Name \| Description` | `Nombre \| Descripción` |
| Table descriptions | English | Spanish |

### What Stays the Same

- `::component-preview{file="..."}` directives (same file references)
- Prop names, event names, slot names
- Code in static `` ```vue `` blocks

### Common Heading Translations

| English | Spanish |
|---------|---------|
| Usage | Uso |
| Colors | Colores |
| Variants | Variantes |
| Sizes | Tamaños |
| States | Estados |
| Props | Props |
| Events | Eventos |
| Slots | Slots |
| With Icon | Con Icono |
| Closeable | Cerrable |
| Description | Descripción |

---

## Quality Rules

### Rule 1: First example is always the Usage playground

`basic.vue` uses `mode: 'playground'` and `component: 'SName'` with ALL relevant props and the default slot registered. This gives readers a full sandbox.

### Rule 2: Feature examples register only the protagonist prop(s)

Every feature `.vue` file calls `usePreview()` WITHOUT `mode` (defaults to `'feature'`) and only registers the prop(s) being demonstrated. The template hardcodes supporting values directly.

### Rule 3: Select props use `type: 'select'` with all valid options

Any prop with a finite set of values must register as `type: 'select'` with the complete `options` array. Never use `type: 'text'` for enum props in feature examples.

### Rule 4: Boolean props default to `true` in feature examples

Feature examples showing a boolean prop should default it to `true` so the feature is visible immediately.

### Rule 5: Props, Events, and Slots tables ALWAYS at the end

The document must end with reference tables in this order:
1. `## Props` - ALL props documented
2. `## Events` - Only if the component has emits
3. `## Slots` - Only if the component has named slots

Never place feature sections after these reference tables.

### Rule 6: Use `usePreview({ component: 'SName' })` in static examples

Even static `.vue` files (no controls) must call `usePreview({ component: 'SName' })` so the live code panel shows the component's code correctly.

---

## Checklist Before Finishing

- [ ] Read all source files (vue, types, styles, tests, index)
- [ ] `basic.vue` created with `mode: 'playground'` and all relevant props/slots
- [ ] Feature `.vue` files created for each section (one protagonist prop each)
- [ ] Static `.vue` files for compound/complex cases (with `usePreview({ component: 'SName' })`)
- [ ] English markdown created with `::component-preview` directives
- [ ] Spanish markdown created with same structure, translated
- [ ] **Every enum prop uses `type: 'select'` with all valid options**
- [ ] **Every feature example only registers its protagonist prop**
- [ ] **Boolean feature examples default to `true`**
- [ ] Props table at the end with all props documented
- [ ] Events table included (if component has emits)
- [ ] Slots table included (if component has named slots)
- [ ] **Props → Events → Slots tables are the LAST sections in the document**
- [ ] componentStatus.ts updated with `typescript: true` and `docs: 'complete'`
