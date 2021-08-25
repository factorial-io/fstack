describe("css/lib/token-import/styles/colors", () => {
  describe("with styles in the artboard", () => {
    test("returns an array with deduplicated colors values in rgba", () => {
      const colors = require("../../../../lib/token-import/styles/colors");

      expect(
        colors({
          children: [
            {
              name: "Primary",
              fills: [
                {
                  color: {
                    r: 1,
                    g: 0,
                    b: 0,
                    a: 1,
                  },
                },
              ],
            },
            // This is an unlikely use case, but for whatever reason
            // there might be two nodes with the same name.
            // If that is the case, the second one should be ignored.
            {
              name: "Primary",
              fills: [
                {
                  color: "red",
                },
              ],
            },
          ],
        })
      ).toEqual([
        {
          name: "Primary",
          values: {
            r: 255,
            g: 0,
            b: 0,
            a: 1,
          },
        },
      ]);
    });
  });

  describe("without styles in the artboard", () => {
    test("returns an empty array", () => {
      const colors = require("../../../../lib/token-import/styles/colors");

      expect(
        colors({
          children: [],
        })
      ).toEqual([]);
    });
  });
});
