/* eslint no-console: 0 */
const chalk = require("chalk");

/**
 * Invokes all test functions.
 *
 * @param {object} config - the user configuration object
 * @param {string|string[]} [fileType] - the type of the file that has been changed
 * @returns {Promise} - gets resolved with a boolean, describes if tests failed or not
 */
module.exports = function test(config, fileType) {
  console.log(chalk.magenta.bold("\nRunning tests…"));

  let fileTypes;

  if (fileType) {
    fileTypes = typeof fileType === "string" ? [fileType] : fileType;
  }

  const tasks = [];

  // the internal tests included in core
  const fileTypeTests = [];

  // adds the extension tests to the internal tests
  config.use.forEach((extension) => {
    if (extension.test) {
      fileTypeTests.push(extension.test);
    }
  });

  const testers = [];

  // if fileTypes are passed to the tests,
  // add the corresponding tests to a dedicated array
  if (fileTypes) {
    fileTypes.forEach((type) => {
      const tester = fileTypeTests.find(({ extensions }) =>
        extensions.includes(type)
      );

      if (tester) {
        testers.push(tester);
      }
    });
  }

  // if fileTypes are passed to the tests,
  // run only the tests for these file types
  if (testers.length > 0) {
    testers.forEach((tester) => {
      tasks.push(tester.tester(config));
    });
    // otherwise run all tests
  } else {
    fileTypeTests.forEach(({ tester }) => tasks.push(tester(config)));
  }

  return Promise.all(tasks)
    .then((res) => !res.includes(false))
    .catch(() => {
      return false;
    });
};
