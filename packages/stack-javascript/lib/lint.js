/* eslint no-console: 0 */
const chalk = require("chalk");
const { spawn } = require("child_process");

const {
  getAdditionalParams,
  getStagedFiles,
} = require("@factorial/stack-core/helpers");

/**
 * @param {string} rootFolder
 * @param {string} testsFolder
 * @param {Array} fileExtensions
 * @returns {Array}
 */
async function getArgs(rootFolder, testsFolder, fileExtensions) {
  const defaultParams = ["--color", "--no-error-on-unmatched-pattern"];
  const additionalParams = getAdditionalParams("lint");
  const hasStagedParam = additionalParams.includes("--staged");

  const args = [
    ...(hasStagedParam
      ? await getStagedFiles(fileExtensions)
      : [rootFolder, testsFolder]),
    ...defaultParams,
    ...(hasStagedParam
      ? additionalParams.filter((entry) => entry !== "--staged")
      : additionalParams),
  ];

  fileExtensions.forEach((extension) => {
    args.push("--ext");
    args.push(`.${extension}`);
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
 * @param {object} extensionConfig - the config passed to the extension in .factorialrc.js
 * @param {Array} fileExtensions
 * @returns {Promise} - gets resolved/rejected based on if JS linting failed or not
 */
module.exports = async function lintJS(
  { rootFolder, testsFolder },
  extensionConfig,
  fileExtensions
) {
  const args = await getArgs(rootFolder, testsFolder, fileExtensions);

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
