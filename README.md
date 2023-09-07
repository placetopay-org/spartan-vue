# Spartan VueJs

SpartanVue is a vue component library that contains the components used in the PlacetoPay web applications based in [TailwindCSS](https://tailwindcss.com/).

## Desing system

You can find the documentation and components of this design system by clicking [here.](https://646e732a14dfaa707ad59b33-gmuixqrsag.chromatic.com/?path=/docs/introduction-overview--docs)

## Installing

1. Requirements

   - [NodeJs](https://nodejs.org/es/) ^16 or [NVM](https://github.com/nvm-sh/nvm) (for use multiple versions of nodejs)
   - [NPM](https://www.npmjs.com/) ^7
   - Github personal access token with "read:packages" permissions

2. Install in the consumer project

   ```shell
   npm install -D @placetopay/spartan-vue @tailwindcss/forms
   ```

3. Configure your `tailwind.config.js` add the `presets` key and content element for the package

   ```javascript
   module.exports = {
      content: [
         //...
         "node_modules/@placetopay/spartan-vue/dist/*.js",
      ]
      presets: [require("@placetopay/spartan-vue/tailwindcss.js")],
   };
   ```
   
## Developing

1. Requirements

   - [NodeJs](https://nodejs.org/es/) 16
   - [NPM](https://www.npmjs.com/) 7
   - Set ssh key in your github account

2. Clone the repository

   ```shell
   git clone git@github.com:placetopay-org/spartan-vue.git
   ```

3. Install dependencies

   ```shell
   npm install
   ```

    ```shell
    cp .env.example .env
    ```

5. Run the project

   ```shell
   npm run dev:storybook
   ```

6. Open the project in your browser

   ```shell
   http://localhost:6006
   ```

7. Happy coding!
