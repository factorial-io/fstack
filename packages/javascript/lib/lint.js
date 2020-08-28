/* eslint no-console: 0 */
const chalk = require("chalk");
const { spawn } = require("child_process");

const { getAdditionalParams } = require("./_helpers");

/**
 * @param {Array} use
 * @param {string} rootFolder
 * @param {string} testsFolder
 * @returns {Array}
 */
function getArgs(use, rootFolder, testsFolder) {
  const args = [
    rootFolder,
    testsFolder,
    "--color",
    "--no-error-on-unmatched-pattern",
    ...getAdditionalParams("lint"),
  ];

  use.forEach((extension) => {
    if (extension.eslint && extension.eslint.extensions) {
      extension.eslint.extensions.forEach((ext) => {
        args.push("--ext");
        args.push(`.${ext}`);
      });
    }
  });

  return args;
}

/**
 * Lints all JS files in `rootFolder`, logs the result,
 * resolves with true or false based on linting result
 * or rejects if an error occured.
 *
 * @param {object} obj
 * @param {string} obj.rootFolder
 * @param {string} obj.testsFolder
 * @param {Array} obj.use
 * @returns {Promise} - gets resolved with a boolean, describes if JS linting failed or not
 */
module.exports = function lintJS({ rootFolder, testsFolder, use }) {
  const args = getArgs(use, rootFolder, testsFolder);

  return new Promise((resolve) => {
    const process = spawn("./node_modules/.bin/eslint", args);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.log(data.toString());
    });

    process.on("error", (error) => {
      console.log(`${chalk.red("\nERROR:")} ${error.message}`);
    });

    process.on("close", (code) => {
      if (code === 0 || code === 2) {
        console.log(`\neslint: ${chalk.green("0 errors!")}`);
        resolve(true);
      } else {
        console.log(`\neslint: ${chalk.red("error!")}`);
        resolve(false);
      }
    });
  });
};
