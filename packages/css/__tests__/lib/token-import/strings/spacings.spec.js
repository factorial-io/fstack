describe("css/lib/token-import/strings/spacings", () => {
  test("returns an array with deduplicated spacings values in rgba", () => {
    const spacings = require("../../../../lib/token-import/strings/spacings");

    expect(
      spacings([
        {
          name: "1",
          value: "1rem",
        },
        {
          name: "2",
          value: "2rem",
        },
      ])
    ).toEqual(`  --spacing-1: 1rem;
  --spacing-2: 2rem;`);
  });
});
