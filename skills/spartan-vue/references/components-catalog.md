# Spartan Vue Component Catalog

## Overview

Total Components: **65** (including block variants)
Core Components: **43** (tracked in componentStatus.ts)
Library Status: Fully typed, with JSDoc, dark mode support, responsive design
Build: Vite + Rollup with per-component entry points

---

## Summary by Category

| Category | Count | Notable Components |
|----------|-------|-------------------|
| **dataInput** | 10 | SInput, SSelect, SInputDate, SCombobox, STextarea |
| **selectors** | 6 | SCheckbox, SRadio, SSwitch, SSelector, SMultiSelector |
| **display** | 11 | SAlert, SBadge, SCard, SToast, SBreadcrumbs, SAvatar, SLink |
| **modals** | 8 | SModal, SPopover, STooltip, SDropdown, SModalCard, SModalConfirm |
| **structure** | 8 | STable, SDTable, SAccordion, STab, SPaginator, SSidebar, SSteps |
| **utilities** | 3 | SButton, SLabel, SFilter, SCopy |
| **typography** | 3 | SPageTitle, SSectionTitle, SSectionDescription |
| **internal/blocks** | 17 | Block variants (SInputBlock, SSelectBlock, etc.) |

---

## TOP 20 CORE COMPONENTS

### 1. **SButton** (utilities)
- **Status**: ✓ Complete | 100% coverage | Dark mode | Responsive
- **Figma**: [View Design](https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=146-240)
- **Props**:
  - `as?: string | Component` - HTML element or Vue component (default: 'button')
  - `variant: 'primary' | 'secondary' | 'danger'` - Color scheme
  - `size: 'sm' | 'md' | 'lg'` - Button size (text height)
  - `rounded?: TRounded` - Border radius
  - `disabled?: boolean`
  - `icon?: FunctionalComponent` - Left icon (shortcut for leftIcon)
  - `leftIcon?: FunctionalComponent` - Left-side icon
  - `rightIcon?: FunctionalComponent` - Right-side icon
  - `loading?: boolean` - Loading state (text transparent)
  - `outline?: boolean` - Transparent bg, colored border/text
  - `link?: boolean` - No bg/border, colored text w/ hover
  - `circular?: boolean` - Circular shape (icon only)
  - `type?: 'button' | 'submit'` - HTML button type
  - `class?: HTMLAttributes['class']` - Extra CSS
- **CVA Variants**:
  - `variant`: primary, secondary, danger (with compound variants for outline/link)
  - `size`: text (sm/md/lg), noText (sm/md/lg) - different padding for icons
  - `outline`: cbv()
  - `link`: cbv()
  - `circular`: cbv()
  - `loading`: cbv('text-transparent select-none pointer-events-none')
  - `disabled`: cbv('opacity-50 pointer-events-none')
  - `rounded`: roundedClass
- **Key Slots**: default (button text)
- **Dependencies**: Tailwind, CVA

---

### 2. **SInput** (dataInput)
- **Status**: ✓ Complete | 100% coverage | Dark mode | Responsive
- **Figma**: [View Design](https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13016-16548&t=SeafmOCyazOmoll4-4)
- **Props**:
  - `modelValue: string | number | null` - v-model binding
  - `type?: string` - HTML input type (default: 'text')
  - `id: string` - HTML id attribute
  - `name: string` - HTML name attribute
  - `placeholder?: string` - Placeholder text
  - `disabled?: boolean`
  - `error?: boolean` - Red border/ring on error
  - `rounded: TRounded` - Border radius (default: 'both')
  - `prefix?: string` - Static left text (e.g., "https://")
  - `suffix?: string` - Static right text (e.g., ".com")
  - `leftIcon?: FunctionalComponent` - Left-side icon
  - `rightIcon?: FunctionalComponent` - Right-side icon
  - `leftOption?: string` - Selected left selector value
  - `leftOptions?: { label, value }[]` - Left dropdown options
  - `rightOption?: string` - Selected right selector value
  - `rightOptions?: { label, value }[]` - Right dropdown options
  - `borderless?: boolean` - Remove border
  - `leftOrderSlots?: string` - Comma-separated slot order (default: 'selector,text,icon,slot')
  - `rightOrderSlots?: string` - Comma-separated slot order (default: 'slot,icon,text,selector')
  - `inputClass?: string` - Classes for inner `<input>`
  - `class?: HTMLAttributes['class']` - Container classes
