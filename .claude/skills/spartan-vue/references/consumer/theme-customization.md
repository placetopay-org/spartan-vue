# Theme Customization

Reference for guiding consumers on customizing the Spartan Vue visual theme.

## Default Palette

Spartan ships with the Evertec orange palette as the default primary color. The tokens are registered via `@theme` in `plugin.css`:

| Token                          | RGB Value           | Hex       |
|--------------------------------|---------------------|-----------|
| `--color-spartan-primary-50`   | `255 246 234`       | `#fff6ea` |
| `--color-spartan-primary-100`  | `255 227 188`       | `#ffe3bc` |
| `--color-spartan-primary-200`  | `255 204 141`       | `#ffcc8d` |
| `--color-spartan-primary-300`  | `255 179 98`        | `#ffb362` |
| `--color-spartan-primary-400`  | `255 148 64`        | `#ff9440` |
| `--color-spartan-primary-500`  | `255 126 41`        | `#ff7e29` |
| `--color-spartan-primary-600`  | `255 108 12`        | `#ff6c0c` |
| `--color-spartan-primary-700`  | `218 90 13`         | `#da5a0d` |
| `--color-spartan-primary-800`  | `192 61 17`         | `#c03d11` |
| `--color-spartan-primary-900`  | `161 56 21`         | `#a13815` |

All components reference these tokens (e.g. `bg-spartan-primary-600`, `text-spartan-primary-50`).

## Overriding the Primary Color

Add a `@theme` block **after** the Spartan `@import` in your main stylesheet. TailwindCSS v4 merges theme blocks, so later declarations override earlier ones.

```css
/* styles.css */
@import "@placetopay/spartan-vue/styles.css";

@source '../src/**/*.{vue,js,ts}';

@theme {
  --color-spartan-primary-50:  rgb(228 242 253);
  --color-spartan-primary-100: rgb(187 222 251);
  --color-spartan-primary-200: rgb(144 202 249);
  --color-spartan-primary-300: rgb(100 181 246);
  --color-spartan-primary-400: rgb(66 165 245);
  --color-spartan-primary-500: rgb(33 150 243);
  --color-spartan-primary-600: rgb(30 132 229);
  --color-spartan-primary-700: rgb(25 103 196);
  --color-spartan-primary-800: rgb(21 78 148);
  --color-spartan-primary-900: rgb(13 42 84);
}
```

**Important:** Values must use the CSS `rgb()` syntax without commas: `rgb(228 242 253)`, not `rgb(228, 242, 253)`.

You must provide all 10 shades (50 through 900). Components use different shades for hover, focus, disabled, and dark-mode states, so a partial override will produce inconsistent results.

## CSS Utilities Provided by Spartan

The plugin defines focus-ring utilities that components apply automatically on focus:

| Utility              | Effect                                                        |
|----------------------|---------------------------------------------------------------|
| `s-outline`          | 2px solid outline in `spartan-primary-600`, offset 2px, z-10  |
| `s-outline-secondary`| 2px solid outline in `gray-500`, offset 2px, z-10            |
| `s-outline-error`    | 2px solid outline in `red-500`, offset 2px, z-10             |

These are applied internally by form components (inputs, checkboxes, radios, selects) on `:focus` / `:focus-within`. Consumers generally do not need to apply them manually, but they are available as Tailwind utilities if needed (e.g. `focus:s-outline`).

## Dark Mode

Spartan configures a custom dark-mode variant in `plugin.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

This means:
1. Add `class="dark"` to the `<html>` element (or any ancestor container) to activate dark mode.
2. All Spartan components automatically adapt -- every component uses `dark:` Tailwind classes internally.
3. No additional configuration is needed from the consumer.

Toggle implementation is up to the consumer (OS preference detection, manual toggle button, etc.). Spartan only requires the `.dark` class to be present on an ancestor element.

## Excluding the Inter Font

Spartan includes the Inter font family by default via `styles.css` (which bundles `fonts.css` + `plugin.css`). The font declaration sets:

```css
:root { font-family: Inter, sans-serif; }
@supports (font-variation-settings: normal) {
  :root { font-family: InterVariable, sans-serif; }
}
```

To use your own typeface instead, import the individual style files separately:

```css
/* styles.css -- without Inter font */
@import "tailwindcss";
@import "@placetopay/spartan-vue/styles/plugin.css";
@import "@placetopay/spartan-vue/styles/spartan-vue.css";

@source '../src/**/*.{vue,js,ts}';
```

This gives you all Spartan tokens, utilities, and component styles without overriding your font stack.

## What the Spartan Plugin Provides Automatically

When you `@import "@placetopay/spartan-vue/styles.css"`, the following is set up for you:

| Feature                    | Detail                                                              |
|----------------------------|---------------------------------------------------------------------|
| **@tailwindcss/forms**     | Loaded via `@plugin '@tailwindcss/forms'` -- resets form elements   |
| **Color tokens**           | `--color-spartan-primary-{50..900}` registered in `@theme`         |
| **Dark mode variant**      | `@custom-variant dark` using `.dark` class strategy                 |
| **Focus ring utilities**   | `s-outline`, `s-outline-secondary`, `s-outline-error`              |
| **Source scanning**         | `@source '../**/*.js'` scans Spartan dist files for class names    |
| **Inter font** (optional)  | Font-family declarations for Inter / InterVariable                  |
| **Base styles**            | `html { antialiased }` for smooth font rendering                   |
