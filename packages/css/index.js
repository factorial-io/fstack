const path = require("path");

const lintCSS = require("./lib/lint");
const buildCSS = require("./lib/build");

let stylelintConfig = require(path.join(__dirname, ".stylelintrc")); // eslint-disable-line

module.exports = {
  stylelint: stylelintConfig,
  build: {
    extensions: ["css"],
    builder: buildCSS,
  },
  lint: {
    extensions: ["css"],
    linter: lintCSS,
  },
};
