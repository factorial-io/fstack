const path = require("path");

const build = require("./lib/build");
const lint = require("./lib/lint");
const test = require("./lib/test");

const eslintConfig = require(path.join(__dirname, ".eslintrc")); // eslint-disable-line

module.exports = {
  type: "js",
  extensions: ["js"],
  eslint: eslintConfig,
  tasks: {
    build,
    lint,
    test,
  },
};
