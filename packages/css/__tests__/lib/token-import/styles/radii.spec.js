describe("css/lib/token-import/styles/radii", () => {
  describe("with styles in the artboard", () => {
    test("returns an array with deduplicated radii values", () => {
      const radii = require("../../../../lib/token-import/styles/radii");

      expect(
        radii({
          children: [
            {
              type: "RECTANGLE",
              name: "radius-3",
              rectangleCornerRadii: [1, 2, 3, 4],
            },
            // This is an unlikely use case, but for whatever reason
            // there might be two nodes with the same name.
            // If that is the case, the second one should be ignored.
            {
              type: "RECTANGLE",
              name: "radius-3",
              rectangleCornerRadii: [1, 2, 3, 4],
            },
          ],
        })
      ).toEqual([
        {
          name: "radius-3",
          values: {
            topLeft: "0.1rem",
            topRight: "0.2rem",
            bottomRight: "0.3rem",
            bottomLeft: "0.4rem",
          },
        },
      ]);
    });
  });

  describe("without styles in the artboard", () => {
    test("returns an empty array", () => {
      const radii = require("../../../../lib/token-import/styles/radii");

      expect(
        radii({
          children: [],
        })
      ).toEqual([]);
    });
  });
});
