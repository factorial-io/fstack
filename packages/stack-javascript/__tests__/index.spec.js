const path = require("path");

describe("javascript/index", () => {
  it("exports the correct data", () => {
    jest.mock(path.join(__dirname, "../.eslintrc"), () => {
      return "eslint";
    });
    jest.mock(path.join(__dirname, "../jest.config.js"), () => {
      return "jest";
    });

    const js = require("..");
    const build = require("../lib/build");
    const lint = require("../lib/lint");
    const test = require("../lib/test");

    expect(js).toEqual({
      babel: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                node: true,
              },
            },
          ],
        ],
      },
      configFiles: [
        {
          name: ".eslintrc.js",
          content: `const eslintConfig = require("@factorial/stack-javascript").eslint;

module.exports = eslintConfig;
`,
        },
      ],
      eslint: "eslint",
      jest: "jest",
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
