describe("typescript/index", () => {
  test("exports the correct data", () => {
    const typescript = require("..");
    const lint = require("../lib/lint");

    expect(typescript).toEqual({
      configFiles: [
        {
          name: ".eslintrc.js",
          content: `module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint/base",
    "@factorial/stack-javascript/eslint/jest",
    "@factorial/stack-typescript/eslint",
  ],
};
`,
        },
      ],
      type: "ts",
      extensions: ["ts"],
      tasks: {
        lint,
      },
    });
  });
});
