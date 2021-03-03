# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0](https://github.com/factorial-io/fstack/compare/javascript/v0.2.11...javascript/v0.3.0) (2021-03-03)


### ⚠ BREAKING CHANGES

* **javascript:** adds "hash-" to hash in build file name for easier regexing

### other

* **javascript:** adds "hash-" to hash in build file name for easier regexing ([d0ea752](https://github.com/factorial-io/fstack/commit/d0ea752e3787e06ae8452866ca357ed82e83b00d))

### [0.2.11](https://github.com/factorial-io/fstack/compare/javascript/v0.2.10...javascript/v0.2.11) (2021-03-01)


### Bug Fixes

* **javascript:** fix name for certain files in prod build ([cd16324](https://github.com/factorial-io/fstack/commit/cd16324934426d7b7c3f0d6c63285dfa79c9381b))

### [0.2.10](https://github.com/factorial-io/fstack/compare/javascript/v0.2.9...javascript/v0.2.10) (2021-03-01)

### [0.2.9](https://github.com/factorial-io/fstack/compare/javascript/v0.2.8...javascript/v0.2.9) (2021-02-27)

### [0.2.8](https://github.com/factorial-io/fstack/compare/javascript/v0.2.6...javascript/v0.2.8) (2021-02-27)

### [0.2.6](https://github.com/factorial-io/fstack/compare/javascript/v0.2.5...javascript/v0.2.6) (2021-02-19)


### Bug Fixes

* **core:** exclude core-js from being babeled when creating a build ([6ff3775](https://github.com/factorial-io/fstack/commit/6ff3775153ad026d4e952794ce9fdc016a351d9f))

### [0.2.5](https://github.com/factorial-io/fstack/compare/javascript/v0.2.3...javascript/v0.2.5) (2021-02-17)


### Features

* **javascript:** replace process.env.NODE_ENV which is necessary when builds contain a vue import ([ec7fd17](https://github.com/factorial-io/fstack/commit/ec7fd17b05a21d2bd3dc00ced5e9cf302b06e7d4))
* **javascript:** use actual hashes created by rollup to only update build files when they actually changed ([3f8a7a2](https://github.com/factorial-io/fstack/commit/3f8a7a27d34c2cd902e0df53ee455266605b98eb))


### Bug Fixes

* **javascript:** babel targets node now when running tests (fixes error "regeneratorRuntime is undefined") ([b70436b](https://github.com/factorial-io/fstack/commit/b70436bfe760cbec4664eb6599b6bc8d0d350a80))
* **javascript:** close rollup bundle when it is done ([a7cee77](https://github.com/factorial-io/fstack/commit/a7cee770a07c580464e6a324399b9299269225c8))
* **javascript:** do not use transformMixedEsModules for commonjs rollup plugin ([ffcc471](https://github.com/factorial-io/fstack/commit/ffcc4718ce0f71a46c54fd3243aed3493ed31db3))

### [0.2.4](https://github.com/factorial-io/fstack/compare/javascript/v0.2.3...javascript/v0.2.4) (2021-02-10)

### [0.2.3](https://github.com/factorial-io/fstack/compare/javascript/v0.2.2...javascript/v0.2.3) (2020-12-02)

### [0.2.2](https://github.com/factorial-io/fstack/compare/javascript/v0.2.1...javascript/v0.2.2) (2020-10-08)


### Features

* **javascript:** create compiled and uncompiled build files ([8b228cc](https://github.com/factorial-io/fstack/commit/8b228cca939b12444a2d938d75bbbfcba8c3e5dc))

### [0.2.1](https://github.com/factorial-io/fstack/compare/javascript/v0.2.0...javascript/v0.2.1) (2020-10-06)


### Features

* **javascript:** add hash to build files when setting addHashes to true ([acdeddf](https://github.com/factorial-io/fstack/commit/acdeddfc1c0d9f1278fa85ba7bac6be24b3329f5))

## [0.2.0](https://github.com/factorial-io/fstack/compare/javascript/v0.1.2...javascript/v0.2.0) (2020-09-23)


### ⚠ BREAKING CHANGES

* **javascript:** eslint-plugin-jest

* **javascript:** updated node modules ([531d302](https://github.com/factorial-io/fstack/commit/531d302ec1874f3d56a04bf00bf0556f64b6b441))

### [0.1.2](https://github.com/factorial-io/fstack/compare/javascript/v0.1.1...javascript/v0.1.2) (2020-09-09)


### Bug Fixes

* provide correct package namings in readme ([dd23f7b](https://github.com/factorial-io/fstack/commit/dd23f7b32534dba5600559d8b1355113a4509a8d))
* **javascript:** Make sure jest linting only happens for test files ([218d0a0](https://github.com/factorial-io/fstack/commit/218d0a02b96a9ded18421d5aa30321f629577a37))

### 0.1.1 (2020-08-26)


### Bug Fixes

* **javascript:** fix broken .eslintrc.js ([0d35e42](https://github.com/factorial-io/fstack/commit/0d35e420bd611f69cca886cd5d44b9096da3aa98))
