/* eslint no-console: 0 */
const chalk = require("chalk");

/**
 * Invokes all linting functions.
 *
 * @param {object} config - the user configuration object
 * @param {string|string[]} [fileType] - the type of the file that has been changed
 * @returns {Promise} - gets resolved with a boolean, describes if linting failed or not
 */
module.exports = function lint(config, fileType) {
  console.log(chalk.magenta.bold("\nLinting files…"));

  let fileTypes;

  if (fileType) {
    fileTypes = typeof fileType === "string" ? [fileType] : fileType;
  }

  const tasks = [];

  // the internal linters included in core
  const fileTypeLinters = [];

  // adds the extension linters to the internal linters
  config.use.forEach((extension) => {
    if (extension.lint) {
      fileTypeLinters.push(extension.lint);
    }
  });

  const linters = [];

  // if fileTypes are passed to the linting,
  // add the corresponding linters to a dedicated array
  if (fileTypes) {
    fileTypes.forEach((type) => {
      const linter = fileTypeLinters.find(({ extensions }) =>
        extensions.includes(type)
      );

      if (linter) {
        linters.push(linter);
      }
    });
  }

  // if fileTypes are passed to the linting,
  // run only the linters for these file types
  if (linters.length > 0) {
    linters.forEach((linter) => {
      tasks.push(linter.linter(config));
    });
    // otherwise run all linters
  } else {
    fileTypeLinters.forEach(({ linter }) => tasks.push(linter(config)));
  }

  return Promise.all(tasks)
    .then((res) => !res.includes(false))
    .catch(() => {
      return false;
    });
};
