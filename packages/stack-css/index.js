const path = require("path");

const build = require("./lib/build");
const tokenImport = require("./lib/token-import");
const lint = require("./lib/lint");

const stylelintConfig = require(path.join(__dirname, ".stylelintrc")); // eslint-disable-line

module.exports = {
  configFiles: [
    {
      name: ".stylelintrc.js",
      content: `const stylelintConfig = require("@factorial/stack-css").stylelint;

module.exports = stylelintConfig;
`,
    },
  ],
  stylelint: stylelintConfig,
  type: "css",
  extensions: ["css"],
  tasks: {
    build,
    lint,
    "token-import": tokenImport,
  },
};
