const path = require("path");

describe("vue/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.eslintrc"), () => {
      return "eslint";
    });
    jest.mock(path.join(__dirname, "../.htmlvalidate"), () => {
      return "htmlvalidate";
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
        {
          name: ".htmlvalidate.js",
          content: `const htmlValidateConfig = require("@factorial/stack-vue").htmlValidate;

module.exports = htmlValidateConfig;
`,
        },
      ],
      eslint: "eslint",
      htmlValidate: "htmlvalidate",
      type: "vue",
      extensions: ["vue", "js", "mjs", "cjs"],
      tasks: {
        lint,
      },
    });
  });
});
