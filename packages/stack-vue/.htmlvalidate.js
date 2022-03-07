const deepMerge = require("deepmerge");

const defaultConfig = require("@factorial/stack-html").htmlValidate;

module.exports = deepMerge(defaultConfig, {
  plugins: ["html-validate-vue"],
  extends: ["html-validate-vue:recommended"],
  transform: {
    "^.*\\.vue$": "html-validate-vue",
  },
  rules: {
    "element-name": [
      1,
      {
        pattern: "^([a-z]+((-[a-z]+)?)|([A-Z][a-z]+)+)$",
      },
    ],
    "element-case": [
      2,
      {
        style: ["lowercase", "pascalcase"],
      },
    ],
  },
});
