# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 2.0.0-beta.48 - 2024-01-12

## 2.0.0-beta.47 - 2024-01-11

## 2.0.0-beta.46 - 2024-01-11
### Added
- Minor unit mode now available on `SInputAmount` component.
- `SFilter` component now supports translation for operators.
- `SDataTable` component now supports `sortDescFirst` prop to set the default sort direction.

### Changed
- Apply function in `SFilter` component now omit interfaces information.

## 2.0.0-beta.45 - 2023-12-05

## 2.0.0-beta.44 - 2023-12-01

## 2.0.0-beta.43 - 2023-12-01
### Added
- Debounce query on `SCombobox` component.

## 2.0.0-beta.42 - 2023-11-29
### Added
- `SInputAmount` now emit `info` event with related information
- `SDataTable` component now supports manual sorting.

## 2.0.0-beta.41 - 2023-11-20
### Added
- `SDataTable` server side by default.
- `SDataTable` now can recieve a string array to set the columns order.

## 2.0.0-beta.40 - 2023-11-15

## 2.0.0-beta.39 - 2023-11-15

## 2.0.0-beta.38 - 2023-11-14
### Added
- `SDataTable` component now supports `pagination` prop to set the pagination.
- `SDataTable` component now supports `pageSizes` prop to set the page sizes.

### Changed
- `SSidebar` styles updated.

## 2.0.0-beta.37 - 2023-11-14
### Added
- `SCombobox` component now supports `flipOptions` prop to flip the options list.

## 2.0.0-beta.36 - 2023-11-10
### Changed
- `SComboboxOptions` styles

## 2.0.0-beta.35 - 2023-11-08
### Added
- Loader component to internal components
- Update `SDataTable` stories template

## 2.0.0-beta.34 - 2023-11-07

## 2.0.0-beta.33 - 2023-11-07

## 2.0.0-beta.32 - 2023-11-07
### Added
- STable context and auto generation modes
- `STableHead`, `STableBody`, `STableRow`, `STableCell`,  and `STableHeadCell` components implementation.
- `STable` component implementation.

### Fixed
- First element selection on `SCombobox` component.
- Default symbol on amount input
- Autofill style on SInput

## 2.0.0-beta.31 - 2023-11-01
### Changed
- Improve cube bezier animation on `SAccordion` component.

## 2.0.0-beta.30 - 2023-11-01
### Changed
- Improve animation with `SAccordion` component.

### Fixed
- `SModalLeft` with breackpoint undefined by default.

## 2.0.0-beta.29 - 2023-11-01

## 2.0.0-beta.28 - 2023-10-30
### Added
- `SSidebarItem` is now polymorphic using `as` prop.

## 2.0.0-beta.27 - 2023-10-30
### Added
- `STabs` components implementation with `underline`, `pills` and `vetches` variants.

## 2.0.0-beta.26 - 2023-10-27

## 2.0.0-beta.25 - 2023-10-27

## 2.0.0-beta.24 - 2023-10-26

## 2.0.0-beta.23 - 2023-10-26

## 2.0.0-beta.22 - 2023-10-25

## 2.0.0-beta.21 - 2023-10-25
### Added
- `SInputAmountBlock` component implementation.
- `SInputAmount` component implementation.

## 2.0.0-beta.20 - 2023-10-23
### Fixed
- Assets building process on `SPlacetopayLogo` component.

## 2.0.0-beta.19 - 2023-10-23
### Added
- `SAccordion` component implementation.
- `SSidebar` component implementation.
- `SPlacetopayLogo` component implementation.
- `SSectionTitle` and `SSectionDescription` component implementation.
- `SComboboxBlock` component.
- Auto search feature on `SCombobox` component.

## 2.0.0-beta.18 - 2023-10-13
### Added
- Style variations with `Class Variance Authority`.
- Actions slot on `SCard` and `SModalCard`.

## 2.0.0-beta.17 - 2023-10-12
### Added
- `SModalCard` component implementation.

## 2.0.0-beta.16 - 2023-10-11
### Added
- `SModal`, `SModalTitle` and `SModalDescription` components implementation.
- `SBreadcrumbs` and `SBreadcrumbsItem` components implementation.
- `SToast` component implementation.

## 2.0.0-beta.15 - 2023-10-10

## 2.0.0-beta.14 - 2023-10-10

## 2.0.0-beta.13 - 2023-10-10

## 2.0.0-beta.12 - 2023-10-09
### Added
- `SDefinitionTerm` component implementation.
- `SSwitch` now supports icons.

### Removed
- `SSelectGroup` component.
- `DescriptionItem` component.
- `DescriptionItemLabel` component.
- `DescriptionItemValue` component.

