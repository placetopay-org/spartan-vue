# Spartan VueJs

SpartanVue is a vue component library that contains the components used in the PlacetoPay web applications based in [TailwindCSS](https://tailwindcss.com/).

## installing

1. Requirements

   - [NodeJs](https://nodejs.org/es/) ^16 or [NVM](https://github.com/nvm-sh/nvm) (for use multiple versions of nodejs)
   - [NPM](https://www.npmjs.com/) ^7
   - Github personal access token with "read:packages" permissions

2. Configure Github npm packages

    ```shell
    npm config set "@placetopay-org:registry" https://npm.pkg.github.com/
    ```

3. [Generate your Github personal access token](#generate-your-githubpersonal-access-token)

4. Set your Github personal access token
    ```shell
    npm config set "//npm.pkg.github.com/:_authToken" {YourGithubPersonalAccessToken}
    ```

5. Install in the consumer project

    ```shell
    npm install -D @placetopay-org/spartan-vue @tailwindcss/forms
    ```

6. Configure your `tailwind.config.js` add the `presets` key

    ```javascript
    module.exports = {
        presets: [
            require('@placetopay-org/spartan-vue/src/tailwindcss.js')
        ],
    }
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
