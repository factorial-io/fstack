describe("lib/tasks/watch", () => {
  const config = {};

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    console.log = jest.fn();
  });

  describe("without --build", () => {
    test("build calls lint", () => {
      jest.mock("../../../lib/tasks/lint");
      jest.mock("../../../lib/tasks/build");

      const lint = require("../../../lib/tasks/lint");
      const build = require("../../../lib/tasks/build");
      const watch = require("../../../lib/tasks/watch");

      watch(config);

      expect(lint).toHaveBeenCalledTimes(1);
      expect(lint).toHaveBeenCalledWith({
        config,
        types: ["css", "e2e", "html", "images", "js", "svg", "twig"],
      });
      expect(build).not.toHaveBeenCalled();
    });
  });

  describe("with --build", () => {
    test("build calls build and lint", async () => {
      process.argv[3] = "--build";

      jest.mock("../../../lib/tasks/lint");
      jest.mock("../../../lib/tasks/build");

      const lint = require("../../../lib/tasks/lint");
      const build = require("../../../lib/tasks/build");
      const watch = require("../../../lib/tasks/watch");

      await watch(config);

      expect(build).toHaveBeenCalledTimes(1);
      expect(build).toHaveBeenCalledWith(
        {
          config,
          fileExtension: undefined,
          types: ["css", "e2e", "html", "images", "js", "svg", "twig"],
        },
        true
      );
      expect(lint).toHaveBeenCalledTimes(1);
      expect(lint).toHaveBeenCalledWith({
        config,
        types: ["css", "e2e", "html", "images", "js", "svg", "twig"],
      });

      process.argv[3] = null;
    });
  });

  describe("with --build and --afterBuild", () => {
    test("build calls build, the afterBuild command and lint", async () => {
      process.argv[3] = "--build";
      process.argv.push("--afterBuild");
      process.argv.push("afterBuildCommand");
      process.argv.push("--nextParam");

      jest.mock("../../../lib/tasks/lint");
      jest.mock("../../../lib/tasks/build");
      jest.mock("child_process");
      const childProcess = require("child_process");

      childProcess.exec.mockImplementation((command, callback) => callback());

      const lint = require("../../../lib/tasks/lint");
      const build = require("../../../lib/tasks/build");
      const watch = require("../../../lib/tasks/watch");

      await watch(config);

      expect(build).toHaveBeenCalledTimes(1);
      expect(build).toHaveBeenCalledWith(
        {
          config,
          fileExtension: undefined,
          types: ["css", "e2e", "html", "images", "js", "svg", "twig"],
        },
        true
      );
      expect(childProcess.exec).toHaveBeenCalledTimes(1);
      expect(childProcess.exec).toHaveBeenCalledWith(
        "afterBuildCommand",
        expect.anything()
      );
      expect(lint).toHaveBeenCalledTimes(1);
      expect(lint).toHaveBeenCalledWith({
        config,
        types: ["css", "e2e", "html", "images", "js", "svg", "twig"],
      });

      process.argv[3] = null;
      process.argv[4] = null;
      process.argv[5] = null;
      process.argv[6] = null;
    });
  });
});
