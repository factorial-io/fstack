describe("lib/tasks/build/assets", () => {
  const rootFolder = "rootFolder";
  const assetFolders = ["assetFolder1", "assetFolder2"];
  const distFolder = "distFolder";

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    console.log = jest.fn();
  });

  test("calls fs.copy", () => {
    jest.mock("fs-extra");

    const assets = require("../../../../lib/tasks/build/assets");
    const fs = require("fs-extra");

    assets({
      rootFolder,
      assetFolders,
      distFolder,
    });

    expect(fs.copy).toHaveBeenCalledTimes(2);
  });
});
