const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

module.exports = {
  getAllFilesFromFolders(rootFolders, fileExtensions) {
    const files = [];
    const extensions = fileExtensions.map((ext) => `.${ext}`);

    rootFolders.forEach((rootFolder) => {
      const subFolders = getDirectoriesRecursive(rootFolder);

      if (Array.isArray(subFolders)) {
        subFolders.forEach(async (subFolder) => {
          fs.readdirSync(subFolder).forEach((file) => {
            if (extensions.includes(path.extname(file))) {
              files.push(path.join(subFolder, file));
            }
          });
        });
      }
    });

    return files;
  },
};

/**
 * @param {Array} lists
 * @returns {Array}
 */
function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

/**
 * @param {string} srcPath
 * @returns {Array|null}
 */
function getDirectories(srcPath) {
  try {
    return fs
      .readdirSync(srcPath)
      .map((file) => path.join(srcPath, file))
      .filter((p) => fs.statSync(p).isDirectory());
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn(
        `\n${chalk.yellow.bold("Warn:")} Couldn't find directory ${err.path}.`
      );
    } else {
      console.error(err);
    }

    return null;
  }
}

/**
 * @param {string} srcPath
 * @returns {Array}
 */
function getDirectoriesRecursive(srcPath) {
  const dirs = getDirectories(srcPath);

  if (Array.isArray(dirs)) {
    return [srcPath, ...flatten(dirs.map(getDirectoriesRecursive))];
  }

  return null;
}
