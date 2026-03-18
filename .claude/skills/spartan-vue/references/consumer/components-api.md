# Components API Reference

Complete API reference for all Spartan Vue components from the consumer perspective.

**Conventions**: `TRounded = 'left' | 'right' | 'both' | 'none' | 'full'`. `FunctionalComponent` = Vue component (icons). Props marked with `?` are optional.

---

## Data Input

### SInput

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| number \| null` | - | v-model binding |
| type | `string` | `'text'` | HTML input type |
| id | `string` | - | HTML id attribute |
| name | `string` | - | HTML name attribute |
| placeholder | `string` | - | Placeholder text |
| disabled | `boolean` | `false` | Disables the input |
| error | `boolean` | `false` | Red border/ring error state |
| rounded | `TRounded` | `'both'` | Border radius style |
| prefix | `string` | - | Static left text (e.g. "https://") |
| suffix | `string` | - | Static right text (e.g. ".com") |
| leftIcon | `FunctionalComponent` | - | Left-side icon |
| rightIcon | `FunctionalComponent` | - | Right-side icon |
| leftOption | `string` | - | Selected left selector value |
| leftOptions | `{ label, value }[]` | - | Left dropdown options |
| rightOption | `string` | - | Selected right selector value |
| rightOptions | `{ label, value }[]` | - | Right dropdown options |
| leftOrderSlots | `string` | `'selector,text,icon,slot'` | Comma-separated left slot order |
| rightOrderSlots | `string` | `'slot,icon,text,selector'` | Comma-separated right slot order |
| borderless | `boolean` | `false` | Remove border |
| inputClass | `string` | - | Classes for inner `<input>` element |
| class | `HTMLAttributes['class']` | - | Container classes |

**Emits**: `update:modelValue`, `update:leftOption`, `update:rightOption`
**Slots**: `left-slot`, `right-slot`
**Block variant**: SInputBlock

---

### SSelect

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| number` | - | v-model binding |
| id | `string` | - | HTML id |
| name | `string` | - | HTML name |
| placeholder | `string` | - | Placeholder option text |
| disabled | `boolean` | `false` | Disables the select |
| error | `boolean` | `false` | Red border/ring error state |
| rounded | `TRounded` | `'both'` | Border radius style |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Emits**: `update:modelValue`
**Slots**: `default` (option elements)
**Block variant**: SSelectBlock

---

### SInputDate

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `Date \| Date[] \| null` | - | v-model binding (single, multiple, or range) |
| id | `string` | - | HTML id |
| showIcon | `boolean` | - | Show calendar icon |
| error | `boolean` | `false` | Red border error state |
| placeholder | `string` | - | Placeholder text |
| dateFormat | `string` | - | Format string (e.g. 'dd/mm/yy') |
| selectionMode | `'single' \| 'multiple' \| 'range'` | `'single'` | Selection behavior |
| showTime | `boolean` | - | Include time picker |
| hourFormat | `'12' \| '24'` | - | 12/24 hour format |
| showButtonBar | `boolean` | - | Show today/clear buttons |
| minDate | `Date` | - | Minimum selectable date |
| maxDate | `Date` | - | Maximum selectable date |
| disabled | `boolean` | `false` | Disables the input |
| readonly | `boolean` | `false` | Read-only mode |
| manualInput | `boolean` | - | Allow typing date |
| disabledDates | `Date[]` | - | Dates to disable |
| numberOfMonths | `number` | - | Month grid size |
| showWeek | `boolean` | - | Show week numbers |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`
**Block variant**: SInputDateBlock

---

### SCombobox

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| number \| object` | - | v-model binding |
| id | `string` | - | HTML id for trigger element |
| disabled | `boolean` | `false` | Disables the combobox |
| error | `boolean` | `false` | Error state |
| rounded | `TRounded` | `'both'` | Border radius style |
| search | `true \| 'auto'` | - | Enable search mode; `'auto'` for client-side filtering |
| displayButtonText | `(option: unknown) => string` | - | Display text function (required in search mode) |
| flipOptions | `boolean` | `false` | Align dropdown to right edge |
| queryDebounce | `number` | `500` | Debounce delay (ms) for search query |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`, `query`
**Slots**: `default` (SComboboxOption items)
**Block variant**: SComboboxBlock

**Sub-component: SComboboxOption**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string \| number \| object` | - | Option value |
| disabled | `boolean` | `false` | Disables this option |
| class | `string` | - | CSS classes |

