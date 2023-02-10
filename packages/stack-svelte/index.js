const lint = require("./lib/lint");

module.exports = {
  configFiles: [
    {
      name: ".eslintrc.js",
      content: `module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint",
    "@factorial/stack-svelte/eslint",
  ],
};
`,
    },
  ],
  type: "svelte",
  extensions: ["svelte"],
  tasks: {
    lint,
  },
};
