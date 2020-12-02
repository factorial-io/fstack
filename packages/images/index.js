const optimize = require("./lib/optimize");

module.exports = {
  type: "images",
  extensions: ["jpg", "jpeg", "png"],
  tasks: {
    optimize,
  },
};
