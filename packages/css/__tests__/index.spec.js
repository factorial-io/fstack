const path = require("path");

describe("css/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.stylelintrc"), () => {
      return "stylelint";
    });

    const css = require("..");
    const build = require("../lib/build");
    const lint = require("../lib/lint");

    expect(css).toEqual({
      stylelint: "stylelint",
      type: "css",
      extensions: ["css"],
      tasks: {
        build,
        lint,
      },
    });
  });
});
