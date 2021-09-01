/* eslint no-console: 0 */
const chalk = require("chalk");
const { spawn } = require("child_process");

const { getAdditionalParams } = require("./_helpers");

/**
 * @param {Array} use
 * @param {string} rootFolder
 * @param {string} testsFolder
 * @param {Array} types
 * @returns {Array}
 */
function getArgs(use, rootFolder, testsFolder, types) {
  const args = [
    rootFolder,
    testsFolder,
    "--color",
    "--no-error-on-unmatched-pattern",
    ...getAdditionalParams("lint"),
  ];

  use.forEach((pkg) => {
    const exportedPackage = Array.isArray(pkg) ? [pkg] : pkg;

    if (types.includes(exportedPackage.type) && exportedPackage.extensions) {
      exportedPackage.extensions.forEach((extension) => {
        args.push("--ext");
        args.push(`.${extension}`);
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
 * @param {object} extensionConfig - the config passed to the extension in .factorialrc.js
 * @param {object} types
 * @returns {Promise} - gets resolved/rejected based on if JS linting failed or not
 */
module.exports = function lintJS(
  { rootFolder, testsFolder, use },
  extensionConfig,
  types
) {
  const args = getArgs(use, rootFolder, testsFolder, types);

  return new Promise((resolve, reject) => {
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
        resolve();
      } else {
        console.log(`\neslint: ${chalk.red("error!")}`);
        reject();
      }
    });
  });
};
