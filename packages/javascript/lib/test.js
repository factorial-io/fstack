/* eslint no-console: 0 */
const path = require("path");
const chalk = require("chalk");
const { spawn } = require("child_process");

const { getAdditionalParams } = require("./_helpers");

/**
 * @param {string} rootFolder
 * @returns {Array}
 */
function getArgs(rootFolder) {
  const args = [
    "--config",
    path.join(__dirname, "../jest.config.js"),
    "--colors",
    "--passWithNoTests",
    "--collectCoverage",
    "true",
    "--collectCoverageFrom",
    `${rootFolder.replace(`${process.cwd()}/`, "")}/**/*.js`,
  ];

  return [...args, ...getAdditionalParams("test")];
}

/**
 * @param {object} obj
 * @param {string} obj.rootFolder
 * @returns {Promise} gets resolved/rejected based on if the tests failed or not
 */
module.exports = function testJS({ rootFolder }) {
  const args = getArgs(rootFolder);

  return new Promise((resolve, reject) => {
    const process = spawn("./node_modules/.bin/jest", args);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.log(data.toString());
    });

    process.on("error", (error) => {
      console.log(`${chalk.red("ERROR:")} ${error.message}`);
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(`\njest: ${chalk.green("0 errors!")}`);
        resolve();
      } else {
        console.log(`\njest: ${chalk.red("error!")}`);
        reject();
      }
    });
  });
};
