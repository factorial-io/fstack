/* eslint no-console: 0 */
const chalk = require("chalk");
const cypress = require("cypress");
const deepMerge = require("deepmerge");

/**
 * @param {object} config - the stack configuration
 * @param {object} extensionConfig - the extension configuration
 * @returns {Promise} gets resolved/rejected based on if the tests failed or not
 */
module.exports = function testE2E(config, extensionConfig) {
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
          extensionConfig
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
