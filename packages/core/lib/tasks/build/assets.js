/* eslint no-console: 0 */
const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");

/**
 * Copies all files from `assetFolders` to `distFolder`
 *
 * @param {object} obj
 * @param {string} obj.rootFolder
 * @param {Array} obj.assetFolders
 * @param {string} obj.distFolder
 * @returns {Promise} - Gets resolved when building is done
 */
module.exports = function buildAssets({
  rootFolder,
  assetFolders,
  distFolder,
}) {
  if (assetFolders.length > 0) {
    const promises = [];

    assetFolders.forEach(function copyAsset(asset) {
      promises.push(
        new Promise((resolve, reject) => {
          fs.copy(
            asset,
            path.join(distFolder, asset.replace(rootFolder, "")),
            (err) => {
              if (err && err.code === "ENOENT") {
                console.log(chalk.bold("\nassets:"));
                console.log(`${chalk.red("ERROR:")} ${err.message}`);
                reject();
              } else {
                resolve();
              }
            }
          );
        })
      );
    });

    return Promise.all(promises)
      .then(() => console.log(`\nAssets: ${chalk.green("Done!")}`))
      .catch(() => console.log(`\nAssets: ${chalk.red("Failed!")}`));
  }

  console.log(`\nAssets: ${chalk.yellow("No files found.")}`);
  return Promise.resolve();
};