- **CVA Variants**:
  - `disabled`: cbv(inputStyle.disabled)
  - `error`: cbv(red border/ring, vs default border/ring)
  - `rounded`: roundedStyle
  - `borderless`: cbv('border-0')
  - `rightOptions`, `leftOptions`: cbv() for padding adjustment
- **Emits**: 'update:modelValue', 'update:leftOption', 'update:rightOption'
- **Key Slots**: left-slot, right-slot (for custom elements before/after options)
- **Dependencies**: Tailwind, CVA, InputContainer internal component

---

### 3. **SSelect** (dataInput)
- **Status**: ✓ Complete | 100% coverage | Dark mode | Responsive
- **Figma**: [View Design](https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13016-16548&t=SeafmOCyazOmoll4-4)
- **Props**:
  - `modelValue?: string | number` - v-model binding
  - `id?: string` - HTML id
  - `name?: string` - HTML name
  - `placeholder?: string` - Placeholder option text
  - `disabled?: boolean`
  - `error?: boolean`
  - `rounded?: TRounded` - Border radius (default: 'both')
  - `class?: HTMLAttributes['class']`
- **CVA Variants**:
  - `disabled`: cbv(inputStyle.disabled)
  - `error`: cbv(red border/ring, vs default)
  - `rounded`: roundedStyle
- **Emits**: 'update:modelValue'
- **Key Slots**: default (option elements)
- **Dependencies**: Headless native `<select>`

---

### 4. **SInputDate** (dataInput)
- **Status**: ✓ Complete | 75% coverage | Dark mode | Responsive
- **Props**:
  - `modelValue: Date | Date[] | null` - v-model binding (single, multiple, or range)
  - `id?: string` - HTML id
  - `showIcon?: boolean` - Show calendar icon
  - `error?: boolean`
  - `placeholder?: string`
  - `dateFormat?: string` - Format (e.g., 'dd/mm/yy', 'mm/dd/yy', 'yy-mm-dd')
  - `selectionMode?: 'single' | 'multiple' | 'range'` - Selection behavior
  - `showTime?: boolean` - Include time picker
  - `hourFormat?: '12' | '24'` - 12/24 hour format
  - `showButtonBar?: boolean` - Show today/clear buttons
  - `minDate?: Date` - Minimum selectable date
  - `maxDate?: Date` - Maximum selectable date
  - `disabled?: boolean`
  - `readonly?: boolean`
  - `manualInput?: boolean` - Allow typing date
  - `disabledDates?: Date[]` - Dates to disable
  - `numberOfMonths?: number` - Month grid size
  - `showWeek?: boolean` - Show week numbers
  - `class?: string`
- **CVA Variants**:
  - `error`: cbv() - Red border vs default (simple style)
- **Emits**: 'update:modelValue'
- **Dependencies**: @vuepic/vue-datepicker (PrimeVue DatePicker)

---

### 5. **SModal** (modals)
- **Status**: ✓ Partial | 76% coverage | Dark mode
- **Props**:
  - `open: boolean` - Visibility control
  - `position?: 'top' | 'nearTop' | 'center' | 'bottom'` - Vertical placement
  - `responsive?: boolean` - Adjust for small screens (default: true)
  - `preventClose?: boolean` - Prevent backdrop click close (default: false)
- **Key Slots**: default (modal content)
- **Dependencies**: Headless dialog primitives

---

### 6. **STable** (structure)
- **Status**: ✓ Partial | 73% coverage | Dark mode | Responsive
- **Props**:
  - `borderless: boolean` - Remove outer border
  - `cols: string[]` - Column header labels
  - `rows: string[]` - Row data
  - `highlight: number[]` - Column indices to highlight
  - `class?: ClassNameValue`
- **CVA Variants**: Present (see styles.ts)
- **Key Slots**: header, body, footer, cells
- **Dependencies**: Tailwind, tailwind-merge

---

### 7. **SDTable** (Data Table - structure)
- **Status**: ✓ Partial | 86% coverage | Dark mode | Responsive
- **Props**:
  - `data: Record<string, any>[]` - Row objects
  - `paginator?: TPaginatorProps` - Pagination config
  - `borderless?: boolean`
  - `slim?: boolean` - Compact cell padding
  - `loading?: boolean` - Skeleton state
  - `rowLink?: (row) => string` - Make rows clickable
  - `rowLinkAs?: Component` - Custom row wrapper (e.g., router-link)
  - `class?: ClassNameValue`
