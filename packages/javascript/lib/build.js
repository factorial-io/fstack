/* eslint no-console: 0 */

const chalk = require("chalk");
const rollup = require("rollup");
const babel = require("@rollup/plugin-babel");
const url = require("@rollup/plugin-url");
const terser = require("rollup-plugin-terser");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

/**
 * Compiles the JS entry files with Babel and rollup
 * and saves the output files in `distFolder`.
 *
 * @param {object} obj - the configuration object
 * @param {Array} obj.use - the additional extensions
 * @param {string} obj.rootFolder - the root folder where the components and assets live
 * @param {Array} obj.jsFiles - the js entry files
 * @param {string} obj.distFolder - the folder where the files should be put
 * @param {object} obj.targets - the target configuration, can container `node` and `browsers`
 * @returns {Promise} - Gets resolved when building is done
 */
module.exports = function buildJS({
  use,
  rootFolder,
  jsFiles,
  distFolder,
  targets,
}) {
  if (jsFiles.length > 0) {
    const additionalPlugins = [];

    use.forEach((extension) => {
      if (extension.build && extension.build.js) {
        extension.build.js.plugins.forEach((plugin) => {
          additionalPlugins.push(plugin);
        });
      }
    });

    const plugins = [
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

    const promises = [];

    let format;
    if (targets.node && targets.browsers) {
      format = "umd";
    } else if (targets.node) {
      format = "cjs";
    } else {
      format = "iife";
    }

    jsFiles.forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          rollup
            .rollup({
              input: file,
              plugins,
            })
            .then(async (bundle) => {
              await bundle.write({
                dir: distFolder,
                format,
                sourcemap: true,
              });
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
