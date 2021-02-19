# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.8](https://github.com/factorial-io/fstack/compare/css/v0.2.7...css/v0.2.8) (2021-02-19)


### Features

* **css:** use actual hashes of the file content to only update build file names when the files actually changed ([6b95056](https://github.com/factorial-io/fstack/commit/6b950563fb7afc16b0754002a89b393cad1bd4d2))


### Bug Fixes

* **css:** create build folder if it does not exist yet when creating a build ([aaade8c](https://github.com/factorial-io/fstack/commit/aaade8c99c3cdd8c475f976a902121e5413c5710))
* **css:** do not preserve custom properties when they are converted anyway ([e28b70a](https://github.com/factorial-io/fstack/commit/e28b70afb2547c92a653be8b892029441255b117))

### [0.2.7](https://github.com/factorial-io/fstack/compare/css/v0.2.5...css/v0.2.7) (2021-02-17)


### Features

* **css:** use plugin configs provided by .factorialrc.js ([ce8999b](https://github.com/factorial-io/fstack/commit/ce8999b532149ff059dba61ed985ae3e20a12ede))

### [0.2.6](https://github.com/factorial-io/fstack/compare/css/v0.2.5...css/v0.2.6) (2021-02-10)

### [0.2.5](https://github.com/factorial-io/fstack/compare/css/v0.2.4...css/v0.2.5) (2020-12-02)

### [0.2.4](https://github.com/factorial-io/fstack/compare/css/v0.2.3...css/v0.2.4) (2020-11-12)


### Features

* **css:** Added task which creates a CSS file with custom properties after import via Figma API ([8cb2ca0](https://github.com/factorial-io/fstack/commit/8cb2ca0dad0e1bad6b5fbce4b151ff5f7904c0a9))

### [0.2.3](https://github.com/factorial-io/fstack/compare/css/v0.2.2...css/v0.2.3) (2020-11-05)


### Bug Fixes

* **css): Revert "feat(css:** do not preserve custom properties when they need to be converted anyway" ([5d58a5c](https://github.com/factorial-io/fstack/commit/5d58a5c4b16646d81eb4f22ced5fc32d28600799))

### [0.2.2](https://github.com/factorial-io/fstack/compare/css/v0.2.1...css/v0.2.2) (2020-11-05)


### Features

* **css:** customPropertyFiles option to support custom property conversion in files that do not import custom property definitions ([e6013c9](https://github.com/factorial-io/fstack/commit/e6013c9bd6e8b77a89a6b4de3b70e4f9e24e6907))
* **css:** do not preserve custom properties when they need to be converted anyway ([c7e4590](https://github.com/factorial-io/fstack/commit/c7e45907072c2c9d61ceb183f91c6f411568fbc8))
* **css:** only use postcss custom properties plugin when necessary according to browserslist ([e8f2a01](https://github.com/factorial-io/fstack/commit/e8f2a01ee6721c3b2f83699569c967e553fcc446))

### [0.2.1](https://github.com/factorial-io/fstack/compare/css/v0.2.0...css/v0.2.1) (2020-10-06)


### Features

* **css:** add hash to build files when setting addHashes to true ([25adbe0](https://github.com/factorial-io/fstack/commit/25adbe0f3f25b53983669a9ef385b7dfde63a54c))

## [0.2.0](https://github.com/factorial-io/fstack/compare/css/v0.1.1...css/v0.2.0) (2020-09-23)


### ⚠ BREAKING CHANGES

* **css:** postcss, postcss-custom-properties, autoprefixer

* **css:** updated node modules ([ca4dd8c](https://github.com/factorial-io/fstack/commit/ca4dd8c6541b270c1cbff39ab50035d0d5b4b68d))

### 0.1.1 (2020-09-09)


### Bug Fixes

* provide correct package namings in readme ([dd23f7b](https://github.com/factorial-io/fstack/commit/dd23f7b32534dba5600559d8b1355113a4509a8d))
