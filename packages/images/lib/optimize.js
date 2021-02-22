const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminWebp = require("imagemin-webp");

/**
 * @param {Array} lists
 * @returns {Array}
 */
function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

/**
 * @param {string} srcPath
 * @returns {Array}
 */
function getDirectories(srcPath) {
  return fs
    .readdirSync(srcPath)
    .map((file) => path.join(srcPath, file))
    .filter((p) => fs.statSync(p).isDirectory());
}

/**
 * @param {string} srcPath
 * @returns {Array}
 */
function getDirectoriesRecursive(srcPath) {
  return [
    srcPath,
    ...flatten(getDirectories(srcPath).map(getDirectoriesRecursive)),
  ];
}

/**
 * @param {object} obj
 * @param {Array} obj.imageFolders
 * @returns {Promise} - gets resolved/rejected based on if SVG optimization failed or not
 */
module.exports = function optimizeImages({ imageFolders }) {
  const promises = [];

  imageFolders.forEach((folder) => {
    getDirectoriesRecursive(folder).forEach((f) => {
      promises.push(
        new Promise((resolve, reject) => {
          imagemin([`${f}/*.{jpg,png}`], {
            destination: f,
            plugins: [imageminJpegtran(), imageminPngquant(), imageminWebp()],
          })
            .then(() => resolve())
            .catch(() => reject());
        })
      );
    });
  });

  return Promise.all(promises)
    .then(() => console.log(`\nimagemin: ${chalk.green("Optimization done!")}`))
    .catch(() =>
      console.log(`\nimagemin: ${chalk.red("Optimization failed!")}`)
    );
};
