describe("svg/index", () => {
  test("exports the correct data", () => {
    const twig = require("..");
    const optimize = require("../lib/optimize");
    const sprite = require("../lib/sprite");

    expect(twig).toEqual({
      type: "svg",
      extensions: ["svg"],
      tasks: {
        optimize,
        sprite,
      },
    });
  });
});
