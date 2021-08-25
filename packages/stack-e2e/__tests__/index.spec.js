describe("e2e/index", () => {
  test("exports the correct data", () => {
    const e2e = require("..");
    const test = require("../lib/test");

    expect(e2e).toEqual({
      type: "e2e",
      extensions: ["js"],
      tasks: {
        test,
      },
    });
  });
});
