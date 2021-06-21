/**
 * @param {object} config
 * @param {string} command
 * @param {string[]} types
 * @returns {Promise} gets resolved with a boolean based on if running the tasks failed or not
 */
module.exports = function custom(config, command, types) {
  const tasksToRun = [];

  config.use.forEach((ext) => {
    const extension = Array.isArray(ext) ? ext[0] : ext;

    if (extension.tasks[command]) {
      types.forEach((type) => {
        tasksToRun.push(extension.tasks[command](config, type));
      });
    }
  });

  return Promise.all(tasksToRun)
    .then(() => true)
    .catch(() => false);
};
