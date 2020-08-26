/* eslint no-console: 0 */
const chalk = require("chalk");
const { spawn } = require("child_process");

/**
 * Lints all twig files in `rootFolder`, logs the result,
 * resolves with true or false based on linting result
 * or rejects if an error occured.
 *
 * @param {object} obj - the user configuration object
 * @param {string} obj.rootFolder - the root folder for linting files
 * @returns {Promise} - gets resolved with a boolean, describes if twig linting failed or not
 */
function lintTwig({ rootFolder }) {
  const args = [rootFolder];

  return new Promise((resolve) => {
    const process = spawn("./vendor/bin/twigcs", args);

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
        resolve(true);
      } else {
        console.log(`\ntwigcs: ${chalk.red("error!")}`);
        resolve(false);
      }
    });
  });
}

module.exports = {
  lint: {
    extensions: ["twig", "html.twig"],
    linter: lintTwig,
  },
};
