# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.6](https://github.com/factorial-io/fstack/compare/core/v0.3.5...core/v0.3.6) (2021-08-17)


### Bug Fixes

* **core:** Fixes missing folders in build folder ([8640c35](https://github.com/factorial-io/fstack/commit/8640c35a83823f07dffa20c2259b090dadcf2c76))

### [0.3.5](https://github.com/factorial-io/fstack/compare/core/v0.3.3...core/v0.3.5) (2021-08-16)


### Features

* **core:** added --skip option to exclude types from linting, building etc (similar to --only) ([714c5fc](https://github.com/factorial-io/fstack/commit/714c5fc78dee2689432274f163ce6a9061f7a496))
* **core:** added HTML package ([71a157f](https://github.com/factorial-io/fstack/commit/71a157f4f6b6b50c9b19dff3f5a2c130ffccbb13))
* **core:** enable core to create package config files when running "factorial init" ([aa16c28](https://github.com/factorial-io/fstack/commit/aa16c2828aa4e021a0f38f614dbd1fd1a1f34878))

### [0.3.4](https://github.com/factorial-io/fstack/compare/core/v0.3.3...core/v0.3.4) (2021-08-16)


### Features

* **core:** added HTML package ([71a157f](https://github.com/factorial-io/fstack/commit/71a157f4f6b6b50c9b19dff3f5a2c130ffccbb13))
* **core:** enable core to create package config files when running "factorial init" ([fca61ca](https://github.com/factorial-io/fstack/commit/fca61ca495689319040d7670aa5d4a7271c1f054))

### [0.3.3](https://github.com/factorial-io/fstack/compare/core/v0.3.2...core/v0.3.3) (2021-08-12)


### Bug Fixes

* **core:** Fixes error when no extension config is passed to e2e package ([10c22ef](https://github.com/factorial-io/fstack/commit/10c22ef5a093e7c7bf76dd66fb6b597ff8bac4a0))

### [0.3.2](https://github.com/factorial-io/fstack/compare/core/v0.3.1...core/v0.3.2) (2021-08-10)


### Bug Fixes

* **core:** fixes extension options by user are not passed test tasks ([12df35a](https://github.com/factorial-io/fstack/commit/12df35a56afe362ae6164d4fb8354b96e40d6481))

### [0.3.1](https://github.com/factorial-io/fstack/compare/core/v0.3.0...core/v0.3.1) (2021-07-01)


### Features

* **core:** Added e2e package ([d7fe369](https://github.com/factorial-io/fstack/commit/d7fe369a3295d36eb98b12f1faba08d0640f4412))

## [0.3.0](https://github.com/factorial-io/fstack/compare/core/v0.2.14...core/v0.3.0) (2021-06-23)


### ⚠ BREAKING CHANGES

* **core:** the default value of targets.browsers is now "last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 ios versions, last 2 ChromeAndroid versions, last 2 Edge versions"

### Bug Fixes

* **core:** Fix using browserslist value if it is defined in the package.json ([6e60ccc](https://github.com/factorial-io/fstack/commit/6e60cccf21f900f810898cc650829fd31413d607))


### config

* **core:** changed the default value for targets.browsers ([3a1ede9](https://github.com/factorial-io/fstack/commit/3a1ede92dab33949e20268e086fda6af707f2588))

### [0.2.14](https://github.com/factorial-io/fstack/compare/core/v0.2.13...core/v0.2.14) (2021-06-23)


### Bug Fixes

* **core:** Fix error when running custom commands, e.g. creating svg sprites ([aaaa959](https://github.com/factorial-io/fstack/commit/aaaa95944e9deecac1397027287c04d16ef9cb6f))

### [0.2.13](https://github.com/factorial-io/fstack/compare/core/v0.2.12...core/v0.2.13) (2021-06-21)


### Features

* **core:** support comma separated values for "--only" ([bf377c9](https://github.com/factorial-io/fstack/commit/bf377c90a6e93377d799cba66e9dd6396a75e1a4))

### [0.2.12](https://github.com/factorial-io/fstack/compare/core/v0.2.11...core/v0.2.12) (2021-06-17)

### [0.2.11](https://github.com/factorial-io/fstack/compare/core/v0.2.10...core/v0.2.11) (2021-06-02)


### Bug Fixes

* **core:** properly exit the process if a build fails ([af6c061](https://github.com/factorial-io/fstack/commit/af6c06100cca38d5e16127bd0bc72598648e101f))

### [0.2.10](https://github.com/factorial-io/fstack/compare/core/v0.2.9...core/v0.2.10) (2021-04-30)

### [0.2.9](https://github.com/factorial-io/fstack/compare/core/v0.2.8...core/v0.2.9) (2021-03-15)


### Bug Fixes

* **core:** clean build folder when starting the watcher to avoid conflicts with old files ([2f7d85d](https://github.com/factorial-io/fstack/commit/2f7d85daafad776cfbf57757229ee13f4c8c7a77))

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
