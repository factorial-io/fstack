/* eslint no-console: 0 */

const chokidar = require("chokidar");
const path = require("path");

const lint = require("./lint");
const build = require("./build");

let inProgress = false;

/**
 * Lints and builds (if param is "--build") all files
 *
 * @param {object} config - the configuration object
 * @param {string} param - param passed via cli
 * @param {string} [fileType] - the type of the file that has been changed
 */
async function lintAndBuild(config, param, fileType) {
  if (!inProgress) {
    inProgress = true;

    if (param === "--build") {
      await build(config, fileType);
    }

    await lint(config);

    inProgress = false;
  }
}

/**
 * Watches all assets defined in the configuration,
 * lints them and builds them if `--build` is passed via CLI.
 *
 * @param {object} config - the configuration object
 */
module.exports = function watch(config) {
  const param = process.argv.slice(2)[1];

  console.clear();

  lintAndBuild(config, param);

  chokidar
    .watch(config.rootFolder, { ignoreInitial: true })
    .on("all", (event, changedPath) => {
      console.clear();
      lintAndBuild(config, param, path.extname(changedPath).slice(1));
    });
};
