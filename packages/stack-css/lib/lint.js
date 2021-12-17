const chalk = require("chalk");
const path = require("path");
const { spawn } = require("child_process");

const {
  getAdditionalParams,
  getStagedFiles,
} = require("@factorial/stack-core/helpers");

/**
 * @param {string} rootFolder
 * @param {Array} fileExtensions
 * @returns {Array}
 */
async function getArgs(rootFolder, fileExtensions) {
  const defaultParams = ["--color", "--allow-empty-input"];
  const additionalParams = getAdditionalParams("lint");
  const hasStagedParam = additionalParams.includes("--staged");
  const directories = hasStagedParam
    ? await getStagedFiles(fileExtensions)
    : [path.join(rootFolder, `**/*.(${fileExtensions.join("|")})`)];

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
 * Lints all CSS files in `rootFolder`, logs the result,
 * resolves with true or false based on linting result
 * or rejects if an error occured.
 *
 * @param {object} obj
 * @param {string} obj.rootFolder
 * @param {object} extensionConfig - the config passed to the extension in .factorialrc.js
 * @param {Array} fileExtensions
 * @returns {Promise} - gets resolved/rejected based on if linting failed or not
 */
module.exports = async function lintCSS(
  { rootFolder },
  extensionConfig,
  fileExtensions
) {
  const args = await getArgs(rootFolder, fileExtensions);

  if (!args) {
    console.log(`\nstylelint: ${chalk.green("0 errors!")}`);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const process = spawn("./node_modules/.bin/stylelint", args);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.log(`\n${data}`);
    });

    process.on("error", (error) => {
      console.log(`${chalk.red("ERROR:")} ${error.message}`);
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(`\nstylelint: ${chalk.green("0 errors!")}`);
        resolve();
      } else {
        console.log(`\nstylelint: ${chalk.red("error!")}`);
        reject();
      }
    });
  });
};
