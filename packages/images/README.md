# @factorial/stack-images

This is the Image plugin for `@factorial/stack-core`. It uses [@squoosh/lib](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh) under the hood.

It adds three tasks:

- `optimize`, which optimizes `jpg`, `jpeg` and `png` files
- `webp`, which converts `jpg`, `jpeg` and `png` files to `webp` files
- `avif`, which converts `jpg`, `jpeg` and `png` files to `avif` files

_**NOTE:** These tasks overwrite existing files!_

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-images
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-images")],
};
```

## Usage

In your `.factorialrc.js` add a `imageFolders` key with an array of folders that contain your image files:

```js
// .factorialrc.js

module.exports = {
  imageFolders: ["images"], // relative to your rootFolder
};
```

Then run

```bash
yarn factorial optimize // to optimize jpg and png files
```

or

```bash
yarn factorial webp // to create webp files
```

or

```bash
yarn factorial avif // to create avif files
```