- **Emits**: 'sort' (field, direction), 'paginatorChange' (page, size, dir), 'toggleExpanders'
- **Key Slots**: column(field), header, body, footer
- **Dependencies**: @tanstack/vue-table, SPaginator

---

### 8. **SAlert** (display)
- **Status**: ✓ Complete | 100% coverage | Dark mode
- **Props**:
  - `title?: string` - Alert title
  - `description?: string` - Alert message
  - `icon?: FunctionalComponent` - Icon component
  - `color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'` (default: 'neutral')
  - `variant?: 'solid' | 'outline' | 'soft' | 'subtle'` - Style variant
  - `closeable?: boolean` - Show close button
  - `closeIcon?: FunctionalComponent` - Custom close icon
  - `class?: HTMLAttributes['class']`
- **CVA Variants**:
  - `color`: 7 colors (neutral, primary, secondary, success, info, warning, error)
  - `variant`: 4 styles (solid, outline, soft, subtle) with compound variants for each color
- **Emits**: None (child components emit close events)
- **Key Slots**: default (content), icon, close-button
- **Dependencies**: Tailwind, CVA

---

### 9. **SBadge** (display)
- **Status**: ✓ Complete | 100% coverage | Dark mode | Responsive
- **Props**:
  - `color?: 'primary' | 'gray' | 'red' | 'blue' | 'green' | 'yellow' | 'indigo' | 'white' | 'purple' | 'neutral'` (default: 'gray')
  - `size?: 'sm' | 'md' | 'lg'` (default: 'md')
  - `dot?: boolean` - Show colored dot
  - `outline?: boolean` - Transparent bg with border
  - `pill?: boolean` - Fully rounded (border-radius: 999px)
  - `removable?: boolean | 'stopPropagation'` - Show remove button
  - `reverse?: boolean` - Reverse content order
  - `class?: HTMLAttributes['class']`
- **CVA Variants**:
  - `color`: 10 colors with light/dark backgrounds
  - `size`: sm (px-2.5 py-0.5), md (px-3 py-0.5), lg (px-3 py-1.5)
  - `outline`: cbv('outline outline-1 -outline-offset-1')
  - `pill`: cbv('rounded-full')
  - `dot`: cbv() - padding adjustments
  - `removable`: cbv() - padding adjustments
  - `reverse`: cbv()
  - Complex compound variants for padding + dot/removable combinations
- **Emits**: 'removed'
- **Key Slots**: default (badge content), tag (optional tag element)
- **Dependencies**: CVA, Tailwind

---

### 10. **SCard** (display)
- **Status**: ✓ Complete | 90% coverage | Dark mode | Responsive
- **Props**:
  - `title?: string` - Card title
  - `size?: 'sm' | 'md'` (default: 'md') - Padding/border-radius size
  - `icon?: FunctionalComponent | 'primary' | 'success' | 'danger' | 'warning' | 'info'` - Icon in header
  - `iconColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info'` - Icon bg color
  - `iconType?: 'solid' | 'ping'` (default: 'solid') - Solid circle or animated ping
  - `closable?: boolean` - Show close button in header
  - `actions?: { icon, onClick, text }[]` - Action buttons in footer
  - `class?: string`
- **Key Slots**: default (card body), icon, header, footer, actions
- **Dependencies**: Tailwind, CVA

---

### 11. **SCheckbox** (selectors)
- **Status**: ✓ Complete | 100% coverage | Dark mode | Responsive
- **Props**:
  - `modelValue?: boolean | string[]` - v-model (single boolean or array for groups)
  - `value?: string` - Value when used in group
  - `id?: string` - HTML id (auto-generated)
  - `name?: string` - HTML name
  - `disabled?: boolean`
  - `inline?: boolean` - Label inline with description
  - `reverse?: boolean` - Checkbox on right (justify-between)
- **CVA Variants**:
  - Container: `reverse`, `disabled` (opacity/pointer-events)
  - Input: No variants (static Tailwind classes)
  - Label/description: Static styles
- **Key Slots**: default (label text), description (description text)
- **Dependencies**: Headless checkbox from @headlessui/vue

