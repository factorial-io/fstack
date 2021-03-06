/**
 * @param {object} config
 * @param {string} command
 * @param {string} type
 * @returns {Promise} gets resolved with a boolean based on if running the tasks failed or not
 */
module.exports = function custom(config, command, type) {
  const tasksToRun = [];

  config.use.forEach((ext) => {
    const extension = Array.isArray(ext) ? ext[0] : ext;

    if (extension.tasks[command]) {
      tasksToRun.push(extension.tasks[command](config, type));
    }
  });

  return Promise.all(tasksToRun)
    .then(() => true)
    .catch(() => false);
};