---

### STextarea

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string` | - | v-model binding |
| error | `boolean` | `false` | Red border error state |
| disabled | `boolean` | `false` | Disables the textarea |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`
**Block variant**: STextAreaBlock

---

### SInputAmount

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `number \| null` | - | Numeric amount value |
| currency | `string` (ISO 4217) | - | Currency code (e.g. 'USD', 'COP') |
| locale | `string` | - | Locale for number formatting (e.g. 'en-US') |
| symbol | `boolean` | - | Display currency symbol |
| suffixCurrency | `boolean` | - | Show currency code as suffix instead of prefix |
| currencies | `string[]` | - | Available currencies for dropdown selector |
| minorUnitMode | `boolean` | - | Treat value as minor units (cents) |

Also inherits SInput props (disabled, error, rounded, placeholder, etc.)

**Emits**: `update:modelValue`, `update:currency`, `info`, `change`
**Block variant**: SInputAmountBlock

---

### SInputMask

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| mask | `FactoryOpts['mask']` (IMask) | - | IMask pattern or configuration |

Also inherits SInput props (modelValue, disabled, error, rounded, placeholder, etc.)

**Emits**: `update:modelValue`, `complete`
**Block variant**: SInputMaskBlock

---

### SInputPassword

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| rules | `TRules` | - | Validation rules object (min, max, lowercase, uppercase, digit, special) |
| meter | `boolean` | `false` | Show strength meter bar below input |

Also inherits SInput props (modelValue, disabled, error, rounded, placeholder, etc.)

**Rules keys**: `min: number`, `max: number`, `lowercase: boolean`, `uppercase: boolean`, `digit: boolean`, `special: boolean`

**Emits**: `update:modelValue`, `state`, `isValid`
**Block variant**: SInputPasswordBlock

---

### SInputIncrement

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `number` | - | Current numeric value |
| disabled | `boolean` | `false` | Disables input and buttons |
| error | `boolean` | `false` | Error state |
| min | `number` | - | Minimum allowed value |
| max | `number` | - | Maximum allowed value |
| containerClass | `HTMLAttributes['class']` | - | Classes for the container |

**Emits**: `update:modelValue`
**Block variant**: SInputIncrementBlock

---

### SInputOtp

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string` | - | Current OTP string |
| disabled | `boolean` | `false` | Disables the input |
| success | `boolean` | `false` | Green border success state |
| error | `boolean` | `false` | Red border error state |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Sub-component: SInputOtpItem** -- each OTP cell, accepts `class`.

**Emits**: `update:modelValue`
**Block variant**: SInputOtpBlock

---

### SInputTag

**Category**: dataInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string[]` | - | Array of tag strings |
| error | `boolean` | `false` | Error state |
| disabled | `boolean` | `false` | Disables adding/removing tags |
| rounded | `TRounded` | `'both'` | Border radius style |
| borderless | `boolean` | `false` | Remove border |
| placeholder | `string` | - | Placeholder text |
| type | `string` | `'text'` | HTML input type |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`

---

## Selectors

### SCheckbox

**Category**: selectors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean \| string[]` | - | Single boolean or array for groups |
| value | `string` | - | Value identifier when used in group |
| id | `string` | auto-generated | HTML id |
| name | `string` | - | HTML name |
| disabled | `boolean` | `false` | Disables the checkbox |
| inline | `boolean` | `false` | Label inline with description |
| reverse | `boolean` | `false` | Checkbox on right side |

**Emits**: `update:modelValue`
**Slots**: `default` (label), `description`

---

### SRadio

**Category**: selectors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean \| string` | - | v-model for radio group (required) |
| value | `string` | - | This radio's value (required) |
| id | `string` | auto-generated | HTML id |
| name | `string` | - | HTML name for grouping |
| disabled | `boolean` | `false` | Disables the radio |
| inline | `boolean` | `false` | Label inline with description |
| reverse | `boolean` | `false` | Radio on right side |

**Emits**: `update:modelValue`
**Slots**: `default` (label), `description`

---

### SRadioGroup

**Category**: selectors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string` | - | Currently selected value (required) |
| disabled | `boolean` | `false` | Disables all items |

