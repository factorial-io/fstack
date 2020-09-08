/* eslint no-console: 0 */
const chalk = require("chalk");

/**
 * @param {object} obj
 * @param {object} obj.config
 * @param {string} [obj.type] - the type of the lint task
 * @param {string} [obj.fileExtension] - the type of the file that has been changed
 * @returns {Promise} - gets resolved with a boolean, describes if linting failed or not
 */
module.exports = function lint({ config, type, fileExtension }) {
  console.log(chalk.magenta.bold("\nLinting files…"));

  const allTasks = [];
  const tasksToRun = [];

  // adds the extension tasks to the full list of tasks
  if (config.use) {
    config.use.forEach((extension) => {
      if (extension.tasks && extension.tasks.lint) {
        allTasks.push({
          type: extension.type,
          extensions: extension.extensions,
          task: extension.tasks.lint,
        });
      }
    });
  }

  // if a task type is passed to the linter,
  // add the corresponding task to the list of tasks to run
  if (type) {
    const task = allTasks.find((t) => t.type === type);

    if (task) {
      tasksToRun.push(task.task(config));
    }
  } else if (fileExtension) {
    const task = allTasks.find(
      (t) => t.extensions && t.extensions.includes(fileExtension)
    );

    if (task) {
      tasksToRun.push(task.task(config));
    }
  }

  // if no tasks to run have been added, simply run all tasks
  if (tasksToRun.length === 0) {
    allTasks.forEach(({ task }) => tasksToRun.push(task(config)));
  }

  return Promise.all(tasksToRun)
    .then(() => true)
    .catch(() => false);
};
