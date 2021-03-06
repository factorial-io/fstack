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
    config.use.forEach((ext) => {
      const extension = Array.isArray(ext) ? ext[0] : ext;
      const extensionConfig = Array.isArray(ext) ? ext[1] : null;

      if (extension.tasks && extension.tasks.lint) {
        allTasks.push({
          type: extension.type,
          extensions: extension.extensions,
          task: extension.tasks.lint,
          config: extensionConfig,
        });
      }
    });
  }

  // if a task type is passed to the linter,
  // add the corresponding task to the list of tasks to run
  if (type) {
    const task = allTasks.find((t) => t.type === type);

    if (task) {
      tasksToRun.push(task.task(config, task.config));
    } else {
      console.log("\nNo lint task found, skipping…");
      tasksToRun.push(Promise.resolve());
    }
  } else if (fileExtension) {
    const task = allTasks.find(
      (t) => t.extensions && t.extensions.includes(fileExtension)
    );

    if (task) {
      tasksToRun.push(task.task(config, task.config));
    } else {
      console.log("\nNo lint task found, skipping…");
      tasksToRun.push(Promise.resolve());
    }
    // else simply run all tasks
  } else {
    allTasks.forEach((task) => tasksToRun.push(task.task(config, task.config)));
  }

  return Promise.all(tasksToRun)
    .then(() => true)
    .catch(() => false);
};
