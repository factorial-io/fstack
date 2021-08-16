const chalk = require("chalk");
const { spawn } = require("child_process");

/**
 * @param {string} command
 * @returns {Array}
 */
function getAdditionalParams(command) {
  const indexCommand = process.argv.indexOf(command);

  if (indexCommand >= 0) {
    const args = process.argv.slice(indexCommand + 1);
    const indexOfOnly = args.indexOf("--only");
    const indexOfSkip = args.indexOf("--skip");

    if (indexOfOnly >= 0 || indexOfSkip >= 0) {
      const index = indexOfOnly >= 0 ? indexOfOnly : indexOfSkip;

      args.splice(index, 2);
    }

    return args;
  }

  return [];
}

/**
 * Returns an array with all cli params after "lint --only twig"
 *
 * @param {string} rootFolder
 * @returns {Array}
 */
function getArgs(rootFolder) {
  const args = [
    "--severity",
    "error",
    "--ruleset",
    "Factorial\\twigcs\\TwigCsRuleset",
    ...getAdditionalParams("lint"),
  ];

  return args ? [rootFolder, ...args] : [rootFolder];
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
module.exports = function lint({ rootFolder }, config) {
  const args = getArgs(config?.folder || rootFolder);

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
