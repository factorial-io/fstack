const chalk = require("chalk");

/**
 * @param {object} obj
 * @param {object} obj.config
 * @param {string[]} [obj.types] - the types of the test task
 * @returns {Promise} - gets resolved with a boolean, describes if the tests failed or not
 */
module.exports = function test({ config, types }) {
  console.log(chalk.magenta.bold("\nRunning tests…"));

  const allTasks = [];
  const tasksToRun = [];

  // adds the extension tasks to the full list of tasks
  if (config.use) {
    config.use.forEach((ext) => {
      const extension = Array.isArray(ext) ? ext[0] : ext;
      const extensionConfig = Array.isArray(ext) ? ext[1] : null;

      if (extension.tasks && extension.tasks.test) {
        allTasks.push({
          type: extension.type,
          extensions: extension.extensions,
          task: extension.tasks.test,
          config: extensionConfig,
        });
      }
    });
  }

  // if a task type is passed to the tests,
  // add the corresponding task to the list of tasks to run
  if (Array.isArray(types) && types.length > 0) {
    const tasks = allTasks.filter((t) => types.includes(t.type));

    if (tasks.length > 0) {
      tasks.forEach((task) => {
        tasksToRun.push(task.task(config, task.extensionConfig));
      });
    } else {
      console.log("\nNo test task found, skipping…");
      tasksToRun.push(Promise.resolve());
    }
    // else simply run all tasks
  } else {
    allTasks.forEach((task) =>
      tasksToRun.push(task.task(config, task.extensionConfig))
    );
  }

  return Promise.all(tasksToRun)
    .then(() => true)
    .catch(() => false);
};
