const path = require("path");

const targets = {
  browsers:
    "last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 ios versions, last 2 ChromeAndroid versions, last 2 Edge versions",
};

describe("core/lib/config", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe("without a user config", () => {
    beforeEach(() => {
      console.error = jest.fn();
    });

    test("returns the default config", () => {
      const config = require("../../lib/config")();

      expect(config).toEqual({
        use: [],
        addHashes: false,
        assetFolders: [],
        cssFiles: [],
        distFolder: path.join(process.cwd(), "dist"),
        jsFiles: [],
        rootFolder: path.join(process.cwd(), "src"),
        svgFolders: [],
        imageFolders: [],
        customPropertyFiles: [],
        testsFolder: "tests",
        targets,
      });
    });

    test("logs an error message", () => {
      const spy = jest.spyOn(console, "error");
      const getConfig = require("../../lib/config");

      getConfig();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("with an empty user config", () => {
    test("returns the default config", () => {
      jest.mock(
        path.join(process.cwd(), ".factorialrc.js"),
        () => {
          return {};
        },
        {
          virtual: true,
        }
      );
      const config = require("../../lib/config")();

      expect(config).toEqual({
        use: [],
        addHashes: false,
        assetFolders: [],
        cssFiles: [],
        distFolder: path.join(process.cwd(), "dist"),
        jsFiles: [],
        rootFolder: path.join(process.cwd(), "src"),
        svgFolders: [],
        imageFolders: [],
        customPropertyFiles: [],
        testsFolder: "tests",
        targets,
      });
    });
  });

  describe("with an user config", () => {
    test("returns the merged config", () => {
      jest.mock(
        path.join(process.cwd(), ".factorialrc.js"),
        () => {
          return {
            use: ["plugin"],
            addHashes: true,
            assetFolders: ["assets"],
            cssFiles: ["index.css"],
            distFolder: "build",
            jsFiles: ["index.js"],
            svgFolders: ["icons"],
          };
        },
        {
          virtual: true,
        }
      );

      const config = require("../../lib/config")();

      expect(config).toEqual({
        use: ["plugin"],
        addHashes: true,
        assetFolders: [path.join(process.cwd(), "src", "assets")],
        cssFiles: [path.join("src", "index.css")],
        distFolder: path.join(process.cwd(), "build"),
        jsFiles: [path.join("src", "index.js")],
        rootFolder: path.join(process.cwd(), "src"),
        testsFolder: "tests",
        svgFolders: [path.join(process.cwd(), "src", "icons")],
        imageFolders: [],
        customPropertyFiles: [],
        targets,
      });
    });
  });

  describe("with a package.json", () => {
    beforeEach(() => {
      jest.mock(
        path.join(process.cwd(), ".factorialrc.js"),
        () => {
          return {};
        },
        {
          virtual: true,
        }
      );
    });

    describe("with a browserslist object", () => {
      test("returns the merged config", () => {
        jest.mock(
          path.join(process.cwd(), "package.json"),
          () => {
            return {
              browserslist:
                "last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 ios versions, last 2 ChromeAndroid versions, last 2 Edge versions",
            };
          },
          {
            virtual: true,
          }
        );
        const config = require("../../lib/config")();

        expect(config).toEqual({
          use: [],
          addHashes: false,
          assetFolders: [],
          cssFiles: [],
          distFolder: path.join(process.cwd(), "dist"),
          jsFiles: [],
          rootFolder: path.join(process.cwd(), "src"),
          svgFolders: [],
          imageFolders: [],
          customPropertyFiles: [],
          testsFolder: "tests",
          targets: {
            browsers:
              "last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 ios versions, last 2 ChromeAndroid versions, last 2 Edge versions",
          },
        });
      });
    });

    describe("with a targets object", () => {
      test("returns the merged config", () => {
        jest.mock(
          path.join(process.cwd(), "package.json"),
          () => {
            return {
              targets: {
                browsers:
                  "last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 ios versions, last 2 ChromeAndroid versions, last 2 Edge versions",
              },
            };
          },
          {
            virtual: true,
          }
        );
        const config = require("../../lib/config")();

        expect(config).toEqual({
          use: [],
          addHashes: false,
          assetFolders: [],
          cssFiles: [],
          distFolder: path.join(process.cwd(), "dist"),
          jsFiles: [],
          rootFolder: path.join(process.cwd(), "src"),
          svgFolders: [],
          imageFolders: [],
          customPropertyFiles: [],
          testsFolder: "tests",
          targets: {
            browsers:
              "last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 ios versions, last 2 ChromeAndroid versions, last 2 Edge versions",
          },
        });
      });
    });
  });
});
