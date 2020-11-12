const chalk = require("chalk");

/**
 * @param {object} obj
 * @param {object} obj.config
 * @param {string} [obj.type] - the type of the optimization task
 * @returns {Promise} - gets resolved with a boolean, describes if the optimizations failed or not
 */
module.exports = function optimize({ config, type }) {
  console.log(chalk.magenta.bold("\nRunning optimizations…"));

  const allTasks = [];
  const tasksToRun = [];

  // adds the extension tasks to the full list of tasks
  if (config.use) {
    config.use.forEach((ext) => {
      const extension = Array.isArray(ext) ? ext[0] : ext;
      const extensionConfig = Array.isArray(ext) ? ext[1] : null;

      if (extension.tasks && extension.tasks.optimize) {
        allTasks.push({
          type: extension.type,
          extensions: extension.extensions,
          task: extension.tasks.optimize,
          config: extensionConfig,
        });
      }
    });
  }

  // if a task type is passed to the optimizations,
  // add the corresponding task to the list of tasks to run
  if (type) {
    const task = allTasks.find((t) => t.type === type);

    if (task) {
      tasksToRun.push(task.task(config.svgFolders, task.extensionConfig));
    }
  }

  // if no tasks to run have been added, simply run all tasks
  if (tasksToRun.length === 0) {
    allTasks.forEach((task) =>
      tasksToRun.push(task.task(config.svgFolders, task.extensionConfig))
    );
  }

  return Promise.all(tasksToRun)
    .then(() => true)
    .catch(() => false);
};
