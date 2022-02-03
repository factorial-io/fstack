const chalk = require("chalk");
const deepMerge = require("deepmerge");
const getRevisionHash = require("rev-hash");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const postcss = require("postcss");

const postcssPlugins = {
  /* eslint-disable global-require */
  cssnano: require("cssnano"),
  "postcss-preset-env": require("postcss-preset-env"),
  "postcss-import": require("postcss-import"),
  "postcss-url": require("postcss-url"),
  "postcss-combine-media-query": require("postcss-combine-media-query"),
  /* eslint-enable global-require */
};

/**
 * Compiles the CSS entry files with PostCSS
 * and saves the output files in `distFolder`.
 *
 * @param {object} obj
 * @param {string} obj.rootFolder
 * @param {Array} obj.cssFiles
 * @param {string} obj.distFolder
 * @param {object} obj.targets
 * @param {boolean} obj.addHashes
 * @param {object} [userConfig]
 * @returns {Promise} - Gets resolved when building is done
 */
module.exports = function buildCSS(
  { rootFolder, cssFiles, distFolder, targets, addHashes },
  userConfig
) {
  const config = deepMerge(
    {
      plugins: {
        "postcss-url": {
          url: "copy",
        },
        "postcss-preset-env": {
          stage: 1,
          features: {
            "custom-properties": null,
          },
          browsers: targets.browsers || targets.browserslist,
        },
      },
    },
    userConfig || {}
  );

  if (cssFiles.length > 0) {
    const plugins = [
      postcssPlugins["postcss-import"](config.plugins["postcss-import"]),
      postcssPlugins["postcss-url"](config.plugins["postcss-url"]),
      postcssPlugins["postcss-preset-env"](
        config.plugins["postcss-preset-env"]
      ),
      postcssPlugins["postcss-combine-media-query"](
        config.plugins["postcss-combine-media-query"]
      ),
    ];

    const pluginNames = Object.keys(postcssPlugins);

    Object.keys(config.plugins)
      .filter((plugin) => !pluginNames.includes(plugin))
      .forEach((plugin) => {
        /* eslint-disable-next-line import/no-dynamic-require, global-require */
        plugins.push(require(plugin)(config.plugins[plugin]));
      });

    const promises = [];

    if (process.env.NODE_ENV === "production") {
      plugins.push(postcssPlugins.cssnano(config.plugins.cssnano));
    }

    cssFiles.forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          const folderRelativeFromRootFolder = path.dirname(
            file.replace(
              path.join(
                rootFolder.replace(path.join(process.cwd(), "/"), ""),
                "/"
              ),
              ""
            )
          );
          const fullPath = path.join(process.cwd(), file);
          const basename = path.basename(file);
          const fileName = addHashes
            ? path.join(
                distFolder,
                folderRelativeFromRootFolder,
                `${path.basename(
                  file,
                  path.extname(file)
                )}.hash-[hash]${path.extname(file)}`
              )
            : path.join(distFolder, folderRelativeFromRootFolder, basename);

          fs.readFile(fullPath, (err, css) => {
            const hash = getRevisionHash(css);

            postcss(plugins)
              .process(css, {
                from: fullPath,
                to: fileName.replace("[hash]", hash),
                map: {
                  inline: false,
                },
              })
              .then((result) => {
                const proms = [];
                const dirName = path
                  .dirname(fileName)
                  .replace(`${process.cwd()}/`, "");

                proms.push(
                  new Promise((res, rej) => {
                    mkdirp(dirName)
                      .then(() => {
                        fs.writeFile(
                          fileName.replace("[hash]", hash),
                          result.css,
                          () => res()
                        );
                      })
                      .catch(() => rej());
                  })
                );

                if (result.map) {
                  proms.push(
                    new Promise((res, rej) => {
                      mkdirp(dirName)
                        .then(() => {
                          fs.writeFile(
                            `${fileName.replace("[hash]", hash)}.map`,
                            JSON.stringify(result.map),
                            () => res()
                          );
                        })
                        .catch(() => rej());
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
        return Promise.resolve();
      })
      .catch(() => {
        console.log(`\nCSS: ${chalk.red("Failed!")}`);
        return Promise.reject();
      });
  }

  console.log(`\nCSS: ${chalk.yellow("No files found.")}`);
  return Promise.resolve();
};
