describe("css/lib/token-import/strings/radii", () => {
  test("returns an array with deduplicated radii values", () => {
    const radii = require("../../../../lib/token-import/strings/radii");

    expect(
      radii([
        {
          name: "radius-Primary",
          values: {
            topLeft: "0.1rem",
            topRight: "0.2rem",
            bottomRight: "0.3rem",
            bottomLeft: "0.4rem",
          },
        },
      ])
    ).toEqual(`  --radius-Primary-top-left: 0.1rem;
  --radius-Primary-top-right: 0.2rem;
  --radius-Primary-bottom-right: 0.3rem;
  --radius-Primary-bottom-left: 0.4rem;
  --radius-Primary: var(--radius-Primary-top-left) var(--radius-Primary-top-right) var(--radius-Primary-bottom-right) var(--radius-Primary-bottom-left);
`);
  });
});
