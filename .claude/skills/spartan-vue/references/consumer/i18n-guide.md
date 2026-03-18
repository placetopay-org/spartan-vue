# Internationalization (i18n)

Spartan Vue components that display user-facing text (labels, placeholders, messages) rely on **vue-i18n** in Composition API mode. All built-in strings live under the `$spartan` namespace, so they never collide with your application keys.

## Supported Languages

| Code | Language   |
|------|-----------|
| `es` | Spanish    |
| `en` | English    |
| `pt` | Portuguese |
| `it` | Italian    |
| `fr` | French     |

Locale JSON files are shipped in `@placetopay/spartan-vue/locales`.

## Basic Setup

1. Install vue-i18n:

```bash
npm install vue-i18n
```

2. Configure i18n in your entry file:

```ts
// main.ts
import '@placetopay/spartan-vue/style.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { es, en } from '@placetopay/spartan-vue/locales'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'es',
  legacy: false, // CRITICAL — must be false
  messages: { es, en },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
```

**CRITICAL:** `legacy: false` is required. Spartan components use the Composition API (`useI18n()`). If `legacy` is `true` (the default), all translated strings will be missing or broken.

## Combining with Your App's Translations

Spartan uses the `$spartan` namespace for all its keys, so conflicts with your own translation keys are unlikely. Merge with a simple spread:

```ts
import { es as spartanEs, en as spartanEn } from '@placetopay/spartan-vue/locales'

const messages = {
  es: {
    ...spartanEs,
    app: { title: 'Mi Aplicacion', welcome: 'Bienvenido' },
  },
  en: {
    ...spartanEn,
    app: { title: 'My Application', welcome: 'Welcome' },
  },
}

const i18n = createI18n({ locale: 'en', legacy: false, messages })
```

## Helper Functions

Spartan exports convenience helpers that deep-merge its locale messages with yours using lodash `merge`. Import them from the main package:

```ts
import {
  addSpartanEnMessages,
  addSpartanEsMessages,
  addSpartanPtMessages,
  addSpartanItMessages,
  addSpartanAllMessages,
} from '@placetopay/spartan-vue'
```

### Per-locale helpers

Each helper takes your base messages and an optional variant override, then returns a merged object (Spartan messages + your base + variant):

```ts
const enMessages = addSpartanEnMessages({ app: { title: 'My App' } })
const esMessages = addSpartanEsMessages({ app: { title: 'Mi App' } })
```

Signature: `addSpartan{En|Es|Pt|It}Messages(baseMessages, variantMessages?)`

### All-at-once helper

`addSpartanAllMessages` merges every locale in a single call. It returns an object with `en`, `es`, `pt`, and `it` keys:

```ts
const messages = addSpartanAllMessages(
  { en: { app: { title: 'My App' } }, es: { app: { title: 'Mi App' } } },
  { variants: { en: myEnOverrides, es: myEsOverrides } },
)
// messages.en, messages.es, messages.pt, messages.it are all merged
```

> **Note:** The `fr` (French) locale is available from `@placetopay/spartan-vue/locales` but does not have a dedicated helper function. Merge it manually with spread: `{ ...fr, ...yourFrMessages }`.

> **Note:** `addSpartanAllMessages` returns `en`, `es`, `pt`, and `it` only. If you need `fr`, add it separately.

## Components That Use i18n

Not all components require i18n. Only those that render internal user-facing text depend on translations. The table below maps each `$spartan.*` namespace to its components and example strings:

| Namespace                      | Components                      | Example Strings                                                    |
|--------------------------------|---------------------------------|--------------------------------------------------------------------|
| `$spartan.selector`            | SSelector, SMultiSelector, SCombobox | "Add", "Search", "Selection", "No results", "Loading..."          |
| `$spartan.copy`                | SCopy                           | "Copied!"                                                          |
| `$spartan.dataTable`           | SDTable                         | "Page", "of", "pages", "Showing", "results", "Search all columns" |
| `$spartan.inputDate`           | SInputDate                      | Day/month names, "Today", "Clear", "Choose Year/Month/Date"       |
| `$spartan.filter`              | SFilter                         | Operator labels ("Contains", "Is equal to", ...), "Add filter", "Apply", "Cancel", "Clear filters", "Save filter" |
| `$spartan.modalConfirm`        | SModalConfirm                   | "Are you sure?", "Confirm", "Cancel"                               |
| `$spartan.inputPasswordPanel`  | SInputPassword                  | "Minimum of {value} characters", "Have at least one lowercase letter", etc. |
| `$spartan.templateHeaderTable` | STemplateHeaderTable            | "Search"                                                           |

If your app only uses components not listed above (e.g., SButton, SInput, SAlert, SBadge), you can technically skip vue-i18n setup entirely. However, installing it is recommended so you are ready when you add components that do require it.

## Dynamic Language Switching

With `legacy: false`, the locale is reactive. Change it at runtime and all Spartan components update instantly:

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <button @click="locale = 'es'">Espanol</button>
  <button @click="locale = 'en'">English</button>
  <button @click="locale = 'fr'">Francais</button>
</template>
```

No page reload or component remounting is needed. The `locale` ref is global, so changing it anywhere propagates to every component that calls `useI18n()`.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Components show raw keys like `$spartan.selector.add` | vue-i18n not installed or `app.use(i18n)` missing | Install vue-i18n and register the plugin |
| Components show empty strings or warnings | `legacy: true` (default) | Set `legacy: false` in `createI18n()` |
| Some languages work but others show keys | Locale messages not included for that language | Import and add the missing locale from `@placetopay/spartan-vue/locales` |
| Your app's keys conflict with Spartan's | Unlikely (Spartan uses `$spartan` namespace) | Avoid nesting your keys under `$spartan` |
