const path = require("path");

const build = require("./lib/build");
const lint = require("./lib/lint");
const test = require("./lib/test");

let eslintConfig = require(path.join(__dirname, ".eslintrc")); // eslint-disable-line

module.exports = {
  eslint: eslintConfig,
  build: {
    extensions: ["js"],
    builder: build,
  },
  lint: {
    extensions: ["js"],
    linter: lint,
  },
  test: {
    extensions: ["js"],
    tester: test,
  },
};