## 2.0.0-beta.11 - 2023-10-08

## 2.0.0-beta.10 - 2023-10-08

## 2.0.0-beta.9 - 2023-10-08

## 2.0.0-beta.8 - 2023-10-08

## 2.0.0-beta.7 - 2023-10-06
### Added
- `SCard` component implementation.

## 2.0.0-beta.6 - 2023-10-04
### Fixed
- Personal information example

## 2.0.0-beta.5 - 2023-10-03

## 2.0.0-beta.4 - 2023-10-03

## 2.0.0-beta.3 - 2023-10-03
### Added
- `SSelectBlock` component implementation.

## 2.0.0-beta.2 - 2023-10-02
### Added
- SCaption component implementation.

## 2.0.0-beta.1 - 2023-10-02

## 2.0.0-beta.0 - 2023-09-26
### Changed
- SInput component, left and right slots are now available.
- SCombobox component, search feature and custom transform function are now available.

## 1.1.5-beta.0 - 2023-09-18
### Added
- Slot for button content in SCombobox component.

### Removed
- Placeholder prop from SCombobox component.

## 1.1.4 - 2023-09-18
### Added
- Class prop receives on `SComboboxOption` component.

### Fixed
- `SCombobox` component, `v-model` prop is now working properly.

## 1.1.3 - 2023-09-18
### Added
- `SCombobox` component implementation.

## 1.1.2 - 2023-09-14
### Added
- `SCheckbox` and `SRadio` component implementation, with support for internal `label`, `description`, `inline` and `reverse` feature.
- `SLabel` component implementation.
- InputBlock component, groups the SInput, label, help text and error text.
- Input forms example section.
- Options inside input support for `SInput` component.
- SInput icon support for `right` and `left` positions with `icon` and `end-icon` props respectively.

## 1.1.1 - 2023-09-07
### Changed
- Moves custom styles from style.css to tailwind.config.js preset.

## 1.1.0 - 2023-09-07
### Added
- SInput rounded props available `left`, `right`, `none`, and `both` as default.

## 1.0.0 - 2023-09-06
### Added
- Translations for `SFilter` component (es, en, it, pt).
- I18n support globally and for each component.
- New example view: `Checkout Demo`.
- Initial implementation of `SSwitch` component.
- Initial implementation of `SRadioGroup` component.
- `SRadioGroupItem` component to be used inside `SRadioGroup`.
- Initial implementation of `SFilter` component.
- Initial implementation of `SPopover` component.
- Initial implementation of `SDropdown` component.
- `SDropdownItem` component to be used inside `SDropdown`.
- SAvatar component has been restructured, introduced various features:
  - Avatar can have different sizes including `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`.
  - Avatar can have a indicator in different positions including `top-left`, `top-right`, `bottom-left`, and `bottom-right`.
  - Avatar can have image providing a `src` prop.
  - Avatar can come borderless using `borderless` prop.
  - Avatar can display the name initials calculating from `name` prop.
  - Avatar linked with Figma design via Storybook's.
- New stories for SAvatar component.
- Storybook addon for pseudo states (`storybook-addon-pseudo-states`).
- Introduced `buildDesign` helper function to simplify Figma design references.
- Created a new Storybook documentation template `DocumentationTemplate.mdx`.
- Added @storybook/addon-a11y.
- Imported additional styles from palette-evertec.css in storybook preview.
- The SButton component now supports new styles and appearances.
- Added additional utility styles for better UI consistency on SButton.

### Changed
- SBadge component has been restructured, introduced various features:
  - Badge can have different colors including `blue`, `gray`, `green`, `indigo`, `primary`, `red`, and `yellow`.
  - Badge can come in different sizes: `sm`, `md`, and `lg`.
  - Additional styles for badges including `pill`, `dot`, and `outline` features.
  - Introduced Storybook stories to showcase badge variations such as `Default`, `Size`, `Color`, `Outline`, `Pill`, `Dot`, `Removable`, and `Customize`.
  - Badge linked with Figma design via Storybook's.
- Some prop names in the SButton component were changed:
  - `small` to `sm` and `medium` to `md` for the size.
  - `circle` to `full` for the rounded prop.
- Introduced a new version of SButton component with TypeScript integration and improved styles.
- Improve features like disabled, loading, rounded buttons at SButton component.
- Minor updates in package-lock.json to include latest resolved versions and dependencies.
- Refactored references of the old SButton.vue component in various files.

### Removed
- Unhelpful story descriptions
- Active scale effect on `SButton` component.

