describe("lib/tasks/lint", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    console.log = jest.fn();
  });

  describe("with a given type", () => {
    test("runs the related task", async () => {
      jest.mock("../../../../../packages/javascript");
      jest.mock("../../../../../packages/css", () => {
        return {
          type: "css",
          tasks: {
            lint: jest.fn(),
          },
        };
      });

      const js = require("../../../../javascript");
      const css = require("../../../../css");
      const lint = require("../../../lib/tasks/lint");

      await lint({
        config: {
          use: [js, css],
        },
        types: ["css"],
      });

      expect(js.tasks.lint).not.toHaveBeenCalled();
      expect(css.tasks.lint).toHaveBeenCalledTimes(1);
    });
  });

  describe("without a given type", () => {
    test("lint runs all tasks", async () => {
      jest.mock("../../../../../packages/javascript", () => {
        return {
          type: "javascript",
          tasks: {
            lint: jest.fn(),
          },
        };
      });
      jest.mock("../../../../../packages/css", () => {
        return {
          type: "css",
          tasks: {
            lint: jest.fn(),
          },
        };
      });

      const js = require("../../../../javascript");
      const css = require("../../../../css");
      const lint = require("../../../lib/tasks/lint");

      await lint({
        config: {
          use: [js, css],
        },
      });

      expect(css.tasks.lint).toHaveBeenCalledTimes(1);
      expect(js.tasks.lint).toHaveBeenCalledTimes(1);
    });
  });

  describe("with a given file extension", () => {
    test("runs the related task", async () => {
      jest.mock("../../../../../packages/css", () => {
        return {
          extensions: ["css"],
          tasks: {
            lint: jest.fn(),
          },
        };
      });

      const lint = require("../../../lib/tasks/lint");
      const css = require("../../../../css");

      await lint({
        config: {
          use: [css],
        },
        fileExtension: "css",
      });

      expect(css.tasks.lint).toHaveBeenCalledTimes(1);
    });
  });

  describe("with a failing lint task", () => {
    test("lint returns false", async () => {
      jest.mock("../../../../../packages/css", () => {
        return {
          tasks: {
            lint: () => Promise.reject(),
          },
        };
      });

      const lint = require("../../../lib/tasks/lint");
      const css = require("../../../../css");

      const valid = await lint({
        config: {
          use: [css],
        },
      });

      expect(valid).toBe(false);
    });
  });

  describe("with only succeeding lint tasks", () => {
    test("lint returns false", async () => {
      jest.mock("../../../../../packages/css", () => {
        return {
          tasks: {
            lint: () => Promise.resolve(),
          },
        };
      });

      const lint = require("../../../lib/tasks/lint");
      const css = require("../../../../css");

      const valid = await lint({
        config: {
          use: [css],
        },
      });

      expect(valid).toBe(true);
    });
  });
});
