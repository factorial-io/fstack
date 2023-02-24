# @factorial/stack-vue

This is the Vue plugin for `@factorial/stack-core`.

It provides a linting task. The configuration files for that can be found in [eslint](eslint).

Please be aware that this package not only lints `.vue`, but also `.js`, `.mjs` and `.cjs` files. This means that you do not need the `@factorial/stack-javascript` package.

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-vue
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-vue")],
};
```

And add a `.eslintrc.js`:

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint",
    "@factorial/stack-vue/eslint/v3,
  ],
};
```

Available configurations:

- `@factorial/stack-vue/eslint/v2`: Vue 2
- `@factorial/stack-vue/eslint/v3`: Vue 3

## Extending or overwriting linting rules

If you need to extend or overwrite the linting rules, you can do that like this:

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: […],
  rules: {
    ...
  },
};
```

## Usage

You can run:

```bash
yarn factorial lint
```

This will also run other linting tasks provided by other packages (in case you installed some).

If you want to only lint `.vue` files, you can run:

```bash
yarn factorial lint --only vue
```
