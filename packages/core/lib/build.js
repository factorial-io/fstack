/* eslint no-console: 0 */

const del = require("del");
const chalk = require("chalk");

const buildAssets = require("./build/assets");

/**
 * Deletes the `distFolder` and builds all assets.
 *
 * @param {object} config - the configuration object
 * @param {string} [fileType] - the type of the file that has been changed
 * @returns {Promise} - Gets resolved when building is done
 */
module.exports = async function build(config, fileType) {
  console.log(`\n${chalk.magenta.bold("Creating build")}…`);

  if (process.env.NODE_ENV === "production") {
    await del([`${config.distFolder}/**/*`]);
  }

  let fileTypes;

  if (fileType) {
    fileTypes = typeof fileType === "string" ? [fileType] : fileType;
  }

  const tasks = [];

  // the internal builders included in core
  const fileTypeBuilders = [
    {
      builder: buildAssets,
    },
  ];

  // adds the extension builders to an array
  config.use.forEach((extension) => {
    if (extension.build) {
      fileTypeBuilders.push(extension.build);
    }
  });

  const builders = [];

  // if fileTypes are passed to the build,
  // add the corresponding builders to a dedicated array
  if (fileTypes) {
    fileTypes.forEach((type) => {
      const builder = fileTypeBuilders.find(({ extensions }) =>
        extensions.includes(type)
      );

      if (builder) {
        builders.push(builder);
      }
    });
  }

  // if fileTypes are passed to the build,
  // run only the builders for these file types
  if (builders.length > 0) {
    builders.forEach((builder) => {
      tasks.push(builder.builder(config));
    });
    // otherwise run all linters
  } else {
    fileTypeBuilders.forEach(({ builder }) => tasks.push(builder(config)));
  }

  return Promise.all(tasks)
    .then((res) => !res.includes(false))
    .catch(() => {
      return false;
    });
};
