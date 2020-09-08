describe("lib/tasks/watch", () => {
  const config = {};

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    // console.log = jest.fn();
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
      expect(lint).toHaveBeenCalledWith({ config });
      expect(build).not.toHaveBeenCalled();
    });
  });

  describe("with --build", () => {
    test("build calls build and lint", async (done) => {
      process.argv[3] = "--build";

      jest.mock("../../../lib/tasks/lint");
      jest.mock("../../../lib/tasks/build");

      const lint = require("../../../lib/tasks/lint");
      const build = require("../../../lib/tasks/build");
      const watch = require("../../../lib/tasks/watch");

      await watch(config);

      expect(build).toHaveBeenCalledTimes(1);
      expect(build).toHaveBeenCalledWith({ config, fileExtension: undefined });
      expect(lint).toHaveBeenCalledTimes(1);
      expect(lint).toHaveBeenCalledWith({ config });
      done();
      process.argv[3] = null;
    });
  });
});
