# Components Index

Thin name → category index. For the full API of any component, **trust your editor's TypeScript IntelliSense** (every prop carries bilingual JSDoc `@en` / `@es`). If you need to read the source from a consumer project, the types ship at:

```
node_modules/@placetopay/spartan-vue/dist/components/SXxx/types.d.ts
node_modules/@placetopay/spartan-vue/dist/components/SXxx/SXxx.vue.d.ts  # slot scope, emits
node_modules/@placetopay/spartan-vue/dist/components/SXxx/index.d.ts     # named exports
```

The live docs site (with interactive playgrounds for every prop and slot) is the friendlier alternative — search by component name there.

The lists below are only to find the right component to import. Block variants (suffix `Block`) add `label`, `helpText`, and `errorText` chrome around the base component using `BlockWrapper`.

---

## Data Input (`dataInput`)

| Component | Block variant |
|-----------|---------------|
| `SInput` | `SInputBlock` |
| `SInputAmount` | `SInputAmountBlock` |
| `SInputDate` | `SInputDateBlock` |
| `SInputIncrement` | `SInputIncrementBlock` |
| `SInputMask` | `SInputMaskBlock` |
| `SInputOtp` | `SInputOtpBlock` |
| `SInputPassword` | `SInputPasswordBlock` |
| `SInputTag` | — |
| `SSelect` | `SSelectBlock` |
| `STextArea` | `STextAreaBlock` |

## Selectors (`selectors`)

| Component | Block variant |
|-----------|---------------|
| `SCheckbox` | — |
| `SRadio` | — |
| `SRadioGroup` | — |
| `SSwitch` | — |
| `SSelector` | `SSelectorBlock` |
| `SMultiSelector` | — |

## Display (`display`)

`SAlert`, `SAvatar`, `SBadge`, `SBreadcrumbs`, `SCaption`, `SCard`, `SCardBrand`, `SDefinitionTerm`, `SLink`, `SSkeleton`, `SToast` (+ `SToaster`, `toast` re-exported from the same module)

## Modals & Overlays (`modals`)

`SDropdown`, `SModal`, `SModalCard`, `SModalConfirm`, `SModalLeft`, `SModalSide`, `SPopover`, `STooltip`

## Structure & Layout (`structure`)

`SAccordion`, `SButtonGroup`, `SDTable`, `SPaginator`, `SSidebar`, `SStackedList` (+ `SStackedListItem`), `SSteps` (+ `SStepsItem`), `STab` (+ `STabItem`), `STable`, `STemplateHeaderTable`

## Utilities (`utilities`)

`SButton`, `SColorSwitch`, `SCopy`, `SFilter`, `SLabel`, `SPlacetopayLogo`

## Typography (`typography`)

`SPageTitle`, `SSectionDescription`, `SSectionTitle`

---

## Composite components with leaf imports

Some components ship a parent + leaf pattern. Both are re-exported from the package; import them as you would any other component:

```ts
import { SStackedList, SStackedListItem } from '@placetopay/spartan-vue';
import { STab, STabItem }                from '@placetopay/spartan-vue';
import { SSteps, SStepsItem }            from '@placetopay/spartan-vue';
import { SRadioGroup, SRadio }           from '@placetopay/spartan-vue';
import { SToast, SToaster, toast }       from '@placetopay/spartan-vue';  // SToaster mounts the host; `toast()` triggers
```

The leaf is usually where `pt:` passthrough lives (e.g. `pt:` props on `SStackedListItem`, not `SStackedList`).
