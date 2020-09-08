describe("lib/tasks/test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    console.log = jest.fn();
  });

  describe("with a given type", () => {
    test("runs the related task", async (done) => {
      jest.mock("../../../../../packages/javascript");
      jest.mock("../../../../../packages/css", () => {
        return {
          type: "css",
          tasks: {
            test: jest.fn(),
          },
        };
      });

      const js = require("../../../../javascript");
      const css = require("../../../../css");
      const test = require("../../../lib/tasks/test");

      await test({
        config: {
          use: [js, css],
        },
        type: "css",
      });

      expect(js.tasks.test).not.toHaveBeenCalled();
      expect(css.tasks.test).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("without a given type", () => {
    test("test runs all tasks", async (done) => {
      jest.mock("../../../../../packages/javascript", () => {
        return {
          type: "javascript",
          tasks: {
            test: jest.fn(),
          },
        };
      });
      jest.mock("../../../../../packages/css", () => {
        return {
          type: "css",
          tasks: {
            test: jest.fn(),
          },
        };
      });

      const js = require("../../../../javascript");
      const css = require("../../../../css");
      const test = require("../../../lib/tasks/test");

      await test({
        config: {
          use: [js, css],
        },
      });

      expect(css.tasks.test).toHaveBeenCalledTimes(1);
      expect(js.tasks.test).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("with a failing test task", () => {
    test("test returns false", async (done) => {
      jest.mock("../../../../../packages/css", () => {
        return {
          tasks: {
            test: () => Promise.reject(),
          },
        };
      });

      const test = require("../../../lib/tasks/test");
      const css = require("../../../../css");

      const valid = await test({
        config: {
          use: [css],
        },
      });

      expect(valid).toBe(false);
      done();
    });
  });

  describe("with only succeeding test tasks", () => {
    test("test returns false", async (done) => {
      jest.mock("../../../../../packages/css", () => {
        return {
          tasks: {
            test: () => Promise.resolve(),
          },
        };
      });

      const test = require("../../../lib/tasks/test");
      const css = require("../../../../css");

      const valid = await test({
        config: {
          use: [css],
        },
      });

      expect(valid).toBe(true);
      done();
    });
  });
});
