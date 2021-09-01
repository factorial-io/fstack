const path = require("path");

const lint = require("./lib/lint");

const eslintConfig = require(path.join(__dirname, ".eslintrc")); // eslint-disable-line

module.exports = {
  configFiles: [
    {
      name: ".eslintrc.js",
      content: `const eslintConfig = require("@factorial/stack-vue").eslint;

module.exports = eslintConfig;
`,
    },
  ],
  type: "vue",
  extensions: ["vue"],
  eslint: eslintConfig,
  tasks: {
    lint,
  },
};
