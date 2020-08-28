/* eslint no-console: 0 */
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

    if (args.includes("--only")) {
      const indexOnly = args.indexOf("--only");
      args.splice(indexOnly, 2);
    }

    return args;
  }

  return [];
}

/**
 * @param {string} rootFolder
 * @returns {Array}
 */
function getArgs(rootFolder) {
  const fileExtensions = ["css"];

  // use.forEach((extension) => {
  //   if (extension.stylelint && extension.stylelint.extensions) {
  //     extension.stylelint.extensions.forEach((ext) => {
  //       fileExtensions.push(ext);
  //     });
  //   }
  // });

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
 * @returns {Promise} - gets resolved with a boolean, describes if linting failed or not
 */
module.exports = function lintCSS({ rootFolder }) {
  const args = getArgs(rootFolder);

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
