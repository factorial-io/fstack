const chalk = require("chalk");

/**
 * @param {object} obj
 * @param {object} obj.config
 * @param {string[]} [obj.types] - the types of the lint task
 * @returns {Promise} - gets resolved with a boolean, describes if linting failed or not
 */
module.exports = function lint({ config, types }) {
  console.log(chalk.magenta.bold("\nLinting files…"));

  const allTasks = [];
  const tasksToRun = [];

  // adds the extension tasks to the full list of tasks
  if (config.use) {
    config.use.forEach((ext) => {
      const extension = Array.isArray(ext) ? ext[0] : ext;
      const extensionConfig = Array.isArray(ext) ? ext[1] : {};

      if (extension.tasks && extension.tasks.lint) {
        allTasks.push({
          type: extension.type,
          extensions: extensionConfig.extensions
            ? [...extension.extensions, ...extensionConfig.extensions]
            : extension.extensions,
          task: extension.tasks.lint,
          config: extensionConfig,
        });
      }
    });
  }

  if (Array.isArray(types) && types.length > 0) {
    const tasks = allTasks.filter((t) => types.includes(t.type));

    if (tasks.length > 0) {
      tasks.forEach((task) => {
        tasksToRun.push(task.task(config, task.config, task.extensions));
      });
    } else {
      console.log("\nNo lint task found, skipping…");
      tasksToRun.push(Promise.resolve());
    }
  } else {
    console.log("\nNo lint task found, skipping…");
    tasksToRun.push(Promise.resolve());
  }

  return Promise.allSettled(tasksToRun).then((results) =>
    results.every(({ status }) => status === "fulfilled")
  );
};
