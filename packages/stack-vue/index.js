const path = require("path");

const lint = require("./lib/lint");

const eslintConfig = require(path.join(__dirname, ".eslintrc")); // eslint-disable-line
const htmlValidateConfig = require(path.join(__dirname, ".htmlvalidate")); // eslint-disable-line

module.exports = {
  configFiles: [
    {
      name: ".eslintrc.js",
      content: `const eslintConfig = require("@factorial/stack-vue").eslint;

module.exports = eslintConfig;
`,
    },
    {
      name: ".htmlvalidate.js",
      content: `const htmlValidateConfig = require("@factorial/stack-vue").htmlValidate;

module.exports = htmlValidateConfig;
`,
    },
  ],
  type: "vue",
  extensions: ["vue", "js", "mjs", "cjs"],
  eslint: eslintConfig,
  htmlValidate: htmlValidateConfig,
  tasks: {
    lint,
  },
};
