# Passthrough (pt) Reference

## What is Passthrough?

Passthrough is a mechanism to customize the styles and HTML attributes of a component's **internal elements** without modifying the component itself. It is available on components that call `usePassthrough()` internally.

Each passthrough-enabled component exposes named **keys** that map to specific internal DOM elements. You can target these keys to add classes, data attributes, ARIA attributes, or any other HTML attribute.

## Syntax

There are three ways to use passthrough:

### 1. Class shorthand (most common)

Pass Tailwind/CSS classes directly to an internal element:

```vue
<SBadge pt:body="flex-row-reverse" pt:dot="text-red-500" />
```

### 2. Attribute syntax

Target a specific HTML attribute on an internal element using `pt:key:attribute`:

```vue
<SBadge pt:body:class="flex-row-reverse" pt:body:data-testid="badge-body" />
<SDTable pt:table:id="main-table" pt:table:aria-label="Users table" />
```

### 3. Object prop

Pass a structured object via the `:pt` prop for full control:

```vue
<SBadge :pt="{
    body: { class: 'flex-row-reverse', 'data-testid': 'badge-body' },
    cross: { class: 'text-red-400' }
}" />
```

When the value is a plain string, it is treated as a class:

```vue
<SBadge :pt="{ body: 'flex-row-reverse' }" />
<!-- equivalent to pt:body="flex-row-reverse" -->
```

## How It Works Internally

`usePassthrough()` (defined in `src/helpers/passThrough.ts`) reads component `$attrs` and extracts entries matching `pt:*` patterns. Each key produces an object with `class` and/or other attributes. Components then use `extractor()` to split the result into `[className, bindableProps]` for use in templates via `twMerge` and `v-bind`.

All classes are merged with `tailwind-merge`, so passthrough classes safely override component defaults.

---

## Passthrough Keys by Component

### SButton
| Key | Element | Description |
|-----|---------|-------------|
| `icon` / `leftIcon` | `<component>` | Left icon element (aliases; `icon` takes precedence) |
| `rightIcon` | `<component>` | Right icon element |

### SBadge
| Key | Element | Description |
|-----|---------|-------------|
| `body` | `<div>` | Inner flex container wrapping content and tag |
| `content` | `<div>` | Text content wrapper (default slot) |
| `dot` | `<svg>` | Status dot indicator (visible when `dot` prop is true) |
| `tag` | `<div>` | Tag slot container (visible when `tag` slot has content) |
| `cross` | `<button>` | Remove button (visible when `removable` prop is set) |

### SCard
| Key | Element | Description |
|-----|---------|-------------|
| `body` | `<main>` | Card body container |
| `actions` | `<section>` | Footer actions area |
| `title` | `<h3>` | Title text element |
| `description` | `<p>` | Description text |
| `icon` | Icon component | Icon component props |
| `iconContainer` | `<div>` | Icon wrapper div |

### SAccordion
| Key | Element | Description |
|-----|---------|-------------|
| `body` | `<div>` | Accordion content panel (with `overflow-hidden`) |

### SModal
| Key | Element | Description |
|-----|---------|-------------|
| `container` | `<div>` | Modal panel container (the centered content wrapper) |

### SDTable
| Key | Element | Description |
|-----|---------|-------------|
| `table` | `<table>` | Inner `<table>` element |
| `thead` | — | Passed to the `TableHead` sub-component |
| `paginator` | — | Passed to the `TablePaginator` sub-component (SPaginator) |

### SSelect
| Key | Element | Description |
|-----|---------|-------------|
| `placeholder` | class only | Overrides placeholder text color (default: `text-gray-400 dark:text-gray-500`) |

### SInputTag
| Key | Element | Description |
|-----|---------|-------------|
| `container` | `<div>` | Outer container wrapping tags and input |
| `input` | `<input>` | Inner `<input>` element |

### SSelector
| Key | Element | Description |
|-----|---------|-------------|
| `options` | — | Passed to the `SelectorLayout` as `ptOptions` (affects dropdown options container) |

### SMultiSelector
| Key | Element | Description |
|-----|---------|-------------|
| `options` | — | Passed to the `SelectorLayout` as `ptOptions` (affects dropdown options container) |

### SDefinitionTerm
| Key | Element | Description |
|-----|---------|-------------|
| `dt` | `<dt>` | Definition term label element(s) |
| `dd` | `<dd>` | Definition description element |

### SStackedListItem
| Key | Element | Description |
|-----|---------|-------------|
| `container` | `<li>` | List item wrapper element |

### STab (variant-level: Pill, Underline, Vetch)

These keys are available on all three tab variants (pill, underline, vetch):

| Key | Element | Description |
|-----|---------|-------------|
| `tabContainer` | `<nav>` | Tab navigation container |
| `tab` | `<ul>` | Tab list element |

### STabItem
| Key | Element | Description |
|-----|---------|-------------|
| `item` | `<li>` | Individual tab item wrapper |

---

## Components WITHOUT Passthrough

The following components do **not** use `usePassthrough()`:

- **SCheckbox, SRadio, SSwitch** -- Built on HeadlessUI primitives; style via standard `class` prop or `$attrs`
- **STooltip, SDropdown** -- Delegate rendering to SPopover; customize via SPopover's API
- **SInput, STextarea** -- Use standard `class` and `$attrs` binding directly on the root element
- **SAlert, SLink, SAvatar, SBreadcrumbs** -- Style via `class` prop; no internal element decomposition
- **SPaginator, SSidebar, SSteps, SFilter** -- No passthrough support

---

## Examples

### Customizing SCard header alignment

```vue
<SCard
    title="Payment Complete"
    pt:title="text-left"
    pt:description="text-left"
    pt:body="px-8"
>
    <template #description>Your transaction was processed.</template>
    <template #actions>
        <SButton>Continue</SButton>
    </template>
</SCard>
```

### Adding data attributes to SDTable for testing

```vue
<SDTable
    :columns="columns"
    :data="rows"
    pt:table:data-testid="users-table"
    pt:table:aria-label="Users list"
/>
```

### Changing SBadge remove button color

```vue
<SBadge removable pt:cross="text-red-600 hover:text-red-800" @removed="handleRemove">
    Tag name
</SBadge>
```

### Styling SInputTag container and input

```vue
<SInputTag
    v-model="tags"
    pt:container="border-2 border-blue-300"
    pt:input="placeholder:text-blue-400"
/>
```

### Customizing STab navigation

```vue
<STab variant="underline">
    <STabItem label="Profile" pt:item="px-6" />
    <STabItem label="Settings" pt:item="px-6" />
</STab>
```
