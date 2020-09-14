const chalk = require("chalk");

/**
 * @param {object} obj
 * @param {object} obj.config
 * @param {string} [obj.type] - the type of the test task
 * @returns {Promise} - gets resolved with a boolean, describes if the tests failed or not
 */
module.exports = function test({ config, type }) {
  console.log(chalk.magenta.bold("\nRunning tests…"));

  const allTasks = [];
  const tasksToRun = [];

  // adds the extension tasks to the full list of tasks
  if (config.use) {
    config.use.forEach((extension) => {
      if (extension.tasks && extension.tasks.test) {
        allTasks.push({
          type: extension.type,
          extensions: extension.extensions,
          task: extension.tasks.test,
        });
      }
    });
  }

  // if a task type is passed to the tests,
  // add the corresponding task to the list of tasks to run
  if (type) {
    const task = allTasks.find((t) => t.type === type);

    if (task) {
      tasksToRun.push(task.task(config));
    } else {
      console.log("\nNo test task found, skipping…");
      tasksToRun.push(Promise.resolve());
    }
    // else simply run all tasks
  } else {
    allTasks.forEach(({ task }) => tasksToRun.push(task(config)));
  }

  return Promise.all(tasksToRun)
    .then(() => true)
    .catch(() => false);
};
