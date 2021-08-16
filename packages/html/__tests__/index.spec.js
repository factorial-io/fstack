const path = require("path");

describe("html/index", () => {
  test("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.htmlvalidate.json"), () => {
      return "htmlvalidate";
    });

    const html = require("..");
    const lint = require("../lib/lint");

    expect(html).toEqual({
      configFiles: [
        {
          name: ".htmlvalidate.js",
          content: `const htmlValidateConfig = require("@factorial/stack-html").htmlValidate;

module.exports = htmlValidateConfig;
`,
        },
      ],
      htmlValidate: "htmlvalidate",
      type: "html",
      extensions: ["html"],
      tasks: {
        lint,
      },
    });
  });
});
