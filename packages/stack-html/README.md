# @factorial/stack-html

This is the HTML plugin for `@factorial/stack-core`.

It adds a lint task using https://html-validate.org/.

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-html
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-html")],
};
```

And add a `.htmlvalidate.js`:

```js
// .htmlvalidate.js

const htmlValidateConfig = require("@factorial/stack-html").htmlValidate;

module.exports = htmlValidateConfig;
```

## Extending or overwriting linting rules

If you need to extend or overwrite the linting rules, you can do that like this:

```js
const htmlValidateConfig = require("@factorial/stack-html").htmlValidate;
const deepMerge = require("deepmerge");

module.exports = deepMerge(htmlValidateConfig, {
  rules: {
    …
  },
});
```

### Default configuration

This package uses the `html-validate:recommended` ruleset of `html-validate` with the following overwrites:

```json
{
  "no-inline-style": 0,
  "no-trailing-whitespace": 0
}
```

### `folder`

By default, `html-validate` will lint all html files in your `rootFolder` using this glob: `**/*.html`. If you do not want that, you can pass `files` to this package:

```js
// .factorialrc.js

module.exports = {
  use: [
    [
      require("@factorial/stack-html"),
      {
        files: "some/other/glob/**/*.html",
      },
    ],
  ],
};
```
