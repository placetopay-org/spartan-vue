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

3. Add spartan-vue styles
   
   ```css
   @import 'tailwindcss/base';
   @import '@placetopay/spartan-vue/style.css';

   @import 'tailwindcss/components';
   @import 'tailwindcss/utilities';
   ```
   