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
 * @param {boolean} [emptyAssets]
 * @returns {Promise} - gets resolved with a boolean, describes if the build failed or not
 */
module.exports = async function build(
  { config, type, fileExtension },
  emptyAssets
) {
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
    config.use.forEach((ext) => {
      const extension = Array.isArray(ext) ? ext[0] : ext;
      const extensionConfig = Array.isArray(ext) ? ext[1] : null;

      if (extension.tasks && extension.tasks.build) {
        allTasks.push({
          type: extension.type,
          extensions: extension.extensions,
          task: extension.tasks.build,
          config: extensionConfig,
        });
      }
    });
  }

  // deleting the build folder is only necessary if the assets are created
  // with hashes. if they are not created with hashes, the files get
  // overwritten anyway.
  // `emptyAssets` would be true when starting the watch command, since there
  // might be assets with hashes in the build folder. to make sure that this
  // doesn't cause problems, we throw away all assets initially.
  if (config.addHashes || emptyAssets) {
    await cleanBuildFolder(type, fileExtension, allTasks, config.distFolder);
  }

  // if a task type is passed to the build,
  // add the corresponding task to the list of tasks to run
  if (type) {
    const task = allTasks.find((t) => t.type === type);

    if (task) {
      tasksToRun.push(task.task(config, task.config));
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
      tasksToRun.push(task.task(config, task.config));
    } else {
      console.log("\nNo build task found, skipping…");
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