---

### 12. **SRadio** (selectors)
- **Status**: ✓ Complete | 100% coverage | Dark mode | Responsive
- **Props**:
  - `modelValue: boolean | string` - v-model (required)
  - `value: string` - This radio's value (required)
  - `id?: string` - HTML id (auto-generated)
  - `name?: string` - HTML name
  - `disabled?: boolean`
  - `inline?: boolean` - Label inline with description
  - `reverse?: boolean` - Radio on right (justify-between)
- **CVA Variants**:
  - Container: `reverse`, `disabled`
  - Input: No variants (static, rounded-full)
  - Label/description: Static
- **Key Slots**: default (label), description
- **Dependencies**: Headless radio from @headlessui/vue

---

### 13. **SSwitch** (selectors)
- **Status**: ✓ Complete | 100% coverage | Dark mode | Responsive
- **Props**:
  - `modelValue: boolean` - v-model (required)
  - `icon?: boolean | FunctionalComponent` - Show icons (default check/cross or custom)
  - `iconOn?: FunctionalComponent` - Custom icon when on
  - `iconOff?: FunctionalComponent` - Custom icon when off
  - `passive?: boolean` - Don't toggle on label/description click
  - `reverse?: boolean` - Switch on right (justify-between)
- **CVA Variants**:
  - Container: `reverse`
  - Track: `active` (cbv - spartan-primary-600 vs gray)
  - Knob: `active` (cbv - translate-x-5 vs translate-x-0)
  - Icons: `active` (opacity transitions)
  - Label/description: Static
- **Emits**: 'update:modelValue'
- **Key Slots**: default (label), description
- **Dependencies**: Headless switch from @headlessui/vue

---

### 14. **STooltip** (modals)
- **Status**: ✓ Partial | 70% coverage | Dark mode
- **Props**:
  - `title: string` - Tooltip text (required)
  - `color?: 'dark' | 'light' | 'auto'` (default: 'auto') - Theme
  - `placement?: Placement` (FloatingUI) (default: 'bottom') - Position
  - `arrow?: boolean` (default: true) - Show arrow
  - `offset?: number` - Distance from trigger
  - `static?: boolean` - Disable auto-flip
  - `manual?: boolean` - Disable auto open/close (use methods)
- **Key Slots**: default (trigger element)
- **Dependencies**: @floating-ui/vue, SPopover

---

### 15. **SPopover** (modals)
- **Status**: ✓ Complete | 61% coverage | Dark mode
- **Props**:
  - `placement?: Placement` (default: 'bottom-start') - FloatingUI placement
  - `offset?: number` (default: 0) - Distance from trigger
  - `arrow?: 'auto' | 'light' | 'dark'` - Arrow color
  - `backdrop?: boolean` - Overlay on small screens
  - `static?: boolean` - Disable auto-flip
  - `preventClose?: boolean` (default: false) - Stay open on blur
  - `preventFocus?: boolean` (default: false) - Don't auto-focus panel
  - `responsive?: boolean` (default: true) - Responsive behavior
  - `useShow?: boolean` - Use v-show instead of v-if
  - `class?: string`
- **Emits**: 'close', 'focusFloating', 'focusoutFloating'
- **Key Slots**: default (trigger), floating (panel content)
- **Dependencies**: @floating-ui/vue, Headless popover

---

### 16. **SDropdown** (modals)
- **Status**: ✓ Complete | 73% coverage | Dark mode
- **Props**: Extends SPopover with:
  - `manual?: boolean` - Disable auto open/close
  - `referenceClass?: string` - Trigger button classes
  - `floatingClass?: string` - Panel classes
- **Key Slots**: default (trigger), items (menu items)
- **Dependencies**: SPopover, @floating-ui/vue

---

### 17. **STab** (structure)
- **Status**: ✓ Complete | 43% coverage | Dark mode
- **Props**:
  - `modelValue: string` - Active tab path (required)
  - `variant?: 'underline' | 'pills' | 'vetches'` (default: 'underline')
  - `full?: boolean` - Stretch tabs to full width
  - `dropdownResponsive?: boolean` - Overflow dropdown on small screens
  - `longestCommonPrefix?: boolean` - LCP matching for active detection
  - `class?: string`
