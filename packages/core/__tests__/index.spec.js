const chalk = require("chalk");

const errorMessage = `${chalk.red.bold("Error:")} Please run any command of:
- build
- init
- watch
`;

jest.mock("../lib/tasks/build");
jest.mock("../lib/tasks/init");
jest.mock("../lib/tasks/lint");
jest.mock("../lib/tasks/test");
jest.mock("../lib/tasks/watch");

Object.defineProperty(process, "exit", { value: jest.fn() });

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe("core", () => {
  describe("without a command", () => {
    test("logs an error message", async () => {
      const spy = jest.spyOn(console, "error").mockImplementation();
      const core = require("..");

      await core();

      expect(spy).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("with a command", () => {
    describe("invalid command", () => {
      test("logs an error message", async () => {
        const spy = jest.spyOn(console, "error").mockImplementation();
        const core = require("..");

        await core("invalidCommand");

        expect(spy).toHaveBeenCalledWith(errorMessage);
      });
    });

    describe("build", () => {
      beforeEach(() => {
        jest.mock("../lib/config", () => {
          return () => ({});
        });
      });

      describe("without --only", () => {
        test("calls build task with the correct params", async () => {
          const build = require("../lib/tasks/build");
          const core = require("..");

          await core("build");

          expect(build).toHaveBeenCalledTimes(1);
          expect(build).toHaveBeenCalledWith({
            config: {},
            type: null,
          });
        });
      });

      describe("with --only", () => {
        test("calls build task with the correct params", async () => {
          process.argv[2] = "build";
          process.argv[3] = "--only";
          process.argv[4] = "css";
          const build = require("../lib/tasks/build");
          const core = require("..");

          await core("build");

          expect(build).toHaveBeenCalledTimes(1);
          expect(build).toHaveBeenCalledWith({
            config: {},
            type: "css",
          });

          process.argv[3] = null;
          process.argv[4] = null;
        });
      });

      describe("is sucessful", () => {
        test("calls process.exit with 0", async () => {
          const spy = jest.spyOn(process, "exit").mockImplementation();
          jest.mock("../lib/tasks/build", () => {
            return () => Promise.resolve(true);
          });
          const core = require("..");

          await core("build");

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(0);

          spy.mockRestore();
        });
      });

      describe("is not sucessful", () => {
        test("calls process.exit with 1", async () => {
          const spy = jest.spyOn(process, "exit").mockImplementation();
          jest.mock("../lib/tasks/build", () => {
            return () => Promise.resolve(false);
          });
          const core = require("..");

          await core("build");

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(1);

          spy.mockRestore();
        });
      });
    });

    describe("lint", () => {
      beforeEach(() => {
        jest.mock("../lib/config", () => {
          return () => ({
            use: [
              {
                tasks: {
                  lint: "",
                },
              },
            ],
          });
        });
      });

      describe("without --only", () => {
        test("calls lint task with the correct params", async () => {
          const lint = require("../lib/tasks/lint");
          const core = require("..");

          await core("lint");

          expect(lint).toHaveBeenCalledTimes(1);
          expect(lint).toHaveBeenCalledWith({
            config: {
              use: [
                {
                  tasks: {
                    lint: "",
                  },
                },
              ],
            },
            type: null,
          });
        });
      });

      describe("with --only", () => {
        test("calls lint task with the correct params", async () => {
          process.argv[2] = "lint";
          process.argv[3] = "--only";
          process.argv[4] = "css";
          const lint = require("../lib/tasks/lint");
          const core = require("..");

          await core("lint");

          expect(lint).toHaveBeenCalledTimes(1);
          expect(lint).toHaveBeenCalledWith({
            config: {
              use: [
                {
                  tasks: {
                    lint: "",
                  },
                },
              ],
            },
            type: "css",
          });

          process.argv[2] = null;
          process.argv[3] = null;
          process.argv[4] = null;
        });
      });

      describe("is sucessful", () => {
        test("calls process.exit with 0", async () => {
          const spy = jest.spyOn(process, "exit").mockImplementation();
          jest.mock("../lib/tasks/lint", () => {
            return () => Promise.resolve(true);
          });
          const core = require("..");

          await core("lint");

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(0);

          spy.mockRestore();
        });
      });

      describe("is not sucessful", () => {
        test("calls process.exit with 1", async () => {
          const spy = jest.spyOn(process, "exit").mockImplementation();
          jest.mock("../lib/tasks/lint", () => {
            return () => Promise.resolve(false);
          });
          const core = require("..");

          await core("lint");

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(1);

          spy.mockRestore();
        });
      });
    });

    describe("test", () => {
      beforeEach(() => {
        jest.mock("../lib/config", () => {
          return () => ({
            use: [
              {
                tasks: {
                  test: "",
                },
              },
            ],
          });
        });
      });

      describe("without --only", () => {
        test("calls test task with the correct params", async () => {
          const test = require("../lib/tasks/test");
          const core = require("..");

          await core("test");

          expect(test).toHaveBeenCalledTimes(1);
          expect(test).toHaveBeenCalledWith({
            config: {
              use: [
                {
                  tasks: {
                    test: "",
                  },
                },
              ],
            },
            type: null,
          });
        });
      });

      describe("with --only", () => {
        test("calls test task with the correct params", async () => {
          process.argv[2] = "test";
          process.argv[3] = "--only";
          process.argv[4] = "css";
          const test = require("../lib/tasks/test");
          const core = require("..");

          await core("test");

          expect(test).toHaveBeenCalledTimes(1);
          expect(test).toHaveBeenCalledWith({
            config: {
              use: [
                {
                  tasks: {
                    test: "",
                  },
                },
              ],
            },
            type: "css",
          });

          process.argv[2] = null;
          process.argv[3] = null;
          process.argv[4] = null;
        });
      });

      describe("is sucessful", () => {
        test("calls process.exit with 0", async () => {
          const spy = jest.spyOn(process, "exit").mockImplementation();
          jest.mock("../lib/tasks/test", () => {
            return () => Promise.resolve(true);
          });
          const core = require("..");

          await core("test");

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(0);

          spy.mockRestore();
        });
      });

      describe("is not sucessful", () => {
        test("calls process.exit with 1", async () => {
          const spy = jest.spyOn(process, "exit").mockImplementation();
          jest.mock("../lib/tasks/test", () => {
            return () => Promise.resolve(false);
          });
          const core = require("..");

          await core("test");

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(1);

          spy.mockRestore();
        });
      });
    });

    describe("watch", () => {
      test("calls watch task", async () => {
        jest.mock("../lib/config", () => {
          return () => ({});
        });

        const watch = require("../lib/tasks/watch");
        const core = require("..");

        await core("watch");

        expect(watch).toHaveBeenCalledTimes(1);
        expect(watch).toHaveBeenCalledWith({});
      });
    });

    describe("init", () => {
      test("calls init task", async () => {
        const init = require("../lib/tasks/init");
        const core = require("..");

        await core("init");

        expect(init).toHaveBeenCalledTimes(1);
        expect(init).toHaveBeenCalledWith();
      });
    });
  });
});
