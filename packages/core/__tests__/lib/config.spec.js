const path = require("path");

const targets = {
  browsers: [
    "last 2 versions",
    ">1%",
    "not ie 10",
    "not op_mini all",
    "not op_mob <= 46",
    "not ie_mob <= 11",
  ],
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
              browserslist: ["Chrome 83"],
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
          customPropertyFiles: [],
          testsFolder: "tests",
          targets: ["Chrome 83"],
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
                browsers: ["Chrome 83"],
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
          customPropertyFiles: [],
          testsFolder: "tests",
          targets: {
            browsers: ["Chrome 83"],
          },
        });
      });
    });
  });
});
