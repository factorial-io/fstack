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
    it("logs an error message", async () => {
      const spy = jest.spyOn(console, "error").mockImplementation();
      const core = require("..");

      await core();

      expect(spy).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("with a command", () => {
    describe("invalid command", () => {
      it("logs an error message", async () => {
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
        it("calls build task with the correct params", async () => {
          const build = require("../lib/tasks/build");
          const core = require("..");

          await core("build");

          expect(build).toHaveBeenCalledTimes(1);
          expect(build).toHaveBeenCalledWith({
            config: {},
            types: {
              types: [
                "css",
                "e2e",
                "html",
                "images",
                "js",
                "svg",
                "twig",
                "vue",
              ],
              all: true,
            },
          });
        });
      });

      describe("with --only", () => {
        it("calls build task with the correct params", async () => {
          process.argv[2] = "build";
          process.argv[3] = "--only";
          process.argv[4] = "css,js";
          const build = require("../lib/tasks/build");
          const core = require("..");

          await core("build");

          expect(build).toHaveBeenCalledTimes(1);
          expect(build).toHaveBeenCalledWith({
            config: {},
            types: {
              types: ["css", "js"],
              all: false,
            },
          });

          process.argv[3] = null;
          process.argv[4] = null;
        });
      });

      describe("is sucessful", () => {
        it("calls process.exit with 0", async () => {
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
        it("calls process.exit with 1", async () => {
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
        it("calls lint task with the correct params", async () => {
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
            types: ["css", "e2e", "html", "images", "js", "svg", "twig", "vue"],
          });
        });
      });

      describe("with --only", () => {
        it("calls lint task with the correct params", async () => {
          process.argv[2] = "lint";
          process.argv[3] = "--only";
          process.argv[4] = "css,js";
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
            types: ["css", "js"],
          });

          process.argv[2] = null;
          process.argv[3] = null;
          process.argv[4] = null;
        });
      });

      describe("is sucessful", () => {
        it("calls process.exit with 0", async () => {
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
        it("calls process.exit with 1", async () => {
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
        it("calls test task with the correct params", async () => {
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
            types: ["css", "e2e", "html", "images", "js", "svg", "twig", "vue"],
          });
        });
      });

      describe("with --only", () => {
        it("calls test task with the correct params", async () => {
          process.argv[2] = "test";
          process.argv[3] = "--only";
          process.argv[4] = "css,js";
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
            types: ["css", "js"],
          });

          process.argv[2] = null;
          process.argv[3] = null;
          process.argv[4] = null;
        });
      });

      describe("is sucessful", () => {
        it("calls process.exit with 0", async () => {
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
        it("calls process.exit with 1", async () => {
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
      it("calls watch task", async () => {
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
      it("calls init task", async () => {
        const init = require("../lib/tasks/init");
        const core = require("..");

        await core("init");

        expect(init).toHaveBeenCalledTimes(1);
        expect(init).toHaveBeenCalledWith();
      });
    });
  });
});
