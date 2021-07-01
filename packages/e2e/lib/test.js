/* eslint no-console: 0 */
const chalk = require("chalk");
const cypress = require("cypress");
const deepMerge = require("deepmerge");
const path = require("path");

let userConfig;

try {
  userConfig = require(path.join(process.cwd(), "cypress.json")); // eslint-disable-line
} catch (e) {
  userConfig = {};
}

/**
 * @returns {Promise} gets resolved/rejected based on if the tests failed or not
 */
module.exports = function testE2E() {
  return new Promise((resolve, reject) => {
    cypress
      .run(
        deepMerge(
          {
            configFile: false,
            exit: true,
            headless: true,
            quiet: true,
          },
          userConfig
        )
      )
      .then(({ totalFailed }) => {
        if (totalFailed > 0) {
          console.log(`\ncypress: ${chalk.red("error!")}`);
          reject();
        } else {
          console.log(`\ncypress: ${chalk.green("0 errors!")}`);
          resolve();
        }
      })
      .catch((err) => {
        console.log(`${chalk.red("ERROR:")} ${err}`);
        reject();
      });
  });
};
