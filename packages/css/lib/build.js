/* eslint no-console: 0 */

const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const postcss = require("postcss");
const postcssAutoprefixer = require("autoprefixer");
const postcssColorFunction = require("postcss-color-function");
const postcssCustomMedia = require("postcss-custom-media");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
const postcssUrl = require("postcss-url");
const cssnano = require("cssnano");

/**
 * Compiles the CSS entry files with PostCSS
 * and saves the output files in `distFolder`.
 *
 * @param {object} obj
 * @param {Array} obj.cssFiles
 * @param {string} obj.distFolder
 * @param {object} obj.targets
 * @returns {Promise} - Gets resolved when building is done
 */
module.exports = function buildCSS({ cssFiles, distFolder, targets }) {
  if (cssFiles.length > 0) {
    const plugins = [
      postcssImport(),
      postcssUrl({ url: "copy" }),
      postcssCustomProperties(),
      postcssColorFunction(),
      postcssCustomMedia(),
      postcssAutoprefixer({ overrideBrowserslist: targets.browsers }),
    ];
    const promises = [];

    if (process.env.NODE_ENV === "production") {
      plugins.push(cssnano);
    }

    cssFiles.forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          const fullPath = path.join(process.cwd(), file);
          const basename = path.basename(file);

          fs.readFile(fullPath, (err, css) => {
            postcss(plugins)
              .process(css, {
                from: fullPath,
                to: path.join(distFolder, basename),
                map: {
                  inline: false,
                },
              })
              .then((result) => {
                const proms = [];

                proms.push(
                  new Promise((res) => {
                    fs.writeFile(
                      path.join(distFolder, basename),
                      result.css,
                      () => res()
                    );
                  })
                );

                if (result.map) {
                  proms.push(
                    new Promise((res) => {
                      fs.writeFile(
                        path.join(distFolder, `${basename}.map`),
                        JSON.stringify(result.map),
                        () => res()
                      );
                    })
                  );
                }

                Promise.all(proms)
                  .then(() => resolve())
                  .catch(() => reject());
              })
              .catch((error) => {
                console.log(chalk.bold("\nCSS:"));
                console.log(`\n${error}`);
                reject();
              });
          });
        })
      );
    });

    return Promise.all(promises)
      .then(() => {
        console.log(`\nCSS: ${chalk.green("Done!")}`);
      })
      .catch(() => {
        console.log(`\nCSS: ${chalk.red("Failed!")}`);
      });
  }

  console.log(`\nCSS: ${chalk.yellow("No files found.")}`);
  return Promise.resolve();
};
