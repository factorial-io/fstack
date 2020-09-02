# @factorial/stack-css

This is the CSS plugin for `@factorial/stack-core`.

It adds

- a build task using
  - [postcss](https://www.npmjs.com/package/postcss)
  - [postcss-color-function](https://www.npmjs.com/package/postcss-color-function)
  - [postcss-custom-media](https://www.npmjs.com/package/postcss-custom-media)
  - [postcss-custom-properties](https://www.npmjs.com/package/postcss-custom-properties)
  - [postcss-import](https://www.npmjs.com/package/postcss-import)
  - [postcss-url](https://www.npmjs.com/package/postcss-url)
  - [autoprefixer](https://www.npmjs.com/package/autoprefixer)
  - [cssnano](https://www.npmjs.com/package/cssnano)
- a lint task using
  - [stylelint](https://www.npmjs.com/package/stylelint)
  - [stylelint-config-prettier](https://www.npmjs.com/package/stylelint-config-prettier)
  - [stylelint-config-suitcss](https://www.npmjs.com/package/stylelint-config-suitcss)
  - [stylelint-selector-bem-pattern](https://www.npmjs.com/package/stylelint-selector-bem-pattern)

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-css
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-css")],
};
```

And add a `.stylelintrc.js`:

```js
// .stylelintrc.js

const stylelintConfig = require("@factorial/stack-css").stylelint;

module.exports = stylelintConfig;
```

## Extending or overwriting linting rules

If you need to extend or overwrite the linting rules, you can do that like this:

```js
const stylelintConfig = require("@factorial/stack-css").stylelint;
const deepMerge = require("deepmerge");

module.exports = deepMerge(stylelintConfig, {
  rules: {
    "number-leading-zero": "never",
  },
});
```

## Exclude files from linting

If you want to exclude files from linting, you can do it by adding a `.stylelintignore` file to your root where you reference all files that should be ignored.