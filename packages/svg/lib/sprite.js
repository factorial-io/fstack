const chalk = require("chalk");
const path = require("path");
const { spawn } = require("child_process");

/**
 * @param {object} obj
 * @param {Array} obj.svgFolders
 * @returns {Promise} - gets resolved/rejected based on if SVG optimization failed or not
 */
module.exports = function createSprite({ svgFolders }) {
  const folderIndex = process.argv.indexOf("--folder");
  let folders;

  if (folderIndex >= 0) {
    folders = [process.argv[folderIndex + 1]];
  } else {
    folders = svgFolders;
  }

  console.log(
    `\n${chalk.magenta.bold(
      `Creating SVG ${folders.length === 1 ? "sprite" : "sprites"}`
    )}…`
  );

  if (folders.length > 0) {
    const promises = [];

    folders.forEach((folder) => {
      promises.push(
        new Promise((resolve, reject) => {
          const p = spawn("./node_modules/.bin/svg-sprite", [
            "-s",
            "--symbol-dest",
            path.dirname(folder),
            "--symbol-sprite",
            `${path.basename(folder)}.sprite.svg`,
            "--symbol-render-css",
            "--symbol-render-css-template",
            path.join(__dirname, ".svg-sprite.css"),
            "--symbol-render-css-dest",
            `${path.basename(folder)}.sprite.css`,
            "--symbol-prefix",
            ".Svg--%s",
            "--symbol-dimensions",
            "%s",
            `${folder}/*.svg`,
          ]);

          p.stdout.on("data", (data) => {
            console.log(data.toString());
          });

          p.stderr.on("data", (data) => {
            console.log(data.toString());
          });

          p.on("error", (error) => {
            console.log(`${chalk.red("\nERROR:")} ${error.message}`);
          });

          p.on("close", (code) => {
            if (code === 1) {
              reject();
            } else {
              resolve();
            }
          });
        })
      );
    });

    return Promise.all(promises)
      .then(() => {
        console.log(chalk.green("\nDone!"));
      })
      .catch(() => {
        console.log(chalk.red("\nFailed!"));
      });
  }

  console.log(`\nSVG: ${chalk.yellow("No files found.")}`);
  return Promise.resolve();
};
