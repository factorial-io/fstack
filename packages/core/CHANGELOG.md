# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.8](https://github.com/factorial-io/fstack/compare/core/v0.2.7...core/v0.2.8) (2021-02-27)


### Bug Fixes

* **core:** fix package.json couldnt be found ([e0b5f6f](https://github.com/factorial-io/fstack/commit/e0b5f6f8c282ada5a792277a811c72b151ac93b5))

### [0.2.7](https://github.com/factorial-io/fstack/compare/core/v0.2.6...core/v0.2.7) (2021-02-22)


### Features

* **core:** option to run a command after the build has been done during watching ([af46aa4](https://github.com/factorial-io/fstack/commit/af46aa4c82debcb29515fd0877d1c3d2bec32c8d))


### Bug Fixes

* **core:** do not watch the dist folder ([48d9bb2](https://github.com/factorial-io/fstack/commit/48d9bb2d64ded6cb60bc6c56ebe4391c5eb7f1da))

### [0.2.6](https://github.com/factorial-io/fstack/compare/core/v0.2.5...core/v0.2.6) (2021-02-10)


### Bug Fixes

* **core:** added missing "images" package in init script ([1779a7a](https://github.com/factorial-io/fstack/commit/1779a7a212fff05ad0e4a8502c35da5aec05480a))
* **core:** only delete the build folder when config.addHashes is true ([8163ad0](https://github.com/factorial-io/fstack/commit/8163ad0a50d8f41bad9e273af01865493e5b7bf8))

### [0.2.5](https://github.com/factorial-io/fstack/compare/core/v0.2.4...core/v0.2.5) (2020-12-02)


### Features

* **core:** added imageFolders option ([6d9b4ee](https://github.com/factorial-io/fstack/commit/6d9b4ee13a06956e5f2760f5f4618647588e3785))

### [0.2.4](https://github.com/factorial-io/fstack/compare/core/v0.2.3...core/v0.2.4) (2020-11-12)


### Features

* **core:** Allow passing configuration objects from .factorialrc.js to packages ([65392a1](https://github.com/factorial-io/fstack/commit/65392a1890bcce4eb33e1c5e41bed26d409f789e))

### [0.2.3](https://github.com/factorial-io/fstack/compare/core/v0.2.2...core/v0.2.3) (2020-11-05)


### Features

* **core:** added customPropertyFiles option ([de38305](https://github.com/factorial-io/fstack/commit/de383057766ff79984db782b9ab8c161c73dd972))

### [0.2.2](https://github.com/factorial-io/fstack/compare/core/v0.2.1...core/v0.2.2) (2020-10-08)


### Bug Fixes

* **core:** always properly delete build files, also check for changed file types or --only param ([da71eff](https://github.com/factorial-io/fstack/commit/da71eff4cf1bab525df75a752370924031460696))

### [0.2.1](https://github.com/factorial-io/fstack/compare/core/v0.2.0...core/v0.2.1) (2020-10-06)


### Features

* **core:** added option "addHashes" ([1f3cc03](https://github.com/factorial-io/fstack/commit/1f3cc03fefb903e0eab4d0baf949752ac357de33))

## [0.2.0](https://github.com/factorial-io/fstack/compare/core/v0.1.5...core/v0.2.0) (2020-09-23)


### ⚠ BREAKING CHANGES

* **core:** only allow node 10, 12, 14

### Bug Fixes

* **core:** install packages via init as devDependencies, not dependencies ([3c61a97](https://github.com/factorial-io/fstack/commit/3c61a974dc1fd180fa0af4370c992e7f5d11bc42))


* **core:** only allow node 10, 12, 14 ([f5b572e](https://github.com/factorial-io/fstack/commit/f5b572eefe0b3cbe81410bd34664d5232d748ff0))

### [0.1.5](https://github.com/factorial-io/fstack/compare/core/v0.1.4...core/v0.1.5) (2020-09-22)


### Features

* **core:** Added "optimize" command and allow custom commands ([82971ff](https://github.com/factorial-io/fstack/commit/82971ff6ce230dcf2c52be74d211f4c327c3dfee))
* **core:** Added config option for SVGs ([95213bf](https://github.com/factorial-io/fstack/commit/95213bf5fc2fbe472c71bf93fac7503d20c26d15))

### [0.1.4](https://github.com/factorial-io/fstack/compare/core/v0.1.3...core/v0.1.4) (2020-09-17)


### Features

* **core:** If no task was found, do not run all tasks ([33f9a8d](https://github.com/factorial-io/fstack/commit/33f9a8d733639718e4080b7aa679e3031a9e6c81))

### [0.1.3](https://github.com/factorial-io/fstack/compare/core/v0.1.2...core/v0.1.3) (2020-09-09)

### [0.1.2](https://github.com/factorial-io/fstack/compare/core/v0.1.1...core/v0.1.2) (2020-08-26)


### Bug Fixes

* **core:** fixes a bug when no file type was passed to tasks ([586e188](https://github.com/factorial-io/fstack/commit/586e1882bbe49b2b13a3c55f8f2816fbada2a615))

### 0.1.1 (2020-08-26)


### Bug Fixes

* **core:** load packages via init command from npm, not github ([29b0016](https://github.com/factorial-io/fstack/commit/29b0016eca02c10b3448656c170360850e67418d))
