# @factorial/stack-e2e

This is the end-to-end testing package for `@factorial/stack-core`. It uses [cypress](https://www.npmjs.com/package/cypress).

- [Installation](#installation)
- [Configuration](#configuration)
- [Files created by _cypress_](#files-created-by-cypress)

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-e2e
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-e2e")],
};
```

## Usage

This package exposes a `test` task to `core`, which means that every time you run `yarn factorial test` it would be executed together with tests provided by other packages.

If you want to run only the end-to-end tests, you can run:

```bash
yarn factorial test --only e2e
```

## Configuration

Cypress has different types of configuration:

- Module API configuration: https://docs.cypress.io/guides/guides/module-api#Options
- Configuration: https://docs.cypress.io/guides/references/configuration

The default Module API configuration provided by this package is kept very minimal:

```json
{
  "configFile": false,
  "exit": true,
  "headless": true,
  "quiet": true
}
```

If you want to overwrite this, you can do that in the `.factorialrc.js`:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-e2e"), {
    … // config object
  }],
};
```

If you want to overwrite the normal configuration, you have two options:

1. Set a `config` key in the object shown in the solution above
2. Create a `cypress.json` (including your options) and add `configFile: "./cypress.json"` to the object shown in the solution above

## Files created by _cypress_

Please note that by default _cypress_ e.g. creates screenshots and videos. These should most likely not be committed to your git repository, so you might want to add the paths, where they are stored (see https://docs.cypress.io/guides/references/configuration#Folders-Files), to your `.gitignore`.
