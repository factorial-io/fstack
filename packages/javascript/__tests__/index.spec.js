const path = require("path");

describe("javascript/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.eslintrc"), () => {
      return "eslint";
    });

    const js = require("..");
    const build = require("../lib/build");
    const lint = require("../lib/lint");
    const test = require("../lib/test");

    expect(js).toEqual({
      eslint: "eslint",
      type: "js",
      extensions: ["js"],
      tasks: {
        build,
        lint,
        test,
      },
    });
  });
});
