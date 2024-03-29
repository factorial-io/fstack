# @factorial/stack-javascript

This is the JavaScript plugin for `@factorial/stack-core`.

It adds

- a build task (creating compiled and uncompiled build files) using
  - [rollup](https://www.npmjs.com/package/rollup)
  - [@rollup/plugin-babel](https://www.npmjs.com/package/@rollup/plugin-babel)
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
  - [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- a test task using
  - [jest](https://www.npmjs.com/package/jest)
  - [jest-standard-reporter](https://www.npmjs.com/package/jest-standard-reporter)

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-javascript
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-javascript")],
};
```

And add a `.eslintrc.js`:

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    require.resolve("@factorial/stack-javascript/eslint"),
  ],
};
```

Available configurations:

- `@factorial/stack-javascript/eslint`: Default configuration, includes `base`, `jsdoc` and `jest`
- `@factorial/stack-javascript/eslint/base`: Basic linting rules, always necessary
- `@factorial/stack-javascript/eslint/jsdoc`: JSDoc linting
- `@factorial/stack-javascript/eslint/jest`: Jest test spec linting

## Defining the output format

By default the output format of the build files is determined by the defined targets (see main README).

If you want to explicitely define it (for example to make sure the build files are ES modules), you can do that by passing a configuration object:

```js
// .factorialrc.js

module.exports = {
  use: [[require("@factorial/stack-javascript"), { outputFormat: "esm" }]],
};
```

## Changing plugin configuration

If you want to change the configuration of any of the used `rollup` plugins, you can do that like this:

```js
// .factorialrc.js

module.exports = {
  use: [
    [
      require("@factorial/stack-javascript"),
      {
        plugins: {
          "@rollup/plugin-commonjs": { … }
        }
      }
    ]
  ],
};
```

## Adding a `rollup` plugin

## Changing plugin configuration

If you want to add an additional `rollup` plugin, you can do that like this:

```js
// .factorialrc.js

const myPlugin = require("myRollupPlugin");

module.exports = {
  use: [
    [
      require("@factorial/stack-javascript"),
      {
        plugins: {
          "myRollupPlugin": { … }
        }
      }
    ]
  ],
};
```

Make sure you added it to your `devDependencies` in the `package.json`.

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

## Exclude files from linting

If you want to exclude files from linting, you can do it by adding a `.eslintignore` file to your root where you reference all files that should be ignored.

## Tests

The test task uses [jest](https://github.com/facebook/jest), which "_by default it looks for `.js`, `.jsx`, `.ts` and `.tsx` files inside of `__tests__` folders, as well as any files with a suffix of `.test` or `.spec` (e.g. `Component.test.js` or `Component.spec.js`). It will also find files called `test.js` or `spec.js`._" ([Jest documentation](https://jestjs.io/docs/en/configuration.html#testmatch-arraystring))

### Extending the jest config

If you need to extend the jest config, you can do that like this:

```js
const jestConfig = require("@factorial/stack-javascript").jest;
const deepMerge = require("deepmerge");

module.exports = deepMerge(jestConfig, {
  ...
});
```
