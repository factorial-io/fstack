describe("css/lib/token-import/styles/radii", () => {
  describe("with styles in the artboard", () => {
    test("returns an array with deduplicated radii values", () => {
      const radii = require("../../../../lib/token-import/styles/radii");

      expect(
        radii(
          {
            children: [
              {
                type: "RECTANGLE",
                name: "radius-3",
                cornerRadius: 5,
              },
              // This is an unlikely use case, but for whatever reason
              // there might be two nodes with the same name.
              // If that is the case, the second one should be ignored.
              {
                type: "RECTANGLE",
                name: "radius-3",
                cornerRadius: 5,
              },
            ],
          },
          10
        )
      ).toEqual([
        {
          name: "radius-3",
          values: {
            topLeft: "0.5rem",
            topRight: "0.5rem",
            bottomRight: "0.5rem",
            bottomLeft: "0.5rem",
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
