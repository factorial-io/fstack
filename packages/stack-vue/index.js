const path = require("path");

const lint = require("./lib/lint");

const htmlValidateConfig = require(path.join(__dirname, ".htmlvalidate")); // eslint-disable-line

module.exports = {
  configFiles: [
    {
      name: ".eslintrc.js",
      content: `module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint",
    "@factorial/stack-vue/eslint/v3",
  ],
};
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
  htmlValidate: htmlValidateConfig,
  tasks: {
    lint,
  },
};
