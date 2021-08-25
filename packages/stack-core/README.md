# @factorial/stack-core

This is the core package for the [factorial frontend stack](http://www.github.com/factorial-io/fstack).

When running any of the following commands, it executes the related tasks added by the other packages:

- `build` (also copies all assets from `assetFolders` to `distFolder` without installing additional packages)
- `lint`
- `test`

`watch` listens for file changes and then runs `lint` and additionally `build` if `--build` is passed.

It also runs any custom commands exported by installed packages.

You can install other packages to your stack via cli by running:

```bash
yarn factorial init
```

Please refer to the [full documentation](http://www.github.com/factorial-io/fstack) for more information.