**Emits**: `update:modelValue`
**Slots**: `default` (SRadioGroupItem elements)

**Sub-component: SRadioGroupItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | - | Unique value for this option (required) |
| disabled | `boolean` | `false` | Disables this item |

**Slots**: `default` (label), `description`

---

### SSwitch

**Category**: selectors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | - | Switch state (required) |
| icon | `boolean \| FunctionalComponent` | - | Show icons in knob (true = default check/cross) |
| iconOn | `FunctionalComponent` | - | Custom icon when on |
| iconOff | `FunctionalComponent` | - | Custom icon when off |
| passive | `boolean` | `false` | Only toggle via switch, not label click |
| reverse | `boolean` | `false` | Switch on right side |

**Emits**: `update:modelValue`
**Slots**: `default` (label), `description`

---

### SSelector

**Category**: selectors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `Record<string, any> \| string` | - | Selected value |
| options | `(Record<string, any> \| string)[]` | - | Available options (required) |
| optionLabel | `string` | `'label'` | Property name for display text |
| optionValue | `string` | - | Property name for value |
| optionGroupLabel | `string` | - | Group label property (grouped options) |
| optionGroupItems | `string` | - | Group items array property |
| search | `boolean \| 'manual'` | - | Enable search; `'manual'` for external filtering |
| clearable | `boolean` | `false` | Show clear button |
| loading | `boolean` | `false` | Show loading spinner |
| placeholder | `string` | - | Placeholder text |
| error | `boolean` | `false` | Error state |
| rounded | `TRounded` | `'both'` | Border radius style |
| disabled | `boolean` | `false` | Disables the selector |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`, `query`
**Block variant**: SSelectorBlock

---

### SMultiSelector

**Category**: selectors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `(Record<string, any> \| string)[]` | - | Selected values array |
| options | `(Record<string, any> \| string)[]` | - | Available options (required) |
| optionLabel | `string` | `'label'` | Property name for display text |
| optionValue | `string` | - | Property name for value |
| optionGroupLabel | `string` | - | Group label property |
| optionGroupItems | `string` | - | Group items array property |
| search | `boolean` | - | Enable search filtering |
| clearable | `boolean` | `false` | Show clear-all button |
| removable | `boolean` | `false` | Show remove button per selected item |
| badgeList | `boolean` | `false` | Display selected items as badges |
| handler | `boolean` | `false` | Enable handler mode |
| compact | `boolean` | `false` | Compact display |
| count | `number` | - | Max visible selected items count |
| loading | `boolean` | `false` | Show loading spinner |
| placeholder | `string` | - | Placeholder text |
| error | `boolean` | `false` | Error state |
| rounded | `TRounded` | `'both'` | Border radius style |
| disabled | `boolean` | `false` | Disables the selector |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`, `update:options`, `query`, `add`

---

## Display

### SAlert

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | Alert title |
| description | `string` | - | Alert message body |
| icon | `FunctionalComponent` | - | Icon component |
| color | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'error' \| 'neutral'` | `'neutral'` | Color theme |
| variant | `'solid' \| 'outline' \| 'soft' \| 'subtle'` | - | Visual style |
| closeable | `boolean` | `false` | Show close button |
| closeIcon | `FunctionalComponent` | - | Custom close icon |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Slots**: `default` (content), `icon`, `close-button`

---

### SBadge

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | `'primary' \| 'gray' \| 'red' \| 'blue' \| 'green' \| 'yellow' \| 'indigo' \| 'white' \| 'purple' \| 'neutral'` | `'gray'` | Color variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| dot | `boolean` | `false` | Show colored dot indicator |
| outline | `boolean` | `false` | Transparent bg with border |
| pill | `boolean` | `false` | Fully rounded shape |
| removable | `boolean \| 'stopPropagation'` | `false` | Show remove button |
| reverse | `boolean` | `false` | Reverse content order |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Emits**: `removed`
**Slots**: `default` (content), `tag`

---

### SCard

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | Card title |
| size | `'sm' \| 'md'` | `'md'` | Padding/border-radius size |
| icon | `FunctionalComponent \| 'primary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | - | Header icon |
| iconColor | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | - | Icon background color |
| iconType | `'solid' \| 'ping'` | `'solid'` | Icon style (solid circle or animated ping) |
| closable | `boolean` | `false` | Show close button in header |
| actions | `{ icon: FunctionalComponent, onClick: () => void, text: string }[]` | - | Footer action buttons |
| class | `string` | - | CSS classes |

