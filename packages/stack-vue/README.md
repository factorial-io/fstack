# @factorial/stack-vue

This is the Vue plugin for `@factorial/stack-core`.

It provides a linting task. The configuration for that can be found in [.eslintrc.js](.eslintrc.js), which also uses the `.eslintrc.js` from `@factorial/stack-javascript`.

Please be aware that this package only lints `.vue` files. If you also want to lint `.js` files, please add the `@factorial/stack-javascript` package to your project as well.

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

const eslintConfig = require("@factorial/stack-vue").eslint;

module.exports = eslintConfig;
```

## Extending or overwriting linting rules

If you need to extend or overwrite the linting rules, you can do that like this:

```js
const eslintConfig = require("@factorial/stack-vue").eslint;
const deepMerge = require("deepmerge");

module.exports = deepMerge(eslintConfig, {
  rules: {
    ...
  },
});
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
