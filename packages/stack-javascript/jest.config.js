const path = require("path");

module.exports = {
  rootDir: process.cwd(),
  transform: {
    "\\.js$": [
      "babel-jest",
      { configFile: path.join(__dirname, "babel.config.js") },
    ],
  },
  reporters: ["jest-standard-reporter"],
};
