const chalk = require("chalk");
const getFiles = require("glob");
const { HtmlValidate, Reporter, formatterFactory } = require("html-validate");

/**
 * Lints all html files based on the given glob, logs the result,
 * resolves with true or false based on linting result
 * or rejects if an error occured.
 *
 * @param {object} config
 * @param {string} config.rootFolder
 * @param {object} obj
 * @param {string} [obj.files]
 * @returns {Promise} - gets resolved/rejected based on if html linting failed or not
 */
module.exports = function lint({ rootFolder }, { files }) {
  const htmlvalidate = new HtmlValidate();
  const glob = files || `${rootFolder}/**/*.html`;

  return new Promise((resolve, reject) => {
    getFiles(glob, {}, (err, results) => {
      if (err) {
        console.error(err);
        console.log(`\nhtml-validate: ${chalk.red("error!")}`);
        reject();
      } else {
        const reports = [];

        results.forEach((file) => {
          reports.push(htmlvalidate.validateFile(file));
        });

        const merged = Reporter.merge(reports);

        if (merged.valid) {
          console.log(`\nhtml-validate: ${chalk.green("0 errors!")}`);
          resolve();
        } else {
          console.log(formatterFactory("stylish")(merged.results));
          console.log(`\nhtml-validate: ${chalk.red("error!")}`);
          reject();
        }
      }
    });
  });
};
