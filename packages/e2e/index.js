const test = require("./lib/test");

module.exports = {
  type: "e2e",
  extensions: ["js"],
  tasks: {
    test,
  },
};
