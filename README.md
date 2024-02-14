# Spartan Vue
Spartan Vue is a vue component library that contains the components used in the PlacetoPay web applications based in [TailwindCSS](https://tailwindcss.com/).

## Desing system
You can find the documentation and components of this design system by clicking [here.](https://develop--646e732a14dfaa707ad59b33.chromatic.com/)

## Installing
1. Requirements

   - [NodeJs](https://nodejs.org/es/) ^16 
   - [NPM](https://www.npmjs.com/) ^7
   - [TailwindCSS](https://tailwindcss.com/) ^3

2. Install in the consumer project

   ```shell
   npm install -D @placetopay/spartan-vue @tailwindcss/forms
   ```

3. Configure your `tailwind.config.js` file adding the following lines:

   ```javascript
      content: [
         //...
         "node_modules/@placetopay/spartan-vue/dist/*.js",
      ],
      plugins: [
         //...
         require('@placetopay/spartan-vue/plugin'),
      ],
   ```

## Plugin configuration
If you desire to establish a custom primary color, you may incorporate the `primary` option within the spartan-vue plugin's configuration:

   ```javascript
      require('@placetopay/spartan-vue/plugin')({
         primary: {
            50: '228 242 253',
            100: '187 222 251',
            200: '144 202 249',
            300: '100 181 246',
            400: '66 165 245',
            500: '33 150 243',
            600: '30 132 229',
            700: '25 103 196',
            800: '21 78 148',
            900: '13 42 84',
         }
      }),
   ```

## Using Components with Translation
Some components come with integrated texts. For these components, Spartan-vue provides translations in four languages:
- Spanish
- English
- Italian
- Portuguese

It is essential to have [vue-i18n](https://vue-i18n.intlify.dev/) installed and correctly add the translation JSON files. These translations are entirely customizable, and the functionality can be expanded to include more languages.

### Installation of vue-i18n
Before utilizing components with integrated texts and translations, ensure that the vue-i18n library is installed in your project. You can install it using the following command:

```shell
npm install vue-i18n
```

Once the installation is successfully completed, proceed with the configuration in the main.ts file.

### Setting up vue-i18n for Spartan-vue Components
In your main file, import vue-i18n and the necessary locales provided by Spartan-vue:

```javascript
import '@placetopay/spartan-vue/style.css';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import { es, en } from '@placetopay/spartan-vue/locales';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        es,
        en 
    }
});

const app = createApp(App);

app.use(i18n);
app.mount('#app');
```

This configuration sets up vue-i18n with English (`en`) as the default language and Spanish (`es`) as an additional language. You can add more languages as needed.

That's it! You've now successfully set up vue-i18n for Spartan-vue components in your project.

Feel free to adjust the instructions to match your project's structure and requirements. If you have any questions or need further assistance, please don't hesitate to ask!