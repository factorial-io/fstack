describe("css/lib/token-import/strings/shadows", () => {
  test("returns an array with deduplicated shadows values", () => {
    const shadows = require("../../../../lib/token-import/strings/shadows");

    expect(
      shadows([
        {
          name: "outer-shadow-Primary",
          values: [
            {
              x: "0.4rem",
              y: "0.4rem",
              blur: "4rem",
              color: "rgba(0, 0, 0, 0.25)",
            },
          ],
        },
        {
          name: "inner-shadow-Primary",
          values: [
            {
              x: "0.4rem",
              y: "0.4rem",
              blur: "1rem",
              color: "rgba(0, 0, 0, 0.25)",
              inset: true,
            },
          ],
        },
      ])
    ).toEqual(`  --outer-shadow-Primary-inset:;
  --outer-shadow-Primary-x: 0.4rem;
  --outer-shadow-Primary-y: 0.4rem;
  --outer-shadow-Primary-blur: 4rem;
  --outer-shadow-Primary-spread: ;
  --outer-shadow-Primary-color: rgba(0, 0, 0, 0.25);
  --outer-shadow-Primary: var(--outer-shadow-Primary-inset) var(--outer-shadow-Primary-x) var(--outer-shadow-Primary-y) var(--outer-shadow-Primary-blur) var(--outer-shadow-Primary-spread) var(--outer-shadow-Primary-color);

  --inner-shadow-Primary-inset: inset;
  --inner-shadow-Primary-x: 0.4rem;
  --inner-shadow-Primary-y: 0.4rem;
  --inner-shadow-Primary-blur: 1rem;
  --inner-shadow-Primary-spread: ;
  --inner-shadow-Primary-color: rgba(0, 0, 0, 0.25);
  --inner-shadow-Primary: var(--inner-shadow-Primary-inset) var(--inner-shadow-Primary-x) var(--inner-shadow-Primary-y) var(--inner-shadow-Primary-blur) var(--inner-shadow-Primary-spread) var(--inner-shadow-Primary-color);
`);
  });
});
