const browserslist = require("browserslist");
const chalk = require("chalk");
const caniuse = require("caniuse-api");
const fs = require("fs");
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
 * @param {boolean} obj.addHashes
 * @returns {Promise} - Gets resolved when building is done
 */
module.exports = function buildCSS({
  cssFiles,
  distFolder,
  targets,
  addHashes,
}) {
  if (cssFiles.length > 0) {
    const plugins = [
      postcssImport(),
      postcssUrl({ url: "copy" }),
      postcssColorFunction(),
      postcssCustomMedia(),
      postcssAutoprefixer({
        overrideBrowserslist: targets.browsers || targets.browserslist,
      }),
    ];
    const promises = [];
    const customPropertiesSupported = caniuse.isSupported(
      "css-variables",
      browserslist(targets.browsers || targets.browserslist || null)
    );

    if (!customPropertiesSupported) {
      plugins.push(postcssCustomProperties());
    }

    if (process.env.NODE_ENV === "production") {
      plugins.push(cssnano);
    }

    cssFiles.forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          const fullPath = path.join(process.cwd(), file);
          const basename = path.basename(file);
          const hash = Date.now().toString();
          const fileName = addHashes
            ? path.join(
                distFolder,
                `${path.basename(
                  file,
                  path.extname(file)
                )}.${hash}${path.extname(file)}`
              )
            : path.join(distFolder, basename);

          fs.readFile(fullPath, (err, css) => {
            postcss(plugins)
              .process(css, {
                from: fullPath,
                to: fileName,
                map: {
                  inline: false,
                },
              })
              .then((result) => {
                const proms = [];

                proms.push(
                  new Promise((res) => {
                    fs.writeFile(fileName, result.css, () => res());
                  })
                );

                if (result.map) {
                  proms.push(
                    new Promise((res) => {
                      fs.writeFile(
                        `${fileName}.map`,
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
