# @factorial/stack-javascript

This is the JavaScript plugin for `@factorial/core`.

It adds

- a build task using
  - [rollup](https://www.npmjs.com/package/rollup)
  - [@rollup/plugin-babel](https://www.npmpjs.com/package/https://www.npmjs.com/package/@rollup/plugin-babel)
  - [@rollup/plugin-url](https://www.npmpjs.com/package/@rollup/plugin-url)
  - [rollup-plugin-terser](https://www.npmpjs.com/package/rollup-plugin-terser)
  - [@rollup/plugin-node-resolve](https://www.npmpjs.com/package/@rollup/plugin-node-resolve)
  - [@rollup/plugin-commonjs](https://www.npmpjs.com/package/@rollup/plugin-commonjs)
  - [@babel/core](https://www.npmpjs.com/package/@babel/core)
  - [@babel/plugin-proposal-object-rest-spread](https://www.npmpjs.com/package/@babel/plugin-proposal-object-rest-spread)
  - [@babel/plugin-syntax-dynamic-import](https://www.npmpjs.com/package/@babel/plugin-syntax-dynamic-import)
  - [@babel/preset-env](https://www.npmpjs.com/package/@babel/preset-env)
- a lint task using
  - [eslint](https://www.npmjs.com/package/eslint)
  - [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
  - [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
  - [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
  - [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
  - [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc)
- a test task using
  - [jest](https://www.npmjs.com/package/jest)
  - [jest-standard-reporter](https://www.npmjs.com/package/jest-standard-reporter)

[Full configuration](.eslintrc.js)

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/javascript
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/javascript")],
};
```

And add a `.eslintrc.js`:

```js
// .eslintrc.js

const eslintConfig = require("@factorial/javascript").eslint;

module.exports = eslintConfig;
```

## Extending or overwriting linting rules

If you need to extend or overwrite the linting rules, you can do that like this:

```js
const eslintConfig = require("@factorial/javascript").eslint;
const deepMerge = require("deepmerge");

module.exports = deepMerge(eslintConfig, {
  rules: {
    ...
  },
});
```

## Tests

The test task uses [jest](https://github.com/facebook/jest), which "_by default it looks for `.js`, `.jsx`, `.ts` and `.tsx` files inside of `__tests__` folders, as well as any files with a suffix of `.test` or `.spec` (e.g. `Component.test.js` or `Component.spec.js`). It will also find files called `test.js` or `spec.js`._" ([Jest documentation](https://jestjs.io/docs/en/configuration.html#testmatch-arraystring))
