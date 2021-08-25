const path = require("path");

describe("css/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.stylelintrc"), () => {
      return "stylelint";
    });

    const css = require("..");
    const build = require("../lib/build");
    const lint = require("../lib/lint");
    const tokenImport = require("../lib/token-import");

    expect(css).toEqual({
      configFiles: [
        {
          name: ".stylelintrc.js",
          content: `const stylelintConfig = require("@factorial/stack-css").stylelint;

module.exports = stylelintConfig;
`,
        },
      ],
      stylelint: "stylelint",
      type: "css",
      extensions: ["css"],
      tasks: {
        build,
        lint,
        "token-import": tokenImport,
      },
    });
  });
});