**Slots**: `default` (body), `icon`, `header`, `footer`, `actions`

---

### SLink

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| href | `string` | - | URL (required) |
| target | `'_blank' \| '_self' \| '_parent' \| '_top'` | - | Link target |

**Slots**: `default` (link text)

---

### SAvatar

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | `string` | `''` | Image URL |
| name | `string` | `'?'` | Name for initials and alt text |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Avatar size |
| borderless | `boolean` | `false` | Remove outline border |
| indicator | `boolean` | `false` | Show status indicator dot |
| indicatorPosition | `'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom'` | `'right-top'` | Indicator dot position |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Slots**: `default` (custom content)

---

### SBreadcrumbs

**Category**: display

Container component. Uses SBreadcrumbsItem as children.

**Sub-component: SBreadcrumbsItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| href | `string` | - | URL for this breadcrumb (required) |
| first | `boolean` | `false` | Hides chevron separator |
| active | `boolean` | `false` | Current page styling + aria-current |
| icon | `FunctionalComponent` | - | Icon before text |
| as | `string \| Component` | `'a'` | Render element (e.g. router-link) |

**Slots**: `default` (breadcrumb text)

---

### SToast

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'success' \| 'error' \| 'warning'` | `'success'` | Notification type (icon + color) |
| title | `string` | - | Toast title |
| description | `string` | - | Secondary description |
| leftBorder | `boolean` | `false` | Colored left border |
| closeable | `boolean` | `false` | Show close button |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Emits**: `closeToast`
**Slots**: `default` (custom content)

---

### SCaption

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | `string` | - | Caption text (ignored when slot used) |
| variant | `'error' \| 'info'` | `'error'` | Text color variant |

**Slots**: `default` (custom content)

---

### SCardBrand

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | - | Brand identifier (e.g. 'visa', 'master', 'amex', 'pse') |
| size | `number` | - | Icon width/height in pixels |
| class | `string` | - | CSS classes |

Available brands: account, ach, alkosto, amex, athCard, athmv, avalButton, bancolombiaButton, cash, codensa, comfandi, compensarWallet, credencial, debit, diners, discover, elo, epm, equity, exito, ganapin, jcb, maestro, master, mefia, pagoEfectivo, paypal, pse, ris, safetyPay, somos, tarjetaClave, transerverPoints, tuya, visaElectron, visa

---

### SPlacetopayLogo

**Category**: display

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | `number` | - | Logo width in pixels |
| height | `number` | - | Logo height in pixels |
| size | `'md'` | - | Size preset (md = 202px width) |
| mode | `'base' \| 'dark' \| 'blackAndWhite'` | `'base'` | Color mode |
| class | `string` | - | CSS classes |

---

## Modals & Overlays

### SModal

**Category**: modals

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | - | Visibility control (required) |
| position | `'top' \| 'nearTop' \| 'center' \| 'bottom'` | - | Vertical placement |
| responsive | `boolean` | `true` | Adjust layout for small screens |
| preventClose | `boolean` | `false` | Prevent backdrop click close |

**Slots**: `default` (modal content)

---

### SModalCard

**Category**: modals

Combines SModal + SCard props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | - | Visibility control (required) |
| position | `'top' \| 'nearTop' \| 'center' \| 'bottom'` | - | Vertical placement |
| responsive | `boolean` | `true` | Adjust layout for small screens |
| preventClose | `boolean` | `false` | Prevent backdrop click close |
| title | `string` | - | Card title |
| size | `'sm' \| 'md'` | `'md'` | Card padding/border-radius |
| icon | `FunctionalComponent \| 'primary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | - | Header icon |
| iconColor | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | - | Icon background color |
| iconType | `'solid' \| 'ping'` | `'solid'` | Icon style |
| closable | `boolean` | `false` | Show close button |
| actions | `TAction[]` | - | Footer action buttons |
| class | `string` | - | CSS classes |

