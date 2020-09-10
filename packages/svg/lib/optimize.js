const chalk = require("chalk");
const { spawn } = require("child_process");

/**
 * @param {Array} svgFolders
 * @returns {Promise} - gets resolved/rejected based on if SVG optimization failed or not
 */
module.exports = function optimizeSvg(svgFolders) {
  return new Promise((resolve, reject) => {
    const args = [];

    svgFolders.forEach((folder) => {
      args.push(folder);
    });

    const p = spawn("./node_modules/.bin/svgo", args);

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
        console.log(`\nsvgo: ${chalk.red("Optimization failed!")}`);
        reject();
      } else {
        console.log(`\nsvgo: ${chalk.green("Optimization done!")}`);
        resolve();
      }
    });
  });
};
