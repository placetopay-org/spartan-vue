---
name: document-component
description: |
  Create complete bilingual documentation for Spartan Vue components. Use when asked to:
  "document component", "create docs for S*", "update component documentation",
  "add docs for component", "document S*". Generates interactive documentation
  with ::spartan-component examples in English and Spanish, following the
  established pattern with props tables, events, slots, and componentStatus updates.
---

# Document Spartan Vue Component

Generate complete, bilingual (EN/ES) interactive documentation for a Spartan Vue component.

## Workflow

1. **Read source files** - Understand the component fully
2. **Write English docs** - Create markdown with ::spartan-component examples
3. **Write Spanish docs** - Mirror structure with translations
4. **Update componentStatus.ts** - Mark typescript and docs status

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

## Step 4: The ::spartan-component Directive

This is the core of the interactive documentation. It renders the actual component live with interactive controls and auto-generated code.

### Basic Syntax

```markdown
::spartan-component
---
props:
  propName: value
slots:
  default: Slot content
---
::
```

### Directive Options

| Option | Purpose |
|--------|---------|
| `props` | Object with component props and their values (YAML format) |
| `slots` | Object with slot names and their string content |
| `items` | Object mapping prop names to arrays of selectable values (dropdowns) |
| `ignore` | Array of prop names to completely hide from UI and code |
| `hide` | Array of prop names to hide from UI controls but keep in generated code |
| `external` | Array of prop names to move to `<script setup>` section |
| `model` | Array of prop names that use v-model binding |
| `class` | CSS classes for the component container |
| `collapse` | Wrap generated code in a collapsible block |
| `elevated` | Add dark background to preview area |
| `overflowHidden` | Add overflow-hidden to preview area |

### When to Use Each Option

**items:** `{ propName: ['opt1', 'opt2', 'opt3'] }`
- Creates a DROPDOWN selector for that prop
- Use for enum/string-union props (color, variant, size, etc.)
- Only accepts `string[]` arrays
- Multiple items can be combined: `items: { color: [...], size: [...] }`

**ignore:** `['propName']`
- Completely removes the prop from UI controls AND generated code
- Use for props not relevant to the current example
- Use for props that can't be represented in YAML (FunctionalComponent, callbacks)

**hide:** `['propName']`
- Removes from UI controls but KEEPS in generated code
- Use when you want the prop fixed in the example but visible in code
- Example: hide variant in a "Solid variant" example so user sees `variant="solid"` in code

**external:** `['propName']`
- Moves the prop to a `<script setup>` section: `const propName = ref([...])`
- In template generates `:prop-name="propName"` (variable reference)
- Use for complex array/object props (fields, columns, data, etc.)
- DO NOT use `externalTypes` (it hardcodes import from `'@nuxt/ui'`)

### Prop Types and How They Render

| Type | UI Control | Code Output |
|------|-----------|-------------|
| String | Text input | `prop="value"` |
| Boolean | true/false dropdown | bare `prop` or `:prop="false"` |
| Number | Number input | `:prop="42"` |
| Object/Array | No control | json5 inline or via external |
| Slots | Text input | Content between component tags |

---

## Step 5: Document Structure Pattern

Follow this order for every component:

```
# Usage                    -> Brief description + main ::spartan-component example
## {Feature sections}      -> One section per notable feature, each with ::spartan-component
## Props                   -> Table of all props
## Events                  -> Table of all events (only if component has emits)
## Slots                   -> Table of all slots (only if component has named slots)
```

### Feature Sections Guidelines

- Create one section per visual/functional variant the component supports
- Each section should have a `::spartan-component` or `` ```vue `` code block
- **Prefer** `::spartan-component` (interactive) over static code blocks
- Use static `` ```vue `` blocks ONLY when the feature requires:
  - Vue components as props (FunctionalComponent: icons, custom components)
  - Callback functions (onClick, validate, etc.)
  - Named slots with HTML content (`<template #slotName>`)
  - Complex compositions with multiple components
- For enum props (color, variant, size), show a dropdown with ALL possible values
- For boolean props, show the feature ON by default with a brief description
- For combined features, show meaningful real-world combinations

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
| Prop | Tipo | Default | Descripcion |
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
| Evento | Payload | Descripcion |
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
| Nombre | Descripcion |
|--------|-------------|
| `default` | Contenido principal |
| `slotName` | Que va aqui |
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

### What Changes Between Languages

| Element | English | Spanish |
|---------|---------|---------|
| Frontmatter description | English | Spanish |
| `# Usage` | `# Usage` | `# Uso` |
| Section headings | English | Spanish |
| Prose descriptions | English | Spanish |
| Props table header | `Type \| Default \| Description` | `Tipo \| Default \| Descripcion` |
| Events table header | `Event \| Payload \| Description` | `Evento \| Payload \| Descripcion` |
| Slots table header | `Name \| Description` | `Nombre \| Descripcion` |
| Table descriptions | English | Spanish |

### What Stays the Same

- Code examples (don't translate variable names or prop values)
- `::spartan-component` directive content (same YAML)
- Prop names, event names, slot names
- Slot content in examples (optional to translate, keep English for code clarity)

### Common Heading Translations

| English | Spanish |
|---------|---------|
| Usage | Uso |
| Colors | Colores |
| Variants | Variantes |
| Sizes | Tamanos |
| States | Estados |
| Props | Props |
| Events | Eventos |
| Slots | Slots |
| With Icon | Con Icono |
| Closeable | Cerrable |
| Description | Descripcion |

---

## Examples by Complexity

### Simple (all string/boolean/number props)

```markdown
::spartan-component
---
items: { variant: ['primary', 'secondary', 'danger'] }
props:
  variant: primary
  disabled: false
slots:
  default: Click me
ignore:
  - class
---
::
```

### Medium (some props need to be hidden)

```markdown
::spartan-component
---
items: { color: ['gray', 'primary', 'red', 'blue', 'green'] }
props:
  color: primary
  outline: true
slots:
  default: Badge
hide:
  - outline
ignore:
  - class
  - removable
---
::
```

### Complex (array/object props)

```markdown
::spartan-component
---
external: ['fields']
props:
  fields:
    - id: name
      name: Name
      interfaces:
        oneInput:
          operators:
            - equal
            - contains
  hideApplyButton: false
  hideClearButton: false
ignore:
  - responsive
  - saved
---
::
```

---

## Checklist Before Finishing

- [ ] Read all source files (vue, types, styles, tests, index)
- [ ] English markdown created with ::spartan-component examples
- [ ] Spanish markdown created with same structure, translated
- [ ] All enum props have items dropdowns in at least one example
- [ ] All boolean features have dedicated sections
- [ ] Props that can't be in YAML (components, callbacks) use static ```vue blocks
- [ ] Complex props use `external: ['propName']`
- [ ] Props table at the end with all props documented
- [ ] Events table included (if component has emits)
- [ ] Slots table included (if component has named slots)
- [ ] componentStatus.ts updated with `typescript: true` and `docs: 'complete'`
- [ ] No unnecessary props shown (use ignore/hide appropriately)
