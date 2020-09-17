# Factorial Frontend Stack

The purpose of this stack is to allow [linting](#lint), [building](#build) and [watching](#watch) of your assets, while adding as little overhead and configuration as possible to your project.
`core` is the base package which allows you to install any of the following packages for your project:

- `css`
- `javascript`
- `svg`
- `twig`

## Content

- [Installation](#installation)
- [Options](#options)
- [Usage](#usage)
- [Commands](#commands)
  - [init](#init)
  - [lint](#lint)
  - [optimize](#optimize)
  - [build](#build)
  - [watch](#watch)
  - [test](#test)
  - [Custom commands](#custom-commands)
  - [Adding additional params via CLI](#adding-additional-params-via-cli)
- [Contributing](#contributing)
  - [Creating a release](#creating-a-release)

## Installation

Add `core` via:

```bash
yarn add @factorial/stack-core
```

Afterwards run

```bash
yarn factorial init
```

which allows you to select which packages you want to install.
`core` will then automatically add those packages to your project and create a `.factorialrc.js` with the required configuration.
In this file you can also add the following [options](#options).

## Options

**`assetFolders`**, default: `[]`<br>
_Asset folders for fonts, icons, etc., relative from `rootFolder`. These files will be copied to `distFolder` when creating a build._

**`cssFiles`**, default: `[]`<br>
_The CSS entry files, relative from `rootFolder`. These files will be used to create a build._

**`cssTokens`**<br>
_Please refer to [packages/css/README.md](packages/css/README.md) for more information._

**`distFolder`**, default: `"dist"`<br>
_The folder where the build files will be put_

**`jsFiles`**, default: `[]`<br>
_The JavaScript entry files, relative from `rootFolder`. These files will be used to create a build._

**`rootFolder`**, default: `"src"`<br>
_The root folder for `jsFiles`, `cssFiles` and `assetFolders`_

**`svgFolders`**, default: `[]`<br>
_Folders that contain SVG files._

**`targets`**, default:

```js
browsers: [
  "last 2 versions",
  ">1%",
  "not ie 10",
  "not op_mini all",
  "not op_mob <= 46",
  "not ie_mob <= 11",
];
```

## Usage

If not already done via `yarn factorial init`, create the configuration file like this:

```js
// .factorialrc.js

module.exports = {
  assetFolders: ["fonts/", "icons/"],
  cssFiles: ["index.css"],
  distFolder: "build",
  jsFiles: ["index.js"],
  rootFolder: "source",
};
```

**NOTE**: You can also omit this file if the [default configuration](#options) is sufficient.

### Targets

You can either set a `targets` or `browserslist` key in your `package.json`. The former wins over the latter.

## Commands

### init

```bash
yarn factorial init
```

This will allow you to pick the packages you want to install and afterwards create a configuration file. If it already exists, you can skip that step.

### lint

```bash
yarn factorial lint
```

This will lint all files (found in `rootFolder`) based on your installed packages once.

You can also lint a specific type via e.g.:

```bash
yarn factorial lint --only css
```

### optimize

```bash
yarn factorial optimize
```

This will optimize all files (found in `rootFolder`) based on your installed packages once.

You can also optimize a specific type via e.g.:

```bash
yarn factorial optimize --only svg
```

### build

```bash
yarn factorial build
```

This will create the build files and sourcemaps in `distFolder` based on your installed packages. If they should be minified, you can run this command with setting the `NODE_ENV` to `"production"`:

```bash
NODE_ENV=production yarn factorial build
```

When referencing/importing assets in your component files (`import` in your JS files or `url` in your CSS file), the referenced/imported files are copied into your build folder and the paths are adapted. That means, the assets are not inlined.

You can also build a specific type via e.g.:

```bash
yarn factorial build --only css
```

### watch

```bash
yarn factorial watch
```

This will watch all files in `rootFolder` for changes and lint them. If you also want to create a build, when files changed, pass `--build`:

```bash
yarn factorial watch --build
```

### test

You can run tests based on your installed packages with

```bash
yarn factorial test
```

You can also test a specific type via e.g.:

```bash
yarn factorial test --only js
```

### Custom commands

Packages can also export custom commands (e.g. `sprite` by the SVG package). When running a custom command, `core` would simply execute the related external task (while `core` has more sophisticated functionality for the fixed tasks).

### Adding additional params via CLI

You can run `lint`, `test` and `watch` with additional params like this:

```bash
yarn factorial lint --fix
```

Every param that comes after the command name (`lint`, `watch`, `test`) is passed through, so you can overwrite or define settings.

**NOTE:**: Please note that linting runs `stylelint` and `eslint`, so additional params would passed through to both of them.

Passing additional params to `build` is not supported at the moment.

## Contributing

### Linting

You can lint this project by running:

```bash
yarn lint
```

This will use the same eslint configuration as exposed by the `javascript` package.

### Committing

We are using [Conventional commits](https://www.conventionalcommits.org/).

### Creating a release

To create a release, please run any of:

```bash
yarn core:release
yarn css:release
yarn javascript:release
yarn twig:release
```

This will automatically update the changelog based on the commit messages.

**NOTE**: This only updates the changelog, creates a tag and commit. It does not push to GitHub or publish the package on npm. This needs to be done manually.