### Fixed
- Export alternative classic inputs
- Import root color styles in index file.

## 1.0.0-beta.3 - 2023-09-06

## 1.0.0-beta.2 - 2023-09-06

## 1.0.0-beta.1 - 2023-08-02

## 1.0.0-beta.0 - 2023-07-28

## 0.5.0 - 2023-07-21

## 0.5.0-beta.1 - 2023-07-21
### Added
- Added `types` field to the exports section in `package.json`.

### Fixed
- Corrected the path for the `types` property in `package.json`.

## 0.5.0-beta.0 - 2023-07-21
### Changed
- Modified the `build:types` script in `package.json` to change the output directory for type declarations.
- Adjusted the `SInputMask.vue` component to include a `@ts-ignore` comment above the mask definition.

### Removed
- Deleted the file `src/env.d.ts` which contained a reference to `vite/client`.
- Deleted the file `src/vue-imask.d.ts` which declared the module 'vue-imask'.

### Fixed
- Updated `tsconfig.json`:
  - Removed the `declaration`, `composite`, and `sourceMap` options under `compilerOptions`.
  - Modified the `include` and `exclude` arrays, removing references to certain files and directories.

## 0.4.1 - 2023-07-19
### Added
- Adds storybook plugin for inspecting elements with figma.

### Changed
- Multiple dependencies in the package.json were updated, including:
  - Upgrade of @storybook/addon-actions, @storybook/addon-docs, @storybook/addon-essentials, @storybook/addon-links, @storybook/addon-mdx-gfm, @storybook/vue3, and @storybook/vue3-vite to version ^7.1.0.
  - Upgrade of @types/node to version ^20.4.2.
  - Upgrade of @vue/tsconfig to version ^0.4.0.
  - Upgrade of prettier to version ^3.0.0 and prettier-plugin-tailwindcss to version ^0.4.1.
  - Upgrade of typescript to version ^5.1.6.
  - Upgrade of vue-imask to version ^7.1.3.
  - And other minor updates.
- Component Changes:
  - STabsLine.vue: A correction was made in the property definition.
  - SToggle.vue: The use of v-model for the Switch component was corrected.
  - SFilter.ts: A correction was made in the property definition.
  - SModalAction.stories.js: An unused import was removed.

## 0.4.0 - 2023-07-11
### Added
- More installation instructions to the README file

### Changed
- Version of `@heroicons/vue` to `2.0.18`
- Fixed radio groups functionality and code
- Removed data from public access in the README file

## 0.3.1 - 2023-06-01
### Added
- Table component to list data, filter and paginate data from a simple request
- Vertical Steps component to use in a wizard or a step-by-step form
- Tabs Component with a bottom line design and possibility to add icons and a number of tab notifications

## 0.2.2-beta.3 - 2023-05-24
### Added
- Chromatic continuous integration workflow to deploy storybook docs to chromatic.com

## 0.2.2-beta.1 - 2023-05-23
### Changed
- Update storybook to 7.0.15

## 0.2.1 - 2023-04-21

## 0.2.1-beta.19 - 2023-04-21
### Changed
- Scope to filter component translations

## 0.2.1-beta.18 - 2023-04-21
### Changed
- Cleaning changelog

## 0.2.1-beta.15 - 2023-02-03
### Added
- SInputMask component

## 0.2.1-beta.10 - 2023-01-26
### Added
- Add support to simple paginate in STablePagination component

### Changed
- STables components with scoped folder

## 0.2.1-beta.9 - 2023-01-26
### Added
- Add SSelectGroup component

## 0.2.1-beta.8 - 2023-01-24
### Changed
- Add Ts support to Empty state component

### Fixed
- Fix bad imports to SEmptyState component

## 0.2.1-beta.7 - 2023-01-20
### Changed
- Update CHANGELOG.md to new features and refactors

## 0.2.1-beta.6 - 2023-01-20
### Added
- Show current page in table pagination

## 0.2.1-beta.5 - 2023-01-20
### Changed
- SCard component with scoped folder

### Fixed
- Dont show SCardHeader component

## 0.2.1-beta.4 - 2023-01-20
### Changed
- Table text size

## 0.2.1-beta.3 - 2023-01-20
### Changed
- Update select component to use placeholder

### Fixed
- Select component: fix model value is not defined

## 0.2.1-beta.2 - 2023-01-19
### Changed
- Select component ring color
- Add Ts support to Select component

## 0.2.1-beta.1 - 2023-01-08
### Changed
- Prepare the "publish beta" workflow to publish stable versions

## 0.2.1-beta.0 - 2023-01-08
### Added
- Changelog
- Custom color palette support