**Emits**: `close`, `update:open`
**Slots**: `default` (body), `icon`, `header`, `footer`, `actions`

---

### SModalConfirm

**Category**: modals

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| description | `string` | - | Modal body text (required) |
| confirmText | `string` | i18n default | Custom confirm button label |
| cancelText | `string` | i18n default | Custom cancel button label |

**Emits**: `update:open`, `confirm`, `cancel`
**Slots**: `default` (trigger)

---

### SModalLeft

**Category**: modals

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | - | Visibility (required) |
| breakpoint | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| number` | - | Breakpoint above which modal hides |
| class | `string` | - | CSS classes |
| backdropClass | `string` | - | Backdrop overlay classes |

**Emits**: `close`, `backdropClick`
**Slots**: `default` (content)

---

### SModalSide

**Category**: modals

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | - | Visibility (required) |
| side | `'left' \| 'right'` | `'left'` | Slide-in direction |
| breakpoint | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| number` | - | Breakpoint above which modal hides |
| class | `string` | - | CSS classes |
| backdropClass | `string` | - | Backdrop overlay classes |

**Emits**: `close`, `backdropClick`
**Slots**: `default` (content)

---

### SPopover

**Category**: modals

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| placement | `Placement` (FloatingUI) | `'bottom-start'` | Floating panel position |
| offset | `number` | `0` | Distance from trigger (px) |
| arrow | `'auto' \| 'light' \| 'dark'` | - | Arrow style |
| backdrop | `boolean` | - | Overlay on small screens |
| static | `boolean` | - | Disable auto-flip |
| preventClose | `boolean` | `false` | Stay open on blur |
| preventFocus | `boolean` | `false` | Don't auto-focus panel |
| responsive | `boolean` | `true` | Responsive behavior |
| useShow | `boolean` | - | Use v-show instead of v-if |
| class | `string` | - | CSS classes |

**Emits**: `close`, `focusFloating`, `focusoutFloating`
**Slots**: `default` (trigger), `floating` (panel content)

---

### STooltip

**Category**: modals

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | Tooltip text (required) |
| color | `'dark' \| 'light' \| 'auto'` | `'auto'` | Color theme |
| placement | `Placement` (FloatingUI) | `'bottom'` | Position |
| arrow | `boolean` | `true` | Show arrow |
| offset | `number` | - | Distance from trigger (px) |
| static | `boolean` | - | Disable auto-flip |
| manual | `boolean` | - | Disable auto open/close |

**Slots**: `default` (trigger element)

---

### SDropdown

**Category**: modals

Extends all SPopover props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| referenceClass | `string` | - | Trigger button classes |
| floatingClass | `string` | - | Panel classes |
| manual | `boolean` | - | Disable auto open/close |
| variant | `'default' \| 'compact'` | `'default'` | Visual style; compact = tighter spacing, no dividers |

Inherits SPopover props: `placement`, `offset`, `arrow`, `backdrop`, `static`, `preventClose`, `preventFocus`, `responsive`, `useShow`, `class`

**Slots**: `default` (trigger), `items` (menu items)

**Sub-component: SDropdownItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | `FunctionalComponent` | - | Icon before label |
| disabled | `boolean` | `false` | Disables the item |
| link | `string` | - | Render as anchor with this URL |
| class | `string` | - | CSS classes |
| labelClass | `string` | - | Label text classes |
| iconClass | `string` | - | Icon classes |

---

## Structure & Layout

### SDTable

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `Record<string, any>[]` | - | Row data objects (required) |
| paginator | `TPaginatorProps` | - | Pagination config (see SPaginator) |
| borderless | `boolean` | `false` | Remove outer border |
| slim | `boolean` | `false` | Compact cell padding |
| loading | `boolean` | `false` | Skeleton loading state |
| rowLink | `(row: Record<string, any>) => string` | - | Make rows clickable |
| rowLinkAs | `Component` | - | Custom row link wrapper (e.g. router-link) |
| class | `ClassNameValue` | - | CSS classes |

**Emits**: `sort`, `paginatorChange`, `toggleExpanders`
**Slots**: column-scoped slots via SDColumn

