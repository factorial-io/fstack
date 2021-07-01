# @factorial/stack-e2e

This is the end-to-end testing package for `@factorial/stack-core`. It uses [cypress](https://www.npmjs.com/package/cypress).

- [Installation](#installation)
- [Default configuration](#defaultconfiguration)
- [Extending or overwriting configuration](#extending-or-overwriting-configuration)
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

## Default configuration

The configuration provided by this package is kept very minimal:

```json
{
  "configFile": false,
  "exit": true,
  "headless": true,
  "quiet": true
}
```

For the remaining options, set by _cypress_ itself, please refer to its documentation: https://docs.cypress.io/guides/references/configuration

## Extending or overwriting configuration

You can create a `cypress.json` (this is the standard by _cypress_) in your root folder, which will then be merged with our [default configuration](#default-configuration).

## Files created by _cypress_

Please note that by default _cypress_ e.g. creates screenshots and videos. These should most likely not be committed to your git repository, so you might want to add the paths, where they are stored (see https://docs.cypress.io/guides/references/configuration#Folders-Files), to your `.gitignore`.
