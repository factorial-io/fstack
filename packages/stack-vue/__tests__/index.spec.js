const path = require("path");

describe("vue/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.htmlvalidate"), () => {
      return "htmlvalidate";
    });

    const vue = require("..");
    const lint = require("../lib/lint");

    expect(vue).toEqual({
      configFiles: [
        {
          name: ".eslintrc.js",
          content: `module.exports = {
  root: true,
  extends: [
    "@factorial/stack-javascript/eslint",
    "@factorial/stack-vue/eslint/v3",
  ],
};
`,
        },
        {
          name: ".htmlvalidate.js",
          content: `const htmlValidateConfig = require("@factorial/stack-vue").htmlValidate;

module.exports = htmlValidateConfig;
`,
        },
      ],
      htmlValidate: "htmlvalidate",
      type: "vue",
      extensions: ["vue", "js", "mjs", "cjs"],
      tasks: {
        lint,
      },
    });
  });
});
