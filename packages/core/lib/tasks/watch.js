const chalk = require("chalk");
const chokidar = require("chokidar");
const path = require("path");
const { exec } = require("child_process");

const lint = require("./lint");
const build = require("./build");

let inProgress = false;

/**
 * @param {object} obj
 * @param {object} obj.config
 * @param {string} obj.param - the param passed via cli
 * @param {string} obj.fileExtension - the type of the file that has been changed
 * @param {string} obj.afterBuildCmd
 * @param {boolean} [emptyAssets]
 */
async function lintAndBuild(
  { config, param, fileExtension, afterBuildCmd },
  emptyAssets
) {
  if (!inProgress) {
    inProgress = true;

    if (param === "--build") {
      await build({ config, fileExtension }, emptyAssets);
      await executeAfterBuild(afterBuildCmd);
    }

    await lint({ config });

    inProgress = false;
  }
}

/**
 * In a shell script needs to be executed after a build has been created,
 * this can be set in the config via `afterBuild`
 *
 * @param {string} cmd
 * @returns {Promise} gets resolved when the command has been executed
 */
function executeAfterBuild(cmd) {
  if (!cmd) return Promise.resolve();

  return new Promise((resolve) => {
    console.log(`\n${chalk.magenta.bold("Executing after build command")}…`);
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
      }

      if (stderr) {
        console.error(stderr);
      }

      resolve();
    });
  });
}

/**
 * Get all afterBuild arguments and return them as a joined string
 *
 * @param {Array} args
 * @returns {string|null}
 */
function getAfterBuildCommand(args) {
  const indexOfAfterBuildParam = args.indexOf("--afterBuild");

  if (indexOfAfterBuildParam === -1) return null;

  const argsWithoutAfterBuildParam = args.slice(indexOfAfterBuildParam + 1);

  const indexOfNextParam = argsWithoutAfterBuildParam.indexOf(
    argsWithoutAfterBuildParam.find((item) => item.startsWith("-"))
  );

  return indexOfNextParam === -1
    ? argsWithoutAfterBuildParam.join(" ")
    : argsWithoutAfterBuildParam.slice(0, indexOfNextParam).join(" ");
}

/**
 * Watches all assets defined in the configuration file,
 * lints them and builds them if `--build` is passed via CLI.
 *
 * @param {object} config
 */
module.exports = async function watch(config) {
  console.clear();

  const args = process.argv.slice(2);
  const param = args[1];
  const afterBuildCmd = getAfterBuildCommand(args);

  await lintAndBuild({ config, param, afterBuildCmd }, true);

  chokidar
    .watch(config.rootFolder, {
      ignored: new RegExp(config.distFolder), // ignore the dist folder as in some cases it might be inside the root folder
      ignoreInitial: true,
    })
    .on("all", (event, changedPath) => {
      console.clear();
      lintAndBuild({
        config,
        param,
        afterBuildCmd,
        fileExtension: path.extname(changedPath).slice(1),
      });
    });
};
