const lint = require("./lib/lint");

module.exports = {
  type: "twig",
  extensions: ["twig", "html.twig"],
  tasks: {
    lint,
  },
};
