# @factorial/stack-twig

This is the Twig plugin for `@factorial/core`.

It adds a lint task using `twigcs`.

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/twig
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/twig")],
};
```

### If `friendsoftwig/twigcs` is already added to the `composer.json`

```
composer install
```

### If `friendsoftwig/twigcs` is not added yet to the `composer.json`

```
composer require --dev friendsoftwig/twigcs
```

## Using `twigcs` with VS Code

If you are using VS Code, you can use [Twigcs Linter](https://github.com/cerzat43/vscode-twigcs). Make sure to use the same executable by setting `./vendor/bin/twigcs` in `twigcs.executablePath`.
