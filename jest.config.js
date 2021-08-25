const deepMerge = require("deepmerge");
const jestConfig = require("./packages/stack-javascript/jest.config");

module.exports = deepMerge(jestConfig, {
  rootDir: "packages",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/.*.js",
    "!**/*.config.js",
    "!./coverage/**/*.js",
  ],
  setupFilesAfterEnv: ["../setupTests.js"],
  testPathIgnorePatterns: ["test.js"],
});
