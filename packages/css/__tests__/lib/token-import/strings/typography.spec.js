describe("css/lib/token-import/strings/typography", () => {
  test("returns an array with deduplicated typography values", () => {
    const typography = require("../../../../lib/token-import/strings/typography");

    expect(
      typography([
        {
          name: "Primary",
          values: {
            fontStyle: "font-style-value",
            fontWeight: "font-weight-value",
            fontSize: "font-size-value",
            lineHeight: "line-height-value",
            fontFamily: "font-family-value",
          },
        },
      ])
    ).toEqual(`  --typo-Primary-font-style: font-style-value;
  --typo-Primary-font-weight: font-weight-value;
  --typo-Primary-font-size: font-size-value;
  --typo-Primary-line-height: line-height-value;
  --typo-Primary-font-family: font-family-value;
  --typo-Primary: var(--typo-Primary-font-style) var(--typo-Primary-font-weight) var(--typo-Primary-font-size)/var(--typo-Primary-line-height) var(--typo-Primary-font-family);`);
  });
});
