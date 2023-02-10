# @factorial/stack-svelte

This is the Svelte plugin for `@factorial/stack-core`.

It provides a linting task. The configuration files for that can be found in [eslint](eslint).

Please be aware that this package only lints `.svelte` files. This means that you need the `@factorial/stack-javascript` package to lint `.js` files.

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-svelte
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-svelte")],
};
```

And add a `.eslintrc.js`:

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint",
    "@factorial/stack-svelte/eslint,
  ],
};
```

Available configurations:

- `@factorial/stack-svelte/eslint`: Default configuration, includes `base`
- `@factorial/stack-svelte/eslint/base`: Basic linting rules, always necessary
- `@factorial/stack-svelte/eslint/typescript`: TypeScript for Svelte

### TypeScript

Make sure the `@factorial/stack-typescript` package is installed:

```bash
yarn add @factorial/stack-typescript
```

Then configure ESLint with TypeScript-specific presets:

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint/base",
    "@factorial/stack-javascript/eslint/jest",
    "@factorial/stack-typescript/eslint",
    "@factorial/stack-svelte/eslint/base,
    "@factorial/stack-svelte/eslint/typescript,
  ],
};
```

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

If you want to only lint `.svelte` files, you can run:

```bash
yarn factorial lint --only svelte
```
