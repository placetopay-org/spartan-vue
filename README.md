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
   npm install -D @placetopay/spartan-vue
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

> **Note:** If you want set a custom primary color, you can add `primary` option in the spartan-vue plugin configuration:

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

   