# @factorial/stack-svg

This is the Image plugin for `@factorial/stack-core`.

It adds an optimization task which compresses JPG and PNG files and convers them to webp images. It uses

- [imagemin](https://www.npmjs.com/package/imagemin)
- [imagemin-jpegtran](https://www.npmjs.com/package/imagemin-jpegtran)
- [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)
- [imagemin-webp](https://www.npmjs.com/package/imagemin-webp)

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

### optimize

```bash
yarn factorial optimize
```

This task will go over all JPG and PNG files found in your image folders, optimize them and then convert them to webp.

_**NOTE:** This tasks overwrites your JPG and PNG files!_