- **Emits**: 'update:modelValue'
- **Sub-components**:
  - `STabItem`: `path`, `regex`, `active`, `as`, `icon`, `dropdown`, `class`
  - `STabDropdownItem`: `path`, `regex`, `as`
- **Key Slots**: default (tab items), items (for dropdown content)
- **Dependencies**: Headless tabs from @headlessui/vue

---

### 18. **SAccordion** (structure)
- **Status**: ✓ Complete | 100% coverage | Dark mode
- **Props**:
  - `open: boolean` - Expansion state (required)
  - `vertical?: boolean` (default: true) - Vertical expand/collapse
  - `class?: string`
- **Key Slots**: default (trigger), content (panel content)
- **Dependencies**: Headless disclosure

---

### 19. **SPaginator** (structure)
- **Status**: ✓ Complete | No coverage metric | Dark mode
- **Props**:
  - `page?: number` - Current page
  - `size?: number` - Items per page
  - `total?: number` - Total items
  - `count?: number` - Current page item count
  - `pageSizes?: number[]` - Page size options
  - `hideNumbers?: boolean` - Hide page numbers
  - `hideWhenSinglePage?: boolean` - Hide pagination
  - `canGoPrev?: boolean` - Enable prev button
  - `canGoNext?: boolean` - Enable next button
  - `fitSize?: boolean` - Fit size dropdown
  - `paginatorSize?: string` - Paginator size class
  - `laravel?: TLaravelPagination | TLaravelResource` - Laravel pagination data
  - `inertiaRouter?: any` - Inertia.js integration
  - `class?: string`
- **Emits**: 'change' (page, size, direction), 'update:page', 'update:size'
- **Key Slots**: default
- **Dependencies**: Tailwind

---

### 20. **SLink** (display)
- **Status**: ✓ Complete | 100% coverage | Dark mode
- **Props**:
  - `href: string` - URL (required)
  - `target?: '_blank' | '_self' | '_parent' | '_top'` - Link target
- **Key Slots**: default (link text)
- **Dependencies**: None (pure `<a>` element)

---

## Remaining Components (23 total)

### Data Input Components (6 remaining)
| Component | Status | Coverage | Dark Mode | Props Summary |
|-----------|--------|----------|-----------|---|
| **SInputAmount** | ✓ Partial | 65% | ✓ | modelValue, disabled, error, format, precision, currencySymbol |
| **SInputMask** | ✓ Complete | - | ✓ | modelValue, mask (IMask), disabled, error, placeholder |
| **SInputPassword** | ✓ Complete | - | ✓ | modelValue, visibility toggle, disabled, error |
| **SInputIncrement** | ✓ Complete | - | ✓ | modelValue, min, max, step, disabled |
| **SInputOtp** | ✓ Complete | - | ✓ | modelValue, length, success, error, disabled |
| **SInputTag** | ✓ Complete | - | ✓ | modelValue[], addable, removable, disabled |
| **SCombobox** | ✓ Complete | - | ✓ | modelValue, options, search mode, displayButtonText, queryDebounce |
| **STextarea** | ✓ Complete | - | ✓ | modelValue, rows, disabled, error, placeholder |

### Selector Components (2 remaining)
| Component | Status | Coverage | Dark Mode | Props Summary |
|-----------|--------|----------|-----------|---|
| **SRadioGroup** | ✓ Complete | 100% | ✓ | Wrapper for multiple SRadio components |
| **SSelector** | ✓ Partial | - | ✓ | Grid-based selector, variants, disabled, modelValue |
| **SMultiSelector** | ✓ Partial | - | ✓ | Multi-select grid variant |

### Display Components (6 remaining)
| Component | Status | Coverage | Dark Mode | Props Summary |
|-----------|--------|----------|-----------|---|
| **SAvatar** | ✓ Complete | 100% | ✓ | src, name, size, shape (circle/square), fallback |
| **SBreadcrumbs** | ✓ Complete | 100% | ✓ | items, separator |
| **SCaption** | ✓ Complete | 100% | ✓ | Simple caption text styling |
| **SCardBrand** | ✓ Complete | 50% | ✓ | Brand card display |
| **SToast** | ✓ Complete | 100% | ✓ | Message, type, duration, position |
| **SPlacetopayLogo** | ✓ Complete | 100% | ✓ | PlaceToPay logo display |

