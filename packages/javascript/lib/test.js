/* eslint no-console: 0 */
const path = require("path");
const chalk = require("chalk");
const { spawn } = require("child_process");

const { getAdditionalParams } = require("./_helpers");

module.exports = function testJS({ rootFolder }) {
  let args = [
    "--config",
    path.join(__dirname, "../jest.config.js"),
    "--colors",
    "--passWithNoTests",
    "--collectCoverage",
    "true",
    "--collectCoverageFrom",
    `${rootFolder.replace(`${process.cwd()}/`, "")}/**/*.js`,
  ];

  args = [...args, ...getAdditionalParams("test")];

  return new Promise((resolve) => {
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
        resolve(true);
      } else {
        console.log(`\njest: ${chalk.red("error!")}`);
        resolve(false);
      }
    });
  });
};
