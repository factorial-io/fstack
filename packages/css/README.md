# @factorial/stack-css

This is the CSS plugin for `@factorial/stack-core`.

It adds

- a build task using
  - [postcss](https://www.npmjs.com/package/postcss)
  - [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env)
  - [postcss-import](https://www.npmjs.com/package/postcss-import)
  - [postcss-url](https://www.npmjs.com/package/postcss-url)
  - [cssnano](https://www.npmjs.com/package/cssnano)
- a lint task using
  - [stylelint](https://www.npmjs.com/package/stylelint)
  - [stylelint-config-prettier](https://www.npmjs.com/package/stylelint-config-prettier)
  - [stylelint-config-suitcss](https://www.npmjs.com/package/stylelint-config-suitcss)
  - [stylelint-selector-bem-pattern](https://www.npmjs.com/package/stylelint-selector-bem-pattern)
- a token import task

## Content

- [Installation](#installation)
- [Passing options to PostCSS plugins](#passing-options-to-postcss-plugins)
- [Adding plugins to PostCSS](#adding-plugins-to-postcss)
- [Extending or overwriting linting rules](#extending-or-overwriting-linting-rules)
- [Exclude files from linting](#exclude-files-from-linting)
- [Design token import](#design-token-import)

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

## Passing options to PostCSS plugins

If you need to pass options to one of the plugins, you can do that like this:

```js
// .factorialrc.js

module.exports = {
  use: [
    [
      require("@factorial/stack-css"),
      { plugins: { "postcss-url": { url: "copy" } } },
    ],
  ],
};
```

## Adding plugins to PostCSS

If you want to add another plugin to PostCSS, install it via `yarn add -D plugin-name` and then add it to the list of plugins the same way as in the previous step:

```js
// .factorialrc.js

module.exports = {
  use: [[require("@factorial/stack-css"), { plugins: { "plugin-name": {} } }]],
};
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

## Design token import

If you want to use the design token import from Figma, add the following options to your `.factorialrc.js`:

```js
cssTokens: {
  figma: {
    token: "<YOUR_FIGMA_TOKEN>",
    id: "<THE_FIGMA_FILE_ID>",
  }
}
```

If you do not want to add the Figma token and ID to the repository (as the code might be publicly available), you can use node environment variables (`FIGMA_TOKEN` and `FIGMA_ID`) or create a `.env` file and add `FIGMA_TOKEN` and `FIGMA_ID` in there.

There are more options available, whose default values can be overwritten like this:

```js
cssTokens: {
  file: "css/tokens.css", // the CSS file that will be created – relative to your rootFolder
  page: "Design tokens", // the name of the page in the Figma file
  layers: {
    // the name of the layers in the Figma File
    typography: "typography",
    spacings: "spacings",
    colors: "colors",
  },
}
```

The values used here are the default values.

### Figma setup

As the Figma API does not return the values of styles, you need to create a dedicated page. This page will then be parsed by this package. For this to work, you need to do the following:

1. Create a page called "Design tokens" (or your value of `cssTokens.figma.page`)
2. On that page, create a dedicated layer for typography, colors and spacings.
3. Name these layers based on `cssTokens.figma.layers`.
4. For typography, add text nodes and apply the correct styles. If a style should only be used for e.g. headlines or copy, prefix its name with "headline-", "copy-" etc.
5. For colors, create rectangles for decoration colors and text nodes for typography colors. Use filling for the rectangles and text color for the text nodes to apply the correct colors. Prefix the names of decoration nodes with "decoration-" and the name of text nodes with "typo-".
6. For spacings, create rectangles with the size of the spacing.