### Modal Components (4 remaining)
| Component | Status | Coverage | Dark Mode | Props Summary |
|-----------|--------|----------|-----------|---|
| **SModalCard** | ✓ Partial | 84% | ✓ | Extends SModal, card-like styling |
| **SModalConfirm** | ✓ Partial | - | ✓ | Confirmation modal with actions |
| **SModalLeft** | ✓ Complete | 100% | ✓ | Slide-in from left |
| **SModalSide** | ✓ Complete | 100% | ✓ | Side panel modal |

### Structure Components (6 remaining)
| Component | Status | Coverage | Dark Mode | Props Summary |
|-----------|--------|----------|-----------|---|
| **SSidebar** | ✓ Partial | 65% | ✓ | Collapsible sidebar with nav |
| **SSteps** | ✓ Complete | - | ✓ | Step indicator, linear/branching |
| **SStackedList** | ✓ Complete | - | ✓ | Vertical list with sections |
| **SButtonGroup** | ✓ Complete | - | ✓ | Group of buttons |
| **STemplateHeaderTable** | ✓ Complete | - | ✓ | Table with header template |

### Utility Components (2 remaining)
| Component | Status | Coverage | Dark Mode | Props Summary |
|-----------|--------|----------|-----------|---|
| **SFilter** | ✓ Partial | 67% | ✓ | Advanced filtering UI with operators |
| **SCopy** | ✓ Complete | 62% | ✓ | Copy-to-clipboard utility |

### Typography Components (3)
| Component | Status | Coverage | Dark Mode | Props Summary |
|-----------|--------|----------|-----------|---|
| **SPageTitle** | ✓ Complete | 100% | ✓ | Page-level heading |
| **SSectionTitle** | ✓ Complete | 100% | ✓ | Section heading |
| **SSectionDescription** | ✓ Complete | 100% | ✓ | Section description text |

### Internal Components (1)
| Component | Status | Props Summary |
|-----------|--------|---|
| **SDefinitionTerm** | ✓ Complete | Definition list term wrapper |

---

## Block Variants (17 components)

Block variants (suffix "Block") wrap components with InputContainer for consistent label/description styling:

| Block Variant | Base Component | Purpose |
|---------------|----------------|---------|
| SInputBlock | SInput | Input with label/description |
| SInputAmountBlock | SInputAmount | Amount input with label |
| SInputDateBlock | SInputDate | Date picker with label |
| SInputIncrementBlock | SInputIncrement | Increment input with label |
| SInputMaskBlock | SInputMask | Masked input with label |
| SInputOtpBlock | SInputOtp | OTP input with label |
| SInputPasswordBlock | SInputPassword | Password input with label |
| STextAreaBlock | STextarea | Textarea with label |
| SSelectBlock | SSelect | Select dropdown with label |
| SComboboxBlock | SCombobox | Combobox with label |
| SSelectorBlock | SSelector | Selector with label |
| SCustomBlock | SInput variant | Custom form input with label |

---

## Common Patterns Across Components

### 1. **CVA (Class Variance Authority)**
All styled components use CVA for variant management with:
- Base classes + variant combinations
- Compound variants for complex state interactions
- Dark mode support via Tailwind's `dark:` prefix
- TailwindMerge for proper class precedence

### 2. **Props Pattern**
- TypeScript interfaces in `types.ts`
- Bilingual JSDoc comments (@en/@es)
- Default values in component `defineProps`
- Discriminated unions for complex props (e.g., TComboboxNormalProps | TComboboxSearchProps)

### 3. **Styling Pattern**
```typescript
// types.ts
import { TButtonStyles } from './styles'
export type TButtonProps = {
  variant?: NonNullable<TButtonStyles['variant']>;
  size?: TButtonStyles['size'];
}

// styles.ts
import { cva, type VariantProps } from 'class-variance-authority'
export type TButtonStyles = VariantProps<typeof buttonStyles>
export const buttonStyles = cva('base classes', {
  variants: { /* ... */ },
  compoundVariants: [ /* ... */ ]
})
```

### 4. **Icon Props**
- Accept `FunctionalComponent` (Vue components)
- Support predefined icon variants ('primary', 'success', etc.) on some components
- Can use Heroicons or @placetopay/iconsax-vue/bold

### 5. **Form-like Components**
- `modelValue` prop for v-model binding
- 'update:modelValue' emit
- `disabled`, `error` props
- Error state: red border + red ring-focus

