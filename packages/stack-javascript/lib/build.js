/* eslint no-console: 0 */
const chalk = require("chalk");
const rollup = require("rollup");
const babel = require("@rollup/plugin-babel");
const url = require("@rollup/plugin-url");
const replace = require("@rollup/plugin-replace");
const terser = require("rollup-plugin-terser");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const path = require("path");

/**
 * @param {Array} use
 * @param {string} rootFolder
 * @param {object} targets
 * @param {boolean} compiled
 * @param {object} userPlugins
 * @returns {Array}
 */
function getPlugins(use, rootFolder, targets, compiled, userPlugins = {}) {
  const pluginOptions = {
    "@rollup/plugin-babel": userPlugins["@rollup/plugin-babel"] || {},
    "@rollup/plugin-node-resolve":
      userPlugins["@rollup/plugin-node-resolve"] || {},
    "@rollup/plugin-commonjs": userPlugins["@rollup/plugin-commonjs"] || {},
    "@rollup/plugin-url": userPlugins["@rollup/plugin-url"] || {},
    "@rollup/plugin-replace": userPlugins["@rollup/plugin-replace"] || {},
    "rollup-plugin-terser": userPlugins["rollup-plugin-terser"] || {},
  };
  const additionalPlugins = [];
  let plugins = [];

  use.forEach((extension) => {
    if (extension.build && extension.build.js) {
      extension.build.js.plugins.forEach((plugin) => {
        additionalPlugins.push(plugin);
      });
    }
  });

  const pluginNames = Object.keys(pluginOptions);
  Object.keys(userPlugins)
    .filter((plugin) => !pluginNames.includes(plugin))
    .forEach((plugin) => {
      /* eslint-disable-next-line import/no-dynamic-require, global-require */
      additionalPlugins.push(require(plugin)(userPlugins[plugin]));
    });

  if (compiled) {
    plugins = [
      ...plugins,
      babel.babel({
        babelHelpers: "bundled",
        exclude: ["node_modules/core-js/**"],
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
        ...pluginOptions["@rollup/plugin-babel"],
      }),
    ];
  }

  plugins = [
    ...plugins,
    url({
      limit: 0,
      fileName: "[dirname][name][extname]",
      sourceDir: rootFolder.replace(`${process.cwd()}/`, ""),
      ...pluginOptions["@rollup/plugin-url"],
    }),
    nodeResolve(pluginOptions["@rollup/plugin-node-resolve"]),
    commonjs(pluginOptions["@rollup/plugin-commonjs"]),
    replace({
      values: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      preventAssignment: true,
      ...pluginOptions["@rollup/plugin-replace"],
    }),
    ...additionalPlugins,
  ];

  if (process.env.NODE_ENV === "production") {
    plugins.push(terser.terser(pluginOptions["rollup-plugin-terser"]));
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
 * @param {boolean} addHashes
 * @param {boolean} compiled
 * @returns {string}
 */
function getFileName(addHashes, compiled) {
  return compiled
    ? `[name].compiled${addHashes ? ".hash-[hash]" : ""}.js`
    : `[name]${addHashes ? ".hash-[hash]" : ""}.js`;
}

/**
 * Compiles the JS entry files with Babel and rollup
 * and saves the output files in `distFolder`.
 *
 * @param {object} config
 * @param {Array} config.use
 * @param {string} config.rootFolder
 * @param {Array} config.jsFiles
 * @param {string} config.distFolder
 * @param {object} config.targets
 * @param {boolean} config.addHashes
 * @param {object} userConfig
 * @returns {Promise}
 */
module.exports = function buildJS(
  { use, rootFolder, jsFiles, distFolder, targets, addHashes },
  userConfig = {}
) {
  if (jsFiles.length > 0) {
    const format = userConfig.outputFormat || getFormat(targets);
    const promises = [];

    jsFiles.forEach((file) => {
      const folderRelativeFromRootFolder = path.dirname(
        file.replace(
          path.join(rootFolder.replace(path.join(process.cwd(), "/"), ""), "/"),
          ""
        )
      );

      [false, true].forEach((compiled) => {
        const plugins = getPlugins(
          use,
          rootFolder,
          targets,
          compiled,
          userConfig.plugins
        );

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
                  dir: path.join(distFolder, folderRelativeFromRootFolder),
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
        return Promise.resolve();
      })
      .catch(() => {
        console.log(`\nJS: ${chalk.red("Failed!")}`);
        return Promise.reject();
      });
  }

  console.log(`\nJS: ${chalk.yellow("No files found.")}`);
  return Promise.resolve();
};
