describe("css/lib/token-import/styles/typography", () => {
  describe("with styles in the artboard", () => {
    test("returns an array with deduplicated typography values in rem", () => {
      const typography = require("../../../../lib/token-import/styles/typography");

      expect(
        typography({
          children: [
            {
              name: "Primary",
              style: {
                fontFamily: "font-family-value",
                fontWeight: "font-weight-value",
                fontSize: 24,
                italic: true,
                letterSpacing: 0.5252525,
                lineHeightPercent: 150.12345,
              },
            },
            // This is an unlikely use case, but for whatever reason
            // there might be two nodes with the same name.
            // If that is the case, the second one should be ignored.
            {
              name: "Primary",
              style: {
                fontFamily: "font-family-value",
                fontWeight: "font-weight-value",
                fontSize: 24,
                italic: true,
                letterSpacing: 0.5252525,
                lineHeightPercent: 150.12345,
              },
            },
          ],
        })
      ).toEqual([
        {
          name: "Primary",
          values: {
            fontFamily: "font-family-value",
            fontWeight: "font-weight-value",
            fontSize: "2.4rem",
            fontStyle: "italic",
            letterSpacing: "0.53",
            lineHeight: "1.50",
          },
        },
      ]);
    });
  });

  describe("without styles in the artboard", () => {
    test("returns an empty array", () => {
      const typography = require("../../../../lib/token-import/styles/typography");

      expect(
        typography({
          children: [],
        })
      ).toEqual([]);
    });
  });

  describe("child with no 'style' property", () => {
    test("returns an empty array", () => {
      const typography = require("../../../../lib/token-import/styles/typography");

      expect(
        typography({
          children: [{ name: 'BTN' }]
        })
      ).toEqual([])
    })
  })
});
