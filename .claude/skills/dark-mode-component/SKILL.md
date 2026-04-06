---
name: dark-mode-component
description: >
  Adjust the dark mode styling of a Spartan Vue component using Figma designs as reference.
  Use this skill whenever the user wants to add or fix dark mode support for a component,
  update a component's JSDoc documentation, or sync a component's visual styles with Figma.
  Triggers on phrases like "dark mode", "modo oscuro", "ajustar estilos", "dark theme",
  "actualizar jsdoc", "figma styles", or when the user mentions a component name together
  with Figma links. Also use it when the user passes Figma node URLs and a component name
  together, even if they don't explicitly say "dark mode".
---

# Dark Mode Component Skill

This skill adjusts a Spartan Vue component's dark mode styling based on Figma designs, adds bilingual JSDoc, and updates the component status tracker.

## Required inputs

The user must provide:

1. **Component name** — e.g. `SCopy`, `SBadge`, `SButton`
2. **Figma link for dark mode reference** — a Figma node URL pointing to the dark mode variant of the component (used via MCP Figma tools to extract colors and styles)
3. **Figma link for documentation** — a Figma node URL pointing to the light/general variant (stored in `componentStatus.ts` and in the component's JSDoc `@see` tag)

If the user only provides one link, ask which is which. If they provide a node with both light and dark variants visible, use the same link for both purposes.

## Workflow

### Step 1: Extract Figma design tokens

Use the MCP Figma tool `get_design_context` to read the dark mode Figma node. Extract:

- Text colors (icon colors, label colors, muted text)
- Background colors (surfaces, overlays, success/error state backgrounds)
- Border colors
- Hover state colors
- Any opacity or transparency values

Pass `clientFrameworks: "vue"` and `clientLanguages: "typescript,html,css"` to the MCP calls.

Also fetch the light mode node for comparison — this helps confirm that the existing light-mode classes are correct.

### Step 2: Read the component source

Read all files in `src/components/spartan/S{Name}/`:

- `S{Name}.vue` — the main component template and script
- `types.ts` — prop/emit type definitions
- `styles.ts` — CVA variant definitions (if it exists)
- `index.ts` — re-exports

### Step 3: Identify dark mode gaps

Compare the Figma dark-mode tokens against the component's current classes. Look for:

- Classes like `text-gray-*`, `bg-white`, `bg-gray-*`, `border-gray-*` that lack a `dark:` counterpart
- Hover states (`hover:`, `group-hover:`) missing `dark:hover:` / `dark:group-hover:` variants
- Hardcoded white/black backgrounds that won't adapt

### Step 4: Apply dark mode classes

Add `dark:` variants following the project's established conventions. The common mappings are:

| Light class | Dark equivalent | Context |
|---|---|---|
| `text-gray-900` | `dark:text-white` | Primary text, headings |
| `text-gray-700` | `dark:text-gray-200` | Labels, standard text |
| `text-gray-500` | `dark:text-gray-400` | Secondary/muted text |
| `text-gray-400` | `dark:text-gray-500` | Icons, tertiary |
| `bg-white` | `dark:bg-gray-900` | Surface backgrounds |
| `bg-gray-50` | `dark:bg-white/10` | Subtle backgrounds |
| `bg-gray-100` | `dark:bg-white/20` | Neutral fills |
| `group-hover:text-gray-600` | `dark:group-hover:text-gray-300` | Icon hover |
| `border-gray-300` | `dark:border-gray-600` | Borders |

Always defer to the Figma design when it differs from these defaults. The table is a fallback for when Figma doesn't specify a value or when MCP can't extract a precise color.

If the component uses CVA styles in `styles.ts`, add dark variants there instead of inline in the template.

### Step 5: Add component-level JSDoc

Every component needs a **separate** `<script lang="ts">` block (before the `<script setup>`) with a JSDoc description and `export default { name }`. This is important because Vue tooling uses this block for IDE hints and documentation generation.

Pattern to follow (from SButton):

```vue
<script lang="ts">
/**
 * A concise English description of what the component does.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/S{Name} Github}.
 * @see {@link <figma-doc-link> Figma}.
 */
export default {
    name: 'S{Name}',
};
</script>

<script setup lang="ts">
// ... existing setup code
</script>
```

If the component already has this block, update it. If it only has `<script setup>`, add the new block above it.

### Step 6: Add bilingual JSDoc to types

Every prop and emit in `types.ts` needs bilingual JSDoc with `@en` and `@es` tags. Follow this format:

```typescript
export type T{Name}Props = {
    /**
     * @en English description of the prop.
     * @es Spanish description of the prop.
     * @default 'value' // only if there's a default
     */
    propName?: Type;
};

export type T{Name}Emits = {
    /**
     * @en English description of the event.
     * @es Spanish description of the event.
     */
    (event: 'eventName', payload: Type): void;
};
```

Keep descriptions concise and practical — describe what the prop/event does, not implementation details.

### Step 7: Update componentStatus.ts

Open `docs/app/data/componentStatus.ts` and update the component's entry:

- Set `jsdoc: true`
- Set `darkMode: true`
- Add/update `figmaLink` with the documentation Figma URL (the light/general one)

If the entry is on a single line, expand it to multiline for readability when adding multiple new fields.

### Step 8: Run tests

Run the component's test file to make sure nothing broke:

```bash
npx vitest run src/components/spartan/S{Name}/S{Name}.test.ts
```

All tests must pass before finishing.

## Important notes

- Never remove existing classes — only add `dark:` variants alongside them
- If a component already has partial dark mode support, fill in the gaps rather than redoing everything
- The `class-variance-authority` styles in `styles.ts` take precedence over inline template classes — check both locations
- When the component uses `twMerge`, dark classes work normally since tailwind-merge handles them
- The docs site uses Nuxt's `@nuxtjs/color-mode` — dark mode classes are applied via the standard `dark:` prefix
