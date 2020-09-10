const optimize = require("./lib/optimize");
const sprite = require("./lib/sprite");

module.exports = {
  type: "svg",
  extensions: ["svg"],
  tasks: {
    optimize,
    sprite,
  },
};
