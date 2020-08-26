/* eslint no-console: 0 */
const chalk = require("chalk");
const path = require("path");
const { spawn } = require("child_process");

/**
 * @param {string} command
 * @returns {Array}
 */
function getAdditionalParams(command) {
  const index = process.argv.indexOf(command);

  if (index >= 0) {
    return process.argv.slice(index + 1);
  }

  return [];
}

/**
 * Lints all CSS files in `rootFolder`, logs the result,
 * resolves with true or false based on linting result
 * or rejects if an error occured.
 *
 * @param {object} obj - the user configuration object
 * @param {string} obj.rootFolder - the root folder for linting files
 * @param {Array} obj.use - the extension passed by the user
 * @returns {Promise} - gets resolved with a boolean, describes CSS JS linting failed or not
 */
module.exports = function lintCSS({ rootFolder, use }) {
  const fileExtensions = ["css"];

  use.forEach((extension) => {
    if (extension.stylelint && extension.stylelint.extensions) {
      extension.stylelint.extensions.forEach((ext) => {
        fileExtensions.push(ext);
      });
    }
  });

  const args = [
    path.join(rootFolder, `**/*.(${fileExtensions.join("|")})`),
    "--color",
    "--allow-empty-input",
    ...getAdditionalParams("lint"),
  ];

  return new Promise((resolve) => {
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
        resolve(true);
      } else {
        console.log(`\nstylelint: ${chalk.red("error!")}`);
        resolve(false);
      }
    });
  });
};
