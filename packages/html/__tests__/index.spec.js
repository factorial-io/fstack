const path = require("path");

describe("html/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.htmlvalidate.json"), () => {
      return "htmlvalidate";
    });

    const html = require("..");
    const lint = require("../lib/lint");

    expect(html).toEqual({
      htmlValidate: "htmlvalidate",
      type: "html",
      extensions: ["html"],
      tasks: {
        lint,
      },
    });
  });
});
