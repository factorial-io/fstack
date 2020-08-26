const deepMerge = require("deepmerge");
const jestConfig = require("./packages/javascript/jest.config.js");

module.exports = deepMerge(jestConfig, {
  rootDir: "packages",
  collectCoverage: true,
  collectCoverageFrom: ["**/*.js", "!**/.*.js", "!**/*.config.js"],
});
