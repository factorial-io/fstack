describe("image/index", () => {
  test("exports the correct data", () => {
    const images = require("..");
    const optimize = require("../lib/optimize");

    expect(images).toEqual({
      type: "images",
      extensions: ["jpg", "jpeg", "png"],
      tasks: {
        optimize,
      },
    });
  });
});
