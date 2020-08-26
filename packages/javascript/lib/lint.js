/* eslint no-console: 0 */
const chalk = require("chalk");
const { spawn } = require("child_process");

const { getAdditionalParams } = require("./_helpers");

/**
 * Lints all JS files in `rootFolder`, logs the result,
 * resolves with true or false based on linting result
 * or rejects if an error occured.
 *
 * @param {object} obj - the user configuration object
 * @param {string} obj.rootFolder - the root folder for linting files
 * @param {string} obj.testsFolder - the tests folder for linting files
 * @param {Array} obj.use - the extension passed by the user
 * @returns {Promise} - gets resolved with a boolean, describes if JS linting failed or not
 */
module.exports = function lintJS({ rootFolder, testsFolder, use }) {
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
