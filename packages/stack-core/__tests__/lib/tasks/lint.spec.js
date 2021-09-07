describe("lib/tasks/lint", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    console.log = jest.fn();
  });

  describe("with a given type", () => {
    test("runs the related task", async () => {
      jest.mock("../../../../../packages/stack-javascript");
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          type: "css",
          tasks: {
            lint: jest.fn(),
          },
        };
      });

      const js = require("../../../../stack-javascript");
      const css = require("../../../../stack-css");
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

  describe("with a failing lint task", () => {
    test("lint returns false", async () => {
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          type: "css",
          tasks: {
            lint: () => Promise.reject(),
          },
        };
      });

      const lint = require("../../../lib/tasks/lint");
      const css = require("../../../../stack-css");
      console.log(css.tasks.lint.toString());
      const valid = await lint({
        config: {
          use: [css],
        },
        types: ["css"],
      });

      expect(valid).toBe(false);
    });
  });

  describe("with only succeeding lint tasks", () => {
    test("lint returns false", async () => {
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          type: "css",
          tasks: {
            lint: () => Promise.resolve(),
          },
        };
      });

      const lint = require("../../../lib/tasks/lint");
      const css = require("../../../../stack-css");

      const valid = await lint({
        config: {
          use: [css],
        },
        types: ["css"],
      });

      expect(valid).toBe(true);
    });
  });
});
