const chalk = require("chalk");
const path = require("path");
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
 * @param {string} rootFolder
 * @param {Array} fileExtensions
 * @returns {Array}
 */
function getArgs(rootFolder, fileExtensions) {
  return [
    path.join(rootFolder, `**/*.(${fileExtensions.join("|")})`),
    "--color",
    "--allow-empty-input",
    ...getAdditionalParams("lint"),
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
module.exports = function lintCSS(
  { rootFolder },
  extensionConfig,
  fileExtensions
) {
  const args = getArgs(rootFolder, fileExtensions);

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
