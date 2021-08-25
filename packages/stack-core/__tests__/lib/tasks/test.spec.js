describe("lib/tasks/test", () => {
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
            test: jest.fn(),
          },
        };
      });

      const js = require("../../../../stack-javascript");
      const css = require("../../../../stack-css");
      const testTask = require("../../../lib/tasks/test");

      await testTask({
        config: {
          use: [js, css],
        },
        types: ["css"],
      });

      expect(js.tasks.test).not.toHaveBeenCalled();
      expect(css.tasks.test).toHaveBeenCalledTimes(1);
    });
  });

  describe("without a given type", () => {
    test("'test' runs all tasks", async () => {
      jest.mock("../../../../../packages/stack-javascript", () => {
        return {
          type: "javascript",
          tasks: {
            test: jest.fn(),
          },
        };
      });
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          type: "css",
          tasks: {
            test: jest.fn(),
          },
        };
      });

      const js = require("../../../../stack-javascript");
      const css = require("../../../../stack-css");
      const testTask = require("../../../lib/tasks/test");

      await testTask({
        config: {
          use: [js, css],
        },
      });

      expect(css.tasks.test).toHaveBeenCalledTimes(1);
      expect(js.tasks.test).toHaveBeenCalledTimes(1);
    });
  });

  describe("with a failing test task", () => {
    test("'test' returns false", async () => {
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          tasks: {
            test: () => Promise.reject(),
          },
        };
      });

      const testTask = require("../../../lib/tasks/test");
      const css = require("../../../../stack-css");

      const valid = await testTask({
        config: {
          use: [css],
        },
      });

      expect(valid).toBe(false);
    });
  });

  describe("with only succeeding test tasks", () => {
    test("'test' returns false", async () => {
      jest.mock("../../../../../packages/stack-css", () => {
        return {
          tasks: {
            test: () => Promise.resolve(),
          },
        };
      });

      const testTask = require("../../../lib/tasks/test");
      const css = require("../../../../stack-css");

      const valid = await testTask({
        config: {
          use: [css],
        },
      });

      expect(valid).toBe(true);
    });
  });
});
