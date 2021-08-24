const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const { ImagePool } = require("@squoosh/lib");
const { getAllFilesFromFolders } = require("../../core/lib/helpers");

const imagePool = new ImagePool();

/**
 * @param {Function} resolve
 * @param {Function} reject
 * @param {string} imagePath
 * @param {string} [type]
 */
async function handleImage(resolve, reject, imagePath, type) {
  try {
    const image = await imagePool.ingestImage(imagePath);
    const squooshOptions = {};
    const defaultCodecSettings = {};

    if (type) {
      squooshOptions[type] = defaultCodecSettings;
    } else {
      squooshOptions[
        imagePath.endsWith("jpg") || imagePath.endsWith("jpeg")
          ? "mozjpeg"
          : "oxipng"
      ] = defaultCodecSettings;
    }

    await image.decoded;
    await image.encode(squooshOptions);
    Object.values(image.encodedWith).forEach(async (encodedImage) => {
      const finalImage = await encodedImage;

      fs.writeFile(
        imagePath.replace(path.extname(imagePath), `.${finalImage.extension}`),
        finalImage.binary,
        (err) => {
          if (err) {
            console.error(err);
            reject();
          } else {
            resolve();
          }
        }
      );
    });
  } catch (err) {
    console.error(err);
    reject();
  }
}

/**
 * @param {object} obj
 * @param {Array} obj.imageFolders
 * @param {string} type
 * @returns {Promise}
 */
function optimizeImages({ imageFolders }, type) {
  const promises = [];
  const images = getAllFilesFromFolders(imageFolders, ["jpg", "jpeg", "png"]);

  images.forEach((imagePath) => {
    promises.push(
      new Promise((resolve, reject) =>
        handleImage(resolve, reject, imagePath, type)
      )
    );
  });

  return Promise.all(promises)
    .then(async () => {
      console.log(
        `\nsquoosh: ${chalk.green(
          `${type ? `Creating ${type} images` : "Optimization"} done!`
        )}`
      );
    })
    .catch(() =>
      console.log(
        `\nsquoosh: ${chalk.red(
          `${type ? `Creating ${type} images` : "Optimization"} failed!`
        )}`
      )
    )
    .finally(() => {
      imagePool.close();
    });
}

module.exports = {
  optimize: (opts) => optimizeImages(opts),
  webp: (opts) => optimizeImages(opts, "webp"),
  avif: (opts) => optimizeImages(opts, "avif"),
};
