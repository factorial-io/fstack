const path = require("path");

const lint = require("./lib/lint");

const htmlValidateConfig = require(path.join(__dirname, ".htmlvalidate.json")); // eslint-disable-line

module.exports = {
  configFiles: [
    {
      name: ".htmlvalidate.js",
      content: `const htmlValidateConfig = require("@factorial/stack-html").htmlValidate;

module.exports = htmlValidateConfig;
`,
    },
  ],
  htmlValidate: htmlValidateConfig,
  type: "html",
  extensions: ["html"],
  tasks: {
    lint,
  },
};
