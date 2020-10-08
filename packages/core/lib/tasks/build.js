const del = require("del");
const chalk = require("chalk");

const buildAssets = require("./build/assets");

/**
 * @param {string} type
 * @param {string} fileExtension
 * @param {Array} allTasks
 * @param {string} distFolder
 */
async function cleanBuildFolder(type, fileExtension, allTasks, distFolder) {
  if (type || fileExtension) {
    if (type) {
      const task = allTasks.find((t) => t.type === type);
      if (task && task.extensions) {
        const paths = [];

        task.extensions.forEach((extension) => {
          paths.push(`${distFolder}/**/*.${extension}`);
          paths.push(`${distFolder}/**/*.${extension}.map`);
        });
        await del(paths);
      }
    } else {
      const path = `${distFolder}/**/*.${fileExtension}`;
      await del([path, `${path}.map`]);
    }
  } else {
    await del([`${distFolder}/**/*`]);
  }
}

/**
 * @param {object} obj
 * @param {object} obj.config
 * @param {string} [obj.type] - the type of the build task
 * @param {string} [obj.fileExtension] - the type of the file that has been changed
 * @returns {Promise} - gets resolved with a boolean, describes if the build failed or not
 */
module.exports = async function build({ config, type, fileExtension }) {
  console.log(`\n${chalk.magenta.bold("Creating build")}…`);

  const tasksToRun = [];
  const allTasks = [
    {
      type: "assets",
      extensions: ["svg", "jpg", "png", "gif", "woff", "woff2", "ico"],
      task: buildAssets,
    },
  ];

  // adds the extension tasks to the full list of tasks
  if (config.use) {
    config.use.forEach((extension) => {
      if (extension.tasks && extension.tasks.build) {
        allTasks.push({
          type: extension.type,
          extensions: extension.extensions,
          task: extension.tasks.build,
        });
      }
    });
  }

  await cleanBuildFolder(type, fileExtension, allTasks, config.distFolder);

  // if a task type is passed to the build,
  // add the corresponding task to the list of tasks to run
  if (type) {
    const task = allTasks.find((t) => t.type === type);

    if (task) {
      tasksToRun.push(task.task(config));
    } else {
      console.log("\nNo build task found, skipping…");
      tasksToRun.push(Promise.resolve());
    }
    // otherwise if the build task is triggered by the watcher
    // add the task which is connected to the given file type
    // to the list of tasks to run
  } else if (fileExtension) {
    const task = allTasks.find(
      (t) => t.extensions && t.extensions.includes(fileExtension)
    );

    if (task) {
      tasksToRun.push(task.task(config));
    } else {
      console.log("\nNo build task found, skipping…");
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