**Sub-component: SDColumn**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| field | `string \| symbol` | - | Data field key |
| header | `string` | - | Column header label |
| sort | `'asc' \| 'des' \| boolean` | - | Enable/set sort direction |
| noLink | `boolean` | `false` | Exclude from row link |
| unstyled | `boolean` | `false` | Remove default cell styling |
| expander | `boolean` | `false` | Expand/collapse toggle button |

---

### STable

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cols | `string[]` | - | Column header labels |
| rows | `string[]` | - | Row data |
| highlight | `number[]` | - | Column indices to highlight |
| borderless | `boolean` | `false` | Remove outer border |
| class | `ClassNameValue` | - | CSS classes |

**Slots**: `header`, `body`, `footer`

**Sub-component: STableHeadCell** -- accepts `class`.

---

### SAccordion

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | - | Expanded state (required) |
| vertical | `boolean` | `true` | Expand direction (false = horizontal) |
| class | `string` | - | CSS classes |

**Slots**: `default` (trigger), `content` (panel)

---

### STab

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string` | - | Active tab path (required) |
| variant | `'underline' \| 'pills' \| 'vetches'` | `'underline'` | Visual style |
| full | `boolean` | - | Stretch tabs to full width |
| dropdownResponsive | `boolean` | - | Overflow dropdown on small screens |
| longestCommonPrefix | `boolean` | - | LCP matching for active detection |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`

**Sub-component: STabItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| path | `string` | - | Unique identifier matching modelValue |
| regex | `RegExp` | - | Custom active state matching |
| active | `boolean` | - | Manually set active |
| as | `string \| Component` | `'button'` | Render element |
| icon | `FunctionalComponent` | - | Icon before label |
| dropdown | `boolean` | - | Tab as dropdown trigger |
| class | `string` | - | CSS classes |

**Sub-component: STabDropdownItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| path | `string` | - | Unique identifier |
| regex | `RegExp` | - | Custom active matching |
| as | `string \| Component` | - | Render element |

---

### SPaginator

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| page | `number` | - | Current page |
| size | `number` | - | Items per page |
| total | `number` | - | Total items |
| count | `number` | - | Current page item count |
| pageSizes | `number[]` | - | Page size options |
| hideNumbers | `boolean` | - | Hide page numbers |
| hideWhenSinglePage | `boolean` | - | Hide when single page |
| canGoPrev | `boolean` | - | Enable prev button |
| canGoNext | `boolean` | - | Enable next button |
| fitSize | `boolean` | - | Fit size dropdown |
| paginatorSize | `string` | - | Paginator size class |
| laravel | `TLaravelPagination \| TLaravelResource` | - | Laravel pagination data |
| inertiaRouter | `any` | - | Inertia.js router integration |
| class | `string` | - | CSS classes |

**Emits**: `change` (page, size, dir), `update:page`, `update:size`

---

### SSidebar

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string` | - | Active path (required) |
| placetopayHeader | `boolean \| (() => any)` | - | Show PlaceToPay header or custom render |
| nested | `boolean` | - | Nested sidebar mode |
| class | `string` | - | CSS classes |

**Emits**: `update:modelValue`

**Sub-component: SSidebarItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| path | `string` | - | Navigation path |
| icon | `FunctionalComponent` | - | Item icon |
| active | `boolean` | - | Active state |
| as | `string \| Component` | - | Render element |

**Sub-component: SSidebarItemGroup** -- extends SSidebarItem + `accordion: boolean`
**Sub-component: SSidebarSeparator** -- `title: string`

---

### SSteps

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'simple' \| 'circlesWithText'` | - | Visual style |
| steps | `TStepsItemsProps[]` | - | Step items array |

**Step item shape**: `{ status: 'complete' \| 'current' \| 'upcoming', href: string, name?: string, description?: string, last?: boolean }`

**Slots**: per-step scoped slots for name and description

---

### SStackedList

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| class | `ClassNameValue` | - | Container classes |

**Sub-component: SStackedListItem** -- `class: ClassNameValue`

**Slots**: `default` (list items)

---

### SButtonGroup

**Category**: structure

Container component. Uses SButtonGroupItem as children.

