# Migration Guide: Spartan Vue 2.x to 3.x

This guide will help you migrate from Spartan Vue 2.x (Tailwind CSS 3) to Spartan Vue 3.x (Tailwind CSS 4).

## Prerequisites

- Node.js 20.19 or higher
- NPM 10 or higher
- Existing project using Spartan Vue 2.x

## Overview

Spartan Vue 3.x introduces full support for Tailwind CSS 4, which includes significant changes to configuration and styling. This migration involves:

1. Removing the old Tailwind CSS 3 plugin system
2. Upgrading to Tailwind CSS 4
3. Updating Spartan Vue to version 3.x
4. Adapting your configuration files

## Step 1: Remove Spartan Vue Plugin

In your `tailwind.config.js`, remove the Spartan Vue plugin:

```diff
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
-   'node_modules/@placetopay/spartan-vue/dist/**/*.js',
  ],
  plugins: [
-   require('@placetopay/spartan-vue/plugin'),
  ],
}
```

## Step 2: Upgrade to Tailwind CSS 4

Run the official Tailwind CSS upgrade tool:

```bash
npx @tailwindcss/upgrade
```

This tool will automatically:
- Migrate your `tailwind.config.js` to CSS-based configuration
- Update utility classes that have changed
- Identify incompatibilities

**Important:** Read the [official Tailwind CSS v4 migration guide](https://tailwindcss.com/docs/upgrade-guide) for detailed information about breaking changes and new features.

## Step 3: Remove PostCSS Configuration (if applicable)

If you were using PostCSS with Tailwind CSS 3, remove the PostCSS configuration:

```bash
# Delete the file
rm postcss.config.js
```

Remove PostCSS from your `package.json`:

```diff
{
  "devDependencies": {
-   "@tailwindcss/postcss": "^4.1.18",
-   "postcss": "^8.4.33",
  }
}
```

## Step 4: Install Tailwind CSS Vite Plugin (if using Vite)

If your project uses Vite, install the Tailwind CSS Vite plugin:

```bash
npm install -D @tailwindcss/vite
```

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
});
```

## Step 5: Update Spartan Vue

Install Spartan Vue 3.x:

```bash
npm install @placetopay/spartan-vue@latest
```

## Step 6: Update CSS Imports

### Remove JavaScript imports

In your main entry file (e.g., `main.js` or `main.ts`), **remove** the Spartan Vue CSS import:

```diff
- import '@placetopay/spartan-vue/style.css';
import { createApp } from 'vue';
import App from './App.vue';
```

### Add CSS imports to your stylesheet

In your main CSS file (e.g., `styles.css` or `main.css`), add the Spartan Vue import:

```css
@import "@placetopay/spartan-vue/styles.css";

/* Add your content sources */
@source '../src/**/*.{vue,js,ts,jsx,tsx}';
```

Then import this CSS file in your main entry file:

```javascript
import './styles.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

## Step 7: Update Color Imports (if applicable)

Tailwind CSS 4 changed the color export API. If you're importing Tailwind colors in your JavaScript/TypeScript files:

```diff
- // Tailwind 3 (no longer works)
- import { red, blue } from 'tailwindcss/colors';

+ // Tailwind 4 (correct way)
+ import colors from 'tailwindcss/colors';
+
+ const redColor = colors.red;
+ const blueColor = colors.blue;
```

## Step 8: Verify and Test

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Start your development server:**
   ```bash
   npm run dev
   ```

3. **Test your application** to ensure all styles are working correctly.

## Breaking Changes

### Tailwind CSS 4 Breaking Changes

- **Configuration:** Now uses CSS-based configuration (`@theme`, `@plugin`, etc.) instead of JavaScript
- **Dark mode:** Configured via `@custom-variant` in CSS
- **Content sources:** Use `@source` directive in CSS instead of `content` array in config
- **Ring utilities:** `ring-3` is no longer valid, use `ring` with custom width if needed

### Spartan Vue 3.x Changes

- **No more JavaScript plugin:** All configuration is now in CSS
- **Simplified imports:** Single `styles.css` import includes everything
- **Updated peer dependencies:** Requires Tailwind CSS 4.x

## Custom Primary Color

If you customized the primary color in Spartan Vue 2.x, you'll need to update your approach:

### Tailwind 3 (Old Way)

```javascript
// tailwind.config.js
plugins: [
  require('@placetopay/spartan-vue/plugin')({
    primary: {
      50: '228 242 253',
      // ...
    }
  })
]
```

### Tailwind 4 (New Way)

```css
/* styles.css */
@import "@placetopay/spartan-vue/styles.css";

@source '../src/**/*.{vue,js,ts,jsx,tsx}';

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

## Troubleshooting

### Issue: Styles not loading

**Solution:** Ensure you're importing the CSS file in your main entry file and that the path is correct.

### Issue: Custom utilities not working

**Solution:** Verify that your `@source` directives include all relevant file paths.

### Issue: Build errors related to Tailwind

**Solution:** Make sure you've removed all Tailwind CSS 3 dependencies and configurations.

### Issue: Dark mode not working

**Solution:** Tailwind 4 uses `@custom-variant` for dark mode. Check that your HTML has the `dark` class applied when needed.

## Need Help?

- [Spartan Vue Documentation](https://develop--646e732a14dfaa707ad59b33.chromatic.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Report Issues](https://github.com/placetopay-org/spartan-vue/issues)

## Summary

The migration to Spartan Vue 3.x with Tailwind CSS 4 brings a more modern, CSS-native configuration approach. While it requires some changes to your setup, the result is a simpler, more maintainable styling system.

Key benefits:
- No more JavaScript configuration files
- Faster builds with native CSS processing
- Better IDE support and autocomplete
- Simplified imports and dependencies
