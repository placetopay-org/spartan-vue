# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed
- SBadge component has been restructured, introduced various features:
  - Badge can have different colors including `blue`, `gray`, `green`, `indigo`, `primary`, `red`, and `yellow`.
  - Badge can come in different sizes: `sm`, `md`, and `lg`.
  - Additional styles for badges including `pill`, `dot`, `outline`, and `show` features.
  - Introduced Storybook stories to showcase badge variations such as `Default`, `Size`, `Color`, `Outline`, `Pill`, `Dot`, `Removable`, and `Customize`.
  - Badge linked with Figma design via Storybook's.

- Some prop names in the SButton component were changed:
  - `small` to `sm` and `medium` to `md` for the size.
  - `circle` to `full` for the rounded prop.
  
### Fixed
- Import root color styles in index file.

## 1.0.0-beta.0 - 2023-07-28
### Added
- Created a new Storybook documentation template `DocumentationTemplate.mdx`.
- Added @storybook/addon-a11y.
- Imported additional styles from palette-evertec.css in storybook preview.
- The SButton component now supports new styles and appearances.
- Added additional utility styles for better UI consistency on SButton.

### Changed
- Introduced a new version of SButton component with TypeScript integration and improved styles.
- Improve features like disabled, loading, rounded buttons at SButton component.
- Minor updates in package-lock.json to include latest resolved versions and dependencies.
- Refactored references of the old SButton.vue component in various files.

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
