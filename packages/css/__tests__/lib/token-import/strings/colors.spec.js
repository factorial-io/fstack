describe("css/lib/token-import/strings/colors", () => {
  test("returns an array with deduplicated colors values", () => {
    const colors = require("../../../../lib/token-import/strings/colors");

    expect(
      colors([
        {
          name: "Primary",
          values: {
            r: 255,
            g: 0,
            b: 0,
            a: 1,
          },
        },
      ])
    ).toEqual(`  --color-Primary-r: 255;
  --color-Primary-g: 0;
  --color-Primary-b: 0;
  --color-Primary-a: 1;
  --color-Primary: rgba(var(--color-Primary-r), var(--color-Primary-g), var(--color-Primary-b), var(--color-Primary-a));`);
  });
});
