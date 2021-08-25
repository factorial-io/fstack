describe("twig/index", () => {
  test("exports the correct data", () => {
    const twig = require("..");
    const lint = require("../lib/lint");

    expect(twig).toEqual({
      type: "twig",
      extensions: ["twig", "html.twig"],
      tasks: {
        lint,
      },
    });
  });
});
