describe("svelte/index", () => {
  test("exports the correct data", () => {
    const svelte = require("..");
    const lint = require("../lib/lint");

    expect(svelte).toEqual({
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
    });
  });
});
