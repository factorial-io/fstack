# @factorial/stack-twig

This is the Twig plugin for `@factorial/stack-core`.

It adds a lint task using https://github.com/friendsoftwig/twigcs and https://github.com/factorial-io/twigcs-extension.

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-twig
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-twig")],
};
```

### Installing the twigcs-extension

If `factorial-io/twigcs-extension` is already added to the `composer.json`

```
composer install
```

If `factorial-io/twigcs-extension` is not added yet to the `composer.json`

```
composer require --dev factorial-io/twigcs-extension
```

## Options

### `executable`

If you cannot install the twigcs-extension inside `./vendor`, but only somewhere else, you can point to the executable like this:

```js
// .factorialrc.js

module.exports = {
  use: [
    [
      require("@factorial/stack-twig"),
      {
        executable: "path/to/the/executable",
      },
    ],
  ],
};
```

### `folder`

By default, `twigcs` will lint all twig files in your `rootFolder`. If you do not want that, you can pass `folder` to this package:

```js
// .factorialrc.js

module.exports = {
  use: [
    [
      require("@factorial/stack-twig"),
      {
        folder: "path/to/templates",
      },
    ],
  ],
};
```

## Using `twigcs` with VS Code

If you are using VS Code, you can use [Twigcs Linter](https://github.com/cerzat43/vscode-twigcs). Make sure to use the same executable by setting `./vendor/bin/twigcs` in `twigcs.executablePath`.
