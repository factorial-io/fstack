const chalk = require("chalk");
const { spawn } = require("child_process");

const {
  getAdditionalParams,
  getStagedFiles,
} = require("@factorial/stack-core/helpers");

/**
 * Returns an array with all cli params after "lint --only twig"
 *
 * @param {string} rootFolder
 * @returns {Array}
 */
async function getArgs(rootFolder) {
  const defaultParams = [
    "--severity",
    "error",
    "--ruleset",
    "Factorial\\twigcs\\TwigCsRuleset",
  ];
  const additionalParams = getAdditionalParams("lint");
  const hasStagedParam = additionalParams.includes("--staged");
  const directories = hasStagedParam
    ? await getStagedFiles(["twig"])
    : [rootFolder];

  if (directories.length === 0) {
    return null;
  }

  return [
    ...directories,
    ...defaultParams,
    ...(hasStagedParam
      ? additionalParams.filter((entry) => entry !== "--staged")
      : additionalParams),
  ];
}

/**
 * Lints all twig files in `rootFolder`, logs the result,
 * resolves with true or false based on linting result
 * or rejects if an error occured.
 *
 * @param {object} obj
 * @param {string} obj.rootFolder
 * @param {object} config
 * @returns {Promise} - gets resolved/rejected based on if twig linting failed or not
 */
module.exports = async function lint({ rootFolder }, config) {
  const args = await getArgs(config?.folder || rootFolder);

  if (!args) {
    console.log(`\ntwigcs: ${chalk.green("0 errors!")}`);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const process = spawn(
      config && config.executable ? config.executable : "./vendor/bin/twigcs",
      args
    );

    process.stdout.on("data", (data) => {
      const str = data.toString();

      if (str !== "No violation found.\n") {
        console.log(`\n${str}`);
      }
    });

    process.stderr.on("data", (data) => {
      console.log(`\n${data}`);
    });

    process.on("error", (error) => {
      console.log(`${chalk.red("ERROR:")} ${error.message}`);
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(`\ntwigcs: ${chalk.green("0 errors!")}`);
        resolve();
      } else {
        console.log(`\ntwigcs: ${chalk.red("error!")}`);
        reject();
      }
    });
  });
};
