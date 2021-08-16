const path = require("path");

const lint = require("./lib/lint");

const htmlValidateConfig = require(path.join(__dirname, ".htmlvalidate.json")); // eslint-disable-line

module.exports = {
  htmlValidate: htmlValidateConfig,
  type: "html",
  extensions: ["html"],
  tasks: {
    lint,
  },
};
