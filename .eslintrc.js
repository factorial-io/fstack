const eslintConfig = require("./packages/stack-javascript/.eslintrc");
const deepMerge = require("deepmerge");

module.exports = deepMerge(eslintConfig, {
  rules: {
    "no-console": 0,
  },
});