**Sub-component: SButtonGroupItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | `boolean` | - | Currently active/selected |
| disabled | `boolean` | - | Disabled state |
| icon | `FunctionalComponent` | - | Button icon |
| endIcon | `boolean` | - | Icon after text |
| first | `boolean` | - | First item (left radius) |
| last | `boolean` | - | Last item (right radius) |
| prev | `boolean` | - | Chevron-left pagination |
| next | `boolean` | - | Chevron-right pagination |
| as | `any` | - | Custom render element |
| class | `string` | - | CSS classes |

---

### STemplateHeaderTable

**Category**: structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | Header title (required) |

**Emits**: `search` (query string)
**Slots**: `default`, `actions`, `filters`

---

## Utilities

### SButton

**Category**: utilities

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | `string \| Component` | `'button'` | Render element or component |
| variant | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Color scheme |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| rounded | `TRounded` | - | Border radius |
| disabled | `boolean` | `false` | Disables the button |
| icon | `FunctionalComponent` | - | Shortcut for leftIcon |
| leftIcon | `FunctionalComponent` | - | Left-side icon |
| rightIcon | `FunctionalComponent` | - | Right-side icon |
| loading | `boolean` | `false` | Loading state (text transparent) |
| outline | `boolean` | `false` | Transparent bg, colored border/text |
| link | `boolean` | `false` | No bg/border, colored text with hover |
| circular | `boolean` | `false` | Circular shape (icon only) |
| type | `'button' \| 'submit'` | - | HTML button type |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Slots**: `default` (button text)

---

### SLabel

**Category**: utilities

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| for | `string` | - | Associated input id for click-to-focus |
| srOnly | `boolean` | `false` | Visually hidden, screen-reader accessible |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Slots**: `default` (label text)

---

### SFilter

**Category**: utilities

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fields | `TField[]` | - | Filter field definitions (required) |
| hideApplyButton | `boolean` | - | Hide the apply button |
| hideClearButton | `boolean` | - | Hide the clear button |
| applyWhenClear | `boolean` | - | Emit apply when clearing filters |
| immediateApply | `boolean` | - | Apply filters immediately on change |
| responsive | `boolean` | - | Responsive layout |
| saved | `TSaveData[]` | - | Saved filter presets |

**Field shape**: `{ id: string, name: string, interfaces?: TInterfaces, permanent?: boolean, state?: { operator, value }, validate?: (value, operator) => string \| null }`

**Emits**: `apply` (fields), `save` (data), `load` (filters), `clear` (fields)

---

### SCopy

**Category**: utilities

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | - | Text to copy (falls back to slot content) |
| class | `string` | - | CSS classes |

**Emits**: `copied` (value)
**Slots**: `default` (content to display)

---

### SColorSwitch

**Category**: utilities

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `'system' \| 'light' \| 'dark'` | - | Current color mode |

**Emits**: `update:modelValue`

---

## Typography

### SPageTitle

**Category**: typography

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| class | `HTMLAttributes['class']` | - | CSS classes |

**Slots**: `default` (title text)

---

### SSectionTitle

**Category**: typography

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'` | HTML heading element |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Slots**: `default` (title text)

---

### SSectionDescription

**Category**: typography

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | `string` | `'p'` | HTML element to render |
| class | `HTMLAttributes['class']` | - | CSS classes |

**Slots**: `default` (description text)

---

## Block Variants

Block variants wrap a base component with `InputContainer`, adding label, description, error caption, and consistent form layout. They accept all props of the base component plus the InputContainer props (label, description, error message, etc.).

| Block Variant | Base Component |
|---------------|----------------|
| SInputBlock | SInput |
| SInputAmountBlock | SInputAmount |
| SInputDateBlock | SInputDate |
| SInputIncrementBlock | SInputIncrement |
| SInputMaskBlock | SInputMask |
| SInputOtpBlock | SInputOtp |
| SInputPasswordBlock | SInputPassword |
| STextAreaBlock | STextarea |
| SSelectBlock | SSelect |
| SComboboxBlock | SCombobox |
| SSelectorBlock | SSelector |
| SCustomBlock | Custom form input |

---

## Internal Components

### SDefinitionTerm

Used internally for definition list layouts.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| labels | `string \| string[]` | - | Term label(s) |
| description | `string` | - | Description text |
| oneline | `boolean` | - | Single-line layout |
| class | `ClassNameValue` | - | CSS classes |
