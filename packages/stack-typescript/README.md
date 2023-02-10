# @factorial/stack-typescript

This is the TypeScript plugin for `@factorial/stack-core`.

It provides a linting task. The configuration files for that can be found in [eslint](eslint).

Please be aware that this package only lints `.ts` files. This means that you need the `@factorial/stack-javascript` package to lint `.js` files.

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-typescript
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-typescript")],
};
```

And add a `.eslintrc.js`:

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint/base",
    "@factorial/stack-javascript/eslint/jest",
    "@factorial/stack-typescript/eslint,
  ],
};
```

Available configurations:

- `@factorial/stack-vue/eslint`: Default configuration

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

If you want to only lint `.ts` files, you can run:

```bash
yarn factorial lint --only ts
```
