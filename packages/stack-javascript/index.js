const path = require("path");

const build = require("./lib/build");
const lint = require("./lib/lint");
const test = require("./lib/test");

const jestConfig = require(path.join(__dirname, "jest.config.js")); // eslint-disable-line
const babelConfig = require(path.join(__dirname, "babel.config.js")); // eslint-disable-line

module.exports = {
  configFiles: [
    {
      name: ".eslintrc.js",
      content: `module.exports = {
  root: true,
  extends: [
    require.resolve("@factorial/stack-javascript/eslint"),
  ],
};
`,
    },
  ],
  type: "js",
  extensions: ["js"],
  jest: jestConfig,
  babel: babelConfig,
  tasks: {
    build,
    lint,
    test,
  },
};
