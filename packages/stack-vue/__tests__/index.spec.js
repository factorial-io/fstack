const path = require("path");

describe("vue/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.eslintrc"), () => {
      return "eslint";
    });

    const vue = require("..");
    const lint = require("../lib/lint");

    expect(vue).toEqual({
      configFiles: [
        {
          name: ".eslintrc.js",
          content: `const eslintConfig = require("@factorial/stack-vue").eslint;

module.exports = eslintConfig;
`,
        },
      ],
      eslint: "eslint",
      type: "vue",
      extensions: ["vue", "js", "mjs", "cjs"],
      tasks: {
        lint,
      },
    });
  });
});
