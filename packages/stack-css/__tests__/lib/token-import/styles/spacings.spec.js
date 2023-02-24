describe("css/lib/token-import/styles/spacings", () => {
  describe("with styles in the artboard", () => {
    test("returns an array with deduplicated spacings values in rem", () => {
      const spacings = require("../../../../lib/token-import/styles/spacings");

      expect(
        spacings(
          {
            children: [
              {
                name: 12,
                type: "RECTANGLE",
                absoluteBoundingBox: {
                  width: 12,
                },
              },
              // This is an unlikely use case, but for whatever reason
              // there might be two nodes with the same name.
              // If that is the case, the second one should be ignored.
              {
                name: 12,
                type: "RECTANGLE",
                absoluteBoundingBox: {
                  width: 12,
                },
              },
            ],
          },
          10
        )
      ).toEqual([
        {
          name: "12",
          value: "1.2rem",
        },
      ]);
    });
  });

  describe("without styles in the artboard", () => {
    test("returns an empty array", () => {
      const spacings = require("../../../../lib/token-import/styles/spacings");

      expect(
        spacings({
          children: [],
        })
      ).toEqual([]);
    });
  });
});
