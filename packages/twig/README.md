# @factorial/stack-twig

This is the Twig plugin for `@factorial/stack-core`.

It adds a lint task using `twigcs`.

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

If `twigcs` is not inside `./vendors`, you can point to the executable like this:

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

### If `factorial-io/twigcs-extension` is already added to the `composer.json`

```
composer install
```

### If `factorial-io/twigcs-extension` is not added yet to the `composer.json`

```
composer require --dev factorial-io/twigcs-extension
```

## Using `twigcs` with VS Code

If you are using VS Code, you can use [Twigcs Linter](https://github.com/cerzat43/vscode-twigcs). Make sure to use the same executable by setting `./vendor/bin/twigcs` in `twigcs.executablePath`.
