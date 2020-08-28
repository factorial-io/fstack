const path = require("path");

const build = require("./lib/build");
const lint = require("./lib/lint");

const stylelintConfig = require(path.join(__dirname, ".stylelintrc")); // eslint-disable-line

module.exports = {
  stylelint: stylelintConfig,
  type: "css",
  extensions: ["css"],
  tasks: {
    build,
    lint,
  },
};
