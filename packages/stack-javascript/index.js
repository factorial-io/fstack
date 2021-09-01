const path = require("path");

const build = require("./lib/build");
const lint = require("./lib/lint");
const test = require("./lib/test");

const eslintConfig = require(path.join(__dirname, ".eslintrc")); // eslint-disable-line
const jestConfig = require(path.join(__dirname, "jest.config.js")); // eslint-disable-line
const babelConfig = require(path.join(__dirname, "babel.config.js")); // eslint-disable-line

module.exports = {
  configFiles: [
    {
      name: ".eslintrc.js",
      content: `const eslintConfig = require("@factorial/stack-javascript").eslint;

module.exports = eslintConfig;
`,
    },
  ],
  type: "js",
  extensions: ["js"],
  eslint: eslintConfig,
  jest: jestConfig,
  babel: babelConfig,
  tasks: {
    build,
    lint,
    test,
  },
};
