const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const getColors = require("./strings/colors");
const getOutlines = require("./strings/outlines");
const getRadii = require("./strings/radii");
const getShadows = require("./strings/shadows");
const getSpacings = require("./strings/spacings");
const getTypography = require("./strings/typography");

/**
 * @param {string} rootFolder
 * @param {string} file
 * @param {object} styles
 * @param {Array} styles.colors
 * @param {Array} styles.outlines
 * @param {Array} styles.radii
 * @param {Array} styles.shadows
 * @param {Array} styles.spacings
 * @param {Array} styles.typography
 * @returns {Promise}
 */
module.exports = function writeFile(rootFolder, file, styles) {
  const folder = `${rootFolder}/${path.dirname(file)}`;
  const fullPath = `${folder}/${path.basename(file)}`;
  const shortPath = fullPath.replace(`${process.cwd()}/`, "");

  let string = "html {";
  if (styles.colors.length > 0) string += `\n${getColors(styles.colors)}\n`;
  if (styles.outlines.length > 0)
    string += `\n${getOutlines(styles.outlines)}\n`;
  if (styles.radii.length > 0) string += `\n${getRadii(styles.radii)}\n`;
  if (styles.shadows.length > 0) string += `\n${getShadows(styles.shadows)}\n`;
  if (styles.spacings.length > 0)
    string += `\n${getSpacings(styles.spacings)}\n`;
  if (styles.typography.length > 0)
    string += `\n${getTypography(styles.typography)}\n`;
  string += "}\n";

  try {
    fs.mkdirSync(folder, { recursive: true });

    try {
      fs.writeFileSync(fullPath, string);
      console.log(chalk.green(`\nCreated ${shortPath}!`));

      return Promise.resolve();
    } catch (e) {
      return onError(e.message, shortPath);
    }
  } catch (e) {
    return onError(e.message, shortPath);
  }
};

/**
 * @param {string} error
 * @param {string} shortPath
 * @returns {Promise}
 */
function onError(error, shortPath) {
  console.error(chalk.red(`\nCreating ${shortPath} failed!`));
  console.error(error);
  return Promise.reject();
}
