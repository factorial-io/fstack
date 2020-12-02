describe("image/index", () => {
  test("exports the correct data", () => {
    const twig = require("..");
    const optimize = require("../lib/optimize");

    expect(twig).toEqual({
      type: "images",
      extensions: ["jpg", "jpeg", "png"],
      tasks: {
        optimize,
      },
    });
  });
});
