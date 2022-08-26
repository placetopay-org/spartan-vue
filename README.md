
# installing

Configure Github npm packages

```
npm config set "@placetopay-org:registry" https://npm.pkg.github.com/
```

Generate your Github personal access token

```
npm config set "//npm.pkg.github.com/:_authToken" YourGithubPersonalAccessToken
```

Install Dependencies

```
npm install -D @placetopay-org/spartan-vue @tailwindcss/forms
```

Configure your `tailwind.config.js` add the `presets` key

```javascript
module.exports = {
    presets: [
        require('@placetopay-org/spartan-vue/src/tailwindcss.js')
    ],
}
```

# Generate your githubPersonal access token

Verify you can read the repository https://github.com/placetopay-org/spartan-vue

Generate your token at: https://github.com/settings/tokens/new with "read:packages" permissions


# Developing

Verify you can read the repository https://github.com/placetopay-org/spartan-vue

Generate your github personal access token with "write:packages" permissions

```
npm config set "@placetopay-org:registry" https://npm.pkg.github.com/
```

```
npm config set "//npm.pkg.github.com/:_authToken" YourGithubPersonalAccessToken

```





