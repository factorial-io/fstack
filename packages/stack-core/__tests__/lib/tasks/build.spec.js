describe("lib/tasks/build", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    console.log = jest.fn();
  });

  describe("when starting 'watch'", () => {
    test("deletes all files in the dist folder", async () => {
      jest.mock("del");

      const del = require("del");
      const build = require("../../../lib/tasks/build");
      const distFolder = "distFolder";
      const origNodeEnv = process.env.NODE_ENV;

      process.env.NODE_ENV = "production";

      await build(
        {
          config: {
            distFolder,
            assetFolders: [],
            addHashes: false,
          },
          types: {
            types: [],
            all: true,
          },
        },
        true
      );

      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith([`${distFolder}/**/*`]);

      process.env.NODE_ENV = origNodeEnv;
    });
  });

  describe("with addHashes=true", () => {
    describe("when a file changed during 'watch'", () => {
      test("deletes only files of that filetype", async () => {
        jest.mock("del");

        const del = require("del");
        const build = require("../../../lib/tasks/build");
        const distFolder = "distFolder";
        const origNodeEnv = process.env.NODE_ENV;

        process.env.NODE_ENV = "production";

        await build({
          config: {
            distFolder,
            assetFolders: [],
            addHashes: true,
          },
          types: {
            types: [],
            all: true,
          },
          fileExtension: "css",
        });

        expect(del).toHaveBeenCalledTimes(1);
        expect(del).toHaveBeenCalledWith([
          `${distFolder}/**/*.css`,
          `${distFolder}/**/*.css.map`,
        ]);

        process.env.NODE_ENV = origNodeEnv;
      });
    });

    describe("when manually triggering", () => {
      describe("without --skip or --only", () => {
        test("deletes all files in the dist folder", async () => {
          jest.mock("del");

          const del = require("del");
          const build = require("../../../lib/tasks/build");
          const distFolder = "distFolder";
          const origNodeEnv = process.env.NODE_ENV;

          process.env.NODE_ENV = "production";

          await build({
            config: {
              distFolder,
              assetFolders: [],
              addHashes: true,
            },
            types: {
              types: [],
              all: true,
            },
          });

          expect(del).toHaveBeenCalledTimes(1);
          expect(del).toHaveBeenCalledWith([`${distFolder}/**/*`]);

          process.env.NODE_ENV = origNodeEnv;
        });
      });

      describe("with --skip or --only", () => {
        test("deletes only files of that filetype", async () => {
          jest.mock("del");

          const del = require("del");
          const build = require("../../../lib/tasks/build");
          const distFolder = "distFolder";
          const origNodeEnv = process.env.NODE_ENV;

          process.env.NODE_ENV = "production";

          await build({
            config: {
              distFolder,
              assetFolders: [],
              addHashes: true,
              use: [
                {
                  type: "css",
                  extensions: ["css"],
                  tasks: {
                    build: () => {},
                  },
                },
                {
                  type: "js",
                  extensions: ["js"],
                  tasks: {
                    build: () => {},
                  },
                },
              ],
            },
            types: {
              types: ["css"],
              all: false,
            },
          });

          expect(del).toHaveBeenCalledTimes(1);
          expect(del).toHaveBeenCalledWith([
            `${distFolder}/**/*.css`,
            `${distFolder}/**/*.css.map`,
          ]);

          process.env.NODE_ENV = origNodeEnv;
        });
      });
    });
  });

  describe("with addHashes=false", () => {
    test("does not delete all files in the dist folder", async () => {
      jest.mock("del");

      const del = require("del");
      const build = require("../../../lib/tasks/build");
      const distFolder = "distFolder";
      const origNodeEnv = process.env.NODE_ENV;

      process.env.NODE_ENV = "production";

      await build({
        config: {
          distFolder,
          assetFolders: [],
          addHashes: false,
        },
        types: {
          types: [],
          all: true,
        },
      });

      expect(del).not.toHaveBeenCalled();

      process.env.NODE_ENV = origNodeEnv;
    });
  });

  describe("with a given type", () => {
    describe("given type is an internal task of the core package", () => {
      test("runs the related task", async () => {
        jest.mock("../../../lib/tasks/build/assets");

        const buildAssets = require("../../../lib/tasks/build/assets");
        const build = require("../../../lib/tasks/build");

        await build({
          config: {},
          types: {
            types: [],
            all: true,
          },
          type: "assets",
        });

        expect(buildAssets).toHaveBeenCalledTimes(1);
      });
    });

    describe("given type is an external task of the another package", () => {
      test("runs the related task", async () => {
        jest.mock("../../../lib/tasks/build/assets");
        jest.mock("../../../../../packages/stack-javascript");
        jest.mock("../../../../../packages/stack-css", () => {
          return {
            type: "css",
            tasks: {
              build: jest.fn(),
            },
          };
        });

        const buildAssets = require("../../../lib/tasks/build/assets");
        const js = require("../../../../stack-javascript");
        const css = require("../../../../stack-css");
        const build = require("../../../lib/tasks/build");

        await build({
          config: {
            use: [js, css],
          },
          types: {
            types: ["css"],
          },
        });

        expect(buildAssets).not.toHaveBeenCalled();
        expect(js.tasks.build).not.toHaveBeenCalled();
        expect(css.tasks.build).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("without a given type", () => {
    test("build runs all tasks", async () => {
      jest.mock("../../../lib/tasks/build/assets");
      jest.mock("../../../../../packages/stack-javascript", () => {
        return {
          type: "javascript",
          tasks: {
            build: jest.fn(),
          },
        };
      });
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          type: "css",
          tasks: {
            build: jest.fn(),
          },
        };
      });

      const buildAssets = require("../../../lib/tasks/build/assets");
      const js = require("../../../../stack-javascript");
      const css = require("../../../../stack-css");
      const build = require("../../../lib/tasks/build");

      await build({
        config: {
          use: [js, css],
        },
        types: {
          types: ["css", "javascript"],
          all: true,
        },
      });

      expect(buildAssets).toHaveBeenCalledTimes(1);
      expect(css.tasks.build).toHaveBeenCalledTimes(1);
      expect(js.tasks.build).toHaveBeenCalledTimes(1);
    });
  });

  describe("with a given file extension", () => {
    test("runs the related task", async () => {
      jest.mock("../../../lib/tasks/build/assets");
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          extensions: ["css"],
          tasks: {
            build: jest.fn(),
          },
        };
      });

      const buildAssets = require("../../../lib/tasks/build/assets");
      const build = require("../../../lib/tasks/build");
      const css = require("../../../../stack-css");

      await build({
        config: {
          use: [css],
        },
        types: {
          types: ["css"],
        },
        fileExtension: "css",
      });

      expect(buildAssets).not.toHaveBeenCalled();
      expect(css.tasks.build).toHaveBeenCalledTimes(1);
    });
  });

  describe("with a failing build task", () => {
    test("build returns false", async () => {
      jest.mock("../../../lib/tasks/build/assets", () => {
        return () => Promise.reject();
      });

      const build = require("../../../lib/tasks/build");

      const valid = await build({
        config: {},
        types: {
          types: [],
          all: true,
        },
      });

      expect(valid).toBe(false);
    });
  });

  describe("with only succeeding build tasks", () => {
    test("build returns false", async () => {
      jest.mock("../../../lib/tasks/build/assets", () => {
        return () => Promise.resolve();
      });

      const build = require("../../../lib/tasks/build");

      const valid = await build({
        config: {},
        types: {
          types: ["css"],
        },
      });

      expect(valid).toBe(true);
    });
  });
});