### 6. **Floating UI Components**
- SPopover, STooltip, SDropdown use @floating-ui/vue
- `placement` prop via FloatingUI types
- `offset` and `arrow` configuration
- Responsive behavior (backdrop on small screens)

### 7. **HeadlessUI Components**
- SCheckbox, SRadio, SSwitch wrap @headlessui/vue primitives
- Provide accessible form controls with custom styling
- Support label/description slots for flexible layouts

### 8. **Polymorphic Components**
- `as` prop allows rendering as different elements or components
- SButton, STab, STabDropdownItem support this
- Example: `<SButton as="a" href="...">` renders as link

### 9. **i18n Integration**
- Components using text (modals, buttons, etc.) depend on vue-i18n
- Translations in `src/locales/{es,en,pt,it,fr}/`
- Namespace: `$spartan`
- Test setup mocks i18n to return key strings

---

## Dependencies Summary

### External Libraries
| Library | Used By | Purpose |
|---------|---------|---------|
| `@headlessui/vue` | SCheckbox, SRadio, SSwitch, modals, tabs | Unstyled accessible primitives |
| `@floating-ui/vue` | SPopover, STooltip, SDropdown | Floating element positioning |
| `@heroicons/vue` | Optional in examples | Icon library |
| `@placetopay/iconsax-vue` | Optional in examples | PlaceToPay icon library |
| `@tanstack/vue-table` | SDTable | Data table engine |
| `@vuepic/vue-datepicker` | SInputDate | Date/time picker |
| `class-variance-authority` | All styled components | Type-safe variant system |
| `tailwind-merge` | All styled components | Class merging utility |
| `zod` | Optional validation | Schema validation |
| `imask` | SInputMask | Input masking |
| `vue-i18n` | Components with text | Internationalization |

### Internal Dependencies
| Module | Used By | Purpose |
|--------|---------|---------|
| `@/helpers` | All components | Utility functions (roundedClass, createBooleanVariation) |
| `@/constants` | Input components | Shared constants (inputStyle, etc.) |
| `@internal/*` | All components | InputContainer, Transitions, etc. |

---

## Testing Coverage Summary

| Category | Complete (100%) | High (75-99%) | Medium (50-74%) | Low (<50%) |
|----------|-----------------|---------------|-----------------|-----------|
| **dataInput** | SInput, SSelect | SInputDate (75) | SInputAmount (65) | - |
| **selectors** | SCheckbox, SRadio, SSwitch, SRadioGroup | - | - | - |
| **display** | SAlert, SAvatar, SBadge, SLink, SToast, SPlacetopayLogo, SCaption | SCard (90) | SCardBrand (50) | - |
| **modals** | SModalLeft, SModalSide, SPopover | SModalCard (84), SDropdown (73) | STooltip (70), SModal (76) | SModalConfirm |
| **structure** | SAccordion, STab (partial), SPaginator | SDTable (86), STable (73), SSidebar (65) | SButtonGroup | - |
| **utilities** | SButton, SLabel | SCopy (62) | SFilter (67) | - |
| **typography** | SPageTitle, SSectionTitle, SSectionDescription | - | - | - |

---

## Dark Mode Support

All 43 core components have dark mode support via:
- `dark:` Tailwind prefixes in variant definitions
- Color palette: gray-50/900, white/black/transparent variations
- Custom dark colors for spartan-primary brand color

Example:
```typescript
'bg-gray-100 text-gray-700 dark:bg-gray-400/20 dark:text-gray-400'
```

---

## Responsive Design

Components marked "responsive: true" include:
- Breakpoint-aware styling (Tailwind responsive prefixes)
- Mobile-optimized layouts (e.g., SPopover backdrop on small screens)
- Example components: SButton, SInput, SSelect, SCard, STable, SDTable

---

## Slot Architecture

All components expose slots for maximum flexibility:
- **Named slots**: icon, label, description, header, footer, etc.
- **Default slot**: Main content area
- **Scoped slots**: SDTable uses scoped slots for column content

---

## Build Output

After `npm run build`, the dist folder contains:
- Per-component `.mjs`, `.cjs`, `.d.ts` files
- `dist/locales/` - Translation files
- `dist/styles/` - CSS outputs
- `dist/plugin.mjs/cjs` - Tailwind plugin
