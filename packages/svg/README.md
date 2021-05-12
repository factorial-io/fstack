# @factorial/stack-svg

This is the SVG plugin for `@factorial/stack-core`.

It adds

- a optimization task using
  - [svgo](https://www.npmjs.com/package/svgo)
- a sprite task using
  - [svg-sprite](https://www.npmjs.com/package/svg-sprite)

## Installation

You can install it via:

```bash
yarn factorial init
```

or manually via:

```bash
yarn add @factorial/stack-svg
```

Make sure it is added to your `.factorialrc.js` like this:

```js
// .factorialrc.js

module.exports = {
  use: [require("@factorial/stack-svg")],
};
```

## Usage

In your `.factorialrc.js` add a `svgFolders` key with an array of folders that contain your SVG files:

```js
// .factorialrc.js

module.exports = {
  svgFolders: ["icons"], // relative to your rootFolder
};
```

### optimize

```bash
yarn factorial optimize
```

This task will go over all SVG files found in your svg folders and optimize them (remove unnecessary attributes, whitespace, etc.).

_**NOTE:** This tasks overwrites your SVG files!_

### sprite

```bash
yarn factorial sprite
```

This task will create a SVG sprite for each of your svg folders. If you e.g. have a svg folder `src/svgs/icons`, it will create `src/svgs/icons.sprite.svg`.

If you have multiple svg folders, you can also create just a single sprite via:

```bash
yarn factorial sprite --folder path/to/your/folder
```

The path to your folder would be relative from your working directory.
