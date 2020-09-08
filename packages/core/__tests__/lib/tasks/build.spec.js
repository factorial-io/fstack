describe("lib/tasks/build", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    console.log = jest.fn();
  });

  describe("NODE_ENV !== 'production'", () => {
    test("does not delete files in the dist folder", async (done) => {
      jest.mock("del");

      const del = require("del");
      const build = require("../../../lib/tasks/build");
      const distFolder = "distFolder";

      await build({
        config: {
          distFolder,
          assetFolders: [],
        },
      });

      expect(del).not.toHaveBeenCalled();
      done();
    });
  });

  describe("NODE_ENV === 'production'", () => {
    test("deletes all files in the dist folder", async (done) => {
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
        },
      });

      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith([`${distFolder}/**/*`]);
      done();
      process.env.NODE_ENV = origNodeEnv;
    });
  });

  describe("with a given type", () => {
    describe("given type is an internal task of the core package", () => {
      test("runs the related task", async (done) => {
        jest.mock("../../../lib/tasks/build/assets");

        const buildAssets = require("../../../lib/tasks/build/assets");
        const build = require("../../../lib/tasks/build");

        await build({ config: {}, type: "assets" });

        expect(buildAssets).toHaveBeenCalledTimes(1);
        done();
      });
    });

    describe("given type is an external task of the another package", () => {
      test("runs the related task", async (done) => {
        jest.mock("../../../lib/tasks/build/assets");
        jest.mock("../../../../../packages/javascript");
        jest.mock("../../../../../packages/css", () => {
          return {
            type: "css",
            tasks: {
              build: jest.fn(),
            },
          };
        });

        const buildAssets = require("../../../lib/tasks/build/assets");
        const js = require("../../../../javascript");
        const css = require("../../../../css");
        const build = require("../../../lib/tasks/build");

        await build({
          config: {
            use: [js, css],
          },
          type: "css",
        });

        expect(buildAssets).not.toHaveBeenCalled();
        expect(js.tasks.build).not.toHaveBeenCalled();
        expect(css.tasks.build).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe("without a given type", () => {
    test("build runs all tasks", async (done) => {
      jest.mock("../../../lib/tasks/build/assets");
      jest.mock("../../../../../packages/javascript", () => {
        return {
          type: "javascript",
          tasks: {
            build: jest.fn(),
          },
        };
      });
      jest.mock("../../../../../packages/css", () => {
        return {
          type: "css",
          tasks: {
            build: jest.fn(),
          },
        };
      });

      const buildAssets = require("../../../lib/tasks/build/assets");
      const js = require("../../../../javascript");
      const css = require("../../../../css");
      const build = require("../../../lib/tasks/build");

      await build({
        config: {
          use: [js, css],
        },
      });

      expect(buildAssets).toHaveBeenCalledTimes(1);
      expect(css.tasks.build).toHaveBeenCalledTimes(1);
      expect(js.tasks.build).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("with a given file extension", () => {
    test("runs the related task", async (done) => {
      jest.mock("../../../lib/tasks/build/assets");
      jest.mock("../../../../../packages/css", () => {
        return {
          extensions: ["css"],
          tasks: {
            build: jest.fn(),
          },
        };
      });

      const buildAssets = require("../../../lib/tasks/build/assets");
      const build = require("../../../lib/tasks/build");
      const css = require("../../../../css");

      await build({
        config: {
          use: [css],
        },
        fileExtension: "css",
      });

      expect(buildAssets).not.toHaveBeenCalled();
      expect(css.tasks.build).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("with a failing build task", () => {
    test("build returns false", async (done) => {
      jest.mock("../../../lib/tasks/build/assets", () => {
        return () => Promise.reject();
      });

      const build = require("../../../lib/tasks/build");

      const valid = await build({
        config: {},
      });

      expect(valid).toBe(false);
      done();
    });
  });

  describe("with only succeeding build tasks", () => {
    test("build returns false", async (done) => {
      jest.mock("../../../lib/tasks/build/assets", () => {
        return () => Promise.resolve();
      });

      const build = require("../../../lib/tasks/build");

      const valid = await build({
        config: {},
      });

      expect(valid).toBe(true);
      done();
    });
  });
});
