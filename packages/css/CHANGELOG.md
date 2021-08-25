# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/factorial-io/fstack/compare/css/v0.4.9...css/v0.5.0) (2021-08-25)


### ⚠ BREAKING CHANGES

* **css:** use postcss-preset-env instead of single postcss plugins

### Features

* **css:** use postcss-preset-env instead of single postcss plugins ([8091d3b](https://github.com/factorial-io/fstack/commit/8091d3b4e1f1782e8848b99953f48cd14c307464))

### [0.4.9](https://github.com/factorial-io/fstack/compare/css/v0.4.7...css/v0.4.9) (2021-08-16)


### Features

* **css:** create .stylelintrc.js when adding package via "factorial init" ([61e5b1f](https://github.com/factorial-io/fstack/commit/61e5b1fae8c9587e6527923f24382f629eaa67df))
* **css:** enable --skip option for css package ([4491814](https://github.com/factorial-io/fstack/commit/4491814002a8cc6c1611751200bea9760df996b0))

### [0.4.8](https://github.com/factorial-io/fstack/compare/css/v0.4.7...css/v0.4.8) (2021-08-16)


### Features

* **css:** create .stylelintrc.js when adding package via "factorial init" ([ebd1869](https://github.com/factorial-io/fstack/commit/ebd1869c65364c13c47bbdbc092f48abdc2ee7b0))

### [0.4.7](https://github.com/factorial-io/fstack/compare/css/v0.4.6...css/v0.4.7) (2021-08-16)

### [0.4.6](https://github.com/factorial-io/fstack/compare/css/v0.4.5...css/v0.4.6) (2021-07-06)


### Bug Fixes

* **css:** pass config to cssnano plugins when creating a build ([d652768](https://github.com/factorial-io/fstack/commit/d6527686f31c075623d00994b0d7eed9c8c7c5c6))

### [0.4.5](https://github.com/factorial-io/fstack/compare/css/v0.4.4...css/v0.4.5) (2021-07-01)

### [0.4.4](https://github.com/factorial-io/fstack/compare/css/v0.4.3...css/v0.4.4) (2021-06-21)


### Features

* **css:** Allow both FIGMA_ID and FIGMA_TOKEN to be set as node env vars or via .env file ([4cfe7fa](https://github.com/factorial-io/fstack/commit/4cfe7fa27b895b84aebabe268ce0379e003c8aab))


### Bug Fixes

* **css:** use space around / in font shorthand definition ([674f33e](https://github.com/factorial-io/fstack/commit/674f33e7b15d9dfe287d59df442c0589659276ae))

### [0.4.3](https://github.com/factorial-io/fstack/compare/css/v0.4.2...css/v0.4.3) (2021-06-17)

### [0.4.2](https://github.com/factorial-io/fstack/compare/css/v0.4.1...css/v0.4.2) (2021-06-02)


### Bug Fixes

* **css:** properly exit the process if a build fails ([1ff04fc](https://github.com/factorial-io/fstack/commit/1ff04fc44d17909146326921474327b3d5a10276))

### [0.4.1](https://github.com/factorial-io/fstack/compare/css/v0.4.0...css/v0.4.1) (2021-05-28)

## [0.4.0](https://github.com/factorial-io/fstack/compare/css/v0.3.2...css/v0.4.0) (2021-05-10)


### ⚠ BREAKING CHANGES

* **css:** build files will now be put not directly into the distFolder, but instead the same directory structure is kept inside the distFolder

### Features

* **css:** build files will now be put not directly into the distFolder, but instead the same directory structure is kept inside the distFolder ([cf4d963](https://github.com/factorial-io/fstack/commit/cf4d96377f2e3433b5bf767e32c53532f63bf6c7))

### [0.3.2](https://github.com/factorial-io/fstack/compare/css/v0.3.1...css/v0.3.2) (2021-04-30)

### [0.3.1](https://github.com/factorial-io/fstack/compare/css/v0.3.0...css/v0.3.1) (2021-03-24)


### Features

* **css:** improved linting rules ([278b0d1](https://github.com/factorial-io/fstack/commit/278b0d1266d89e0ae1a76990cc58ab1aef059576))

## [0.3.0](https://github.com/factorial-io/fstack/compare/css/v0.2.11...css/v0.3.0) (2021-03-03)


### ⚠ BREAKING CHANGES

* **css:** adds "hash-" to hash in build file name for easier regexing

### other

* **css:** adds "hash-" to hash in build file name for easier regexing ([b992d66](https://github.com/factorial-io/fstack/commit/b992d662bfb7bc54e626eaba206f821c77a69809))

### [0.2.11](https://github.com/factorial-io/fstack/compare/css/v0.2.10...css/v0.2.11) (2021-02-27)

### [0.2.10](https://github.com/factorial-io/fstack/compare/css/v0.2.9...css/v0.2.10) (2021-02-27)

### [0.2.9](https://github.com/factorial-io/fstack/compare/css/v0.2.8...css/v0.2.9) (2021-02-25)


### Bug Fixes

* **css:** make sure passed config for postcss-custom-properties is respected ([48cd325](https://github.com/factorial-io/fstack/commit/48cd325354321aa41a476aaabc6e221bbd68f5be))

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
