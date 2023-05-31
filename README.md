# Spartan VueJs

SpartanVue is a vue component library that contains the components used in the PlacetoPay web applications based in [TailwindCSS](https://tailwindcss.com/).

## Desing system

You can find the documentation and components of this design system by clicking [here.](https://646e732a14dfaa707ad59b33-gmuixqrsag.chromatic.com/?path=/docs/introduction-overview--docs)

If you have any doubts or difficulties accessing Storybook to view the design system, you can send an email requesting access to the engineer.

Engineer's email: meiyer.jaimes@evertecinc.com 

## installing

1. Requirements

   - [NodeJs](https://nodejs.org/es/) ^16 or [NVM](https://github.com/nvm-sh/nvm) (for use multiple versions of nodejs)
   - [NPM](https://www.npmjs.com/) ^7
   - Github personal access token with "read:packages" permissions

2. Install in the consumer project

   ```shell
   npm install -D @placetopay/spartan-vue @tailwindcss/forms
   ```

3. Configure your `tailwind.config.js` add the `presets` key

   ```javascript
   module.exports = {
     presets: [require("@placetopay/spartan-vue/src/tailwindcss.js")],
   };
   ```

### Generate your githubPersonal access token

1. Verify you can read [this repository](https://github.com/placetopay-org/spartan-vue) with your Github account. If you can't read the repository, you must be added as a collaborator.

2. [Generate your token](https://github.com/settings/tokens/new) with "read:packages" permissions.

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

4. Run the project

   ```shell
   npm run dev:storybook
   ```

5. Open the project in your browser

   ```shell
   http://localhost:6006
   ```

6. Happy coding!
