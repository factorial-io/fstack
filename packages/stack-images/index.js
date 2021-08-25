const { optimize, webp, avif } = require("./lib/optimize");

module.exports = {
  type: "images",
  extensions: ["jpg", "jpeg", "png"],
  tasks: {
    optimize,
    webp,
    avif,
  },
};
