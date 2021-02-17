/* eslint no-console: 0 */
const chalk = require("chalk");
const rollup = require("rollup");
const babel = require("@rollup/plugin-babel");
const url = require("@rollup/plugin-url");
const terser = require("rollup-plugin-terser");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const path = require("path");

/**
 * @param {Array} use
 * @param {string} rootFolder
 * @param {object} targets
 * @param {boolean} [compiled]
 * @returns {Array}
 */
function getPlugins(use, rootFolder, targets, compiled) {
  const additionalPlugins = [];
  let plugins = [];

  use.forEach((extension) => {
    if (extension.build && extension.build.js) {
      extension.build.js.plugins.forEach((plugin) => {
        additionalPlugins.push(plugin);
      });
    }
  });

  if (compiled) {
    plugins = [
      ...plugins,
      babel.babel({
        babelHelpers: "bundled",
        plugins: [
          require.resolve("@babel/plugin-syntax-dynamic-import"),
          require.resolve("@babel/plugin-proposal-object-rest-spread"),
        ],
        presets: [
          [
            require.resolve("@babel/preset-env"),
            {
              modules: false,
              targets,
            },
          ],
        ],
      }),
    ];
  }

  plugins = [
    ...plugins,
    url({
      limit: 0,
      fileName: "[dirname][name][extname]",
      sourceDir: rootFolder.replace(`${process.cwd()}/`, ""),
    }),
    nodeResolve(),
    commonjs({ transformMixedEsModules: true }),
    ...additionalPlugins,
  ];

  if (process.env.NODE_ENV === "production") {
    plugins.push(terser.terser());
  }

  return plugins;
}

/**
 * @param {object} targets
 * @returns {string}
 */
function getFormat(targets) {
  if (targets.node && targets.browsers) return "umd";
  if (targets.node) return "cjs";
  return "iife";
}

/**
 * @param {string} file
 * @param {string} distFolder
 * @param {boolean} addHashes
 * @param {boolean} compiled
 * @returns {string}
 */
function getFileName(addHashes, compiled) {
  return compiled
    ? `[name]${addHashes ? ".[hash]" : ""}.compiled.js`
    : `[name]${addHashes ? ".[hash]" : ""}.js`;
}

/**
 * Compiles the JS entry files with Babel and rollup
 * and saves the output files in `distFolder`.
 *
 * @param {object} obj
 * @param {Array} obj.use
 * @param {string} obj.rootFolder
 * @param {Array} obj.jsFiles
 * @param {string} obj.distFolder
 * @param {object} obj.targets
 * @param {boolean} obj.addHashes
 * @returns {Promise}
 */
module.exports = function buildJS({
  use,
  rootFolder,
  jsFiles,
  distFolder,
  targets,
  addHashes,
}) {
  if (jsFiles.length > 0) {
    const format = getFormat(targets);
    const promises = [];

    jsFiles.forEach((file) => {
      [false, true].forEach((compiled) => {
        const plugins = getPlugins(use, rootFolder, targets, compiled);

        promises.push(
          new Promise((resolve, reject) => {
            rollup
              .rollup({
                input: file,
                plugins,
              })
              .then(async (bundle) => {
                await bundle.write({
                  name: path.basename(file),
                  dir: distFolder,
                  entryFileNames: getFileName(addHashes, compiled),
                  chunkFileNames: getFileName(addHashes, compiled),
                  format,
                  sourcemap: true,
                });
                await bundle.close();
                resolve();
              })
              .catch((e) => {
                console.log(chalk.bold("\nJS:"));
                console.log(e);
                reject();
              });
          })
        );
      });
    });

    return Promise.all(promises)
      .then(() => {
        console.log(`\nJS: ${chalk.green("Done!")}`);
      })
      .catch(() => {
        console.log(`\nJS: ${chalk.red("Failed!")}`);
      });
  }

  console.log(`\nJS: ${chalk.yellow("No files found.")}`);
  return Promise.resolve();
};
