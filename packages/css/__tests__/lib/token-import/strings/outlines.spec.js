describe("css/lib/token-import/strings/outlines", () => {
  test("returns an array with deduplicated outlines values", () => {
    const outlines = require("../../../../lib/token-import/strings/outlines");

    expect(
      outlines([
        {
          name: "outline-Primary",
          values: {
            width: "0.1rem",
            style: "solid",
            color: "rgba(255, 0, 0, 1)",
          },
        },
      ])
    ).toEqual(`  --outline-Primary-width: 0.1rem;
  --outline-Primary-style: solid;
  --outline-Primary-color: rgba(255, 0, 0, 1);
  --outline-Primary: var(--outline-Primary-width) var(--outline-Primary-style) var(--outline-Primary-color);`);
  });
});
