const chokidar = require("chokidar");
const path = require("path");

const lint = require("./lint");
const build = require("./build");

let inProgress = false;

/**
 * @param {object} config
 * @param {string} param - the param passed via cli
 * @param {string} [fileExtension] - the type of the file that has been changed
 */
async function lintAndBuild(config, param, fileExtension) {
  if (!inProgress) {
    inProgress = true;

    if (param === "--build") {
      await build({ config, fileExtension });
    }

    await lint({ config });

    inProgress = false;
  }
}

/**
 * Watches all assets defined in the configuration file,
 * lints them and builds them if `--build` is passed via CLI.
 *
 * @param {object} config
 */
module.exports = function watch(config) {
  const param = process.argv.slice(2)[1];

  console.clear();

  lintAndBuild(config, param);

  chokidar
    .watch(config.rootFolder, {
      ignored: new RegExp(config.distFolder), // ignore the dist folder as in some cases it might be inside the root folder
      ignoreInitial: true,
    })
    .on("all", (event, changedPath) => {
      console.clear();
      lintAndBuild(config, param, path.extname(changedPath).slice(1));
    });
};
