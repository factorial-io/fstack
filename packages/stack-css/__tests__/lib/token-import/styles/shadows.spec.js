describe("css/lib/token-import/styles/shadows", () => {
  describe("with styles in the artboard", () => {
    test("returns an array with deduplicated shadows values", () => {
      const shadows = require("../../../../lib/token-import/styles/shadows");

      expect(
        shadows(
          {
            children: [
              {
                type: "RECTANGLE",
                name: "outer-shadow-Default",
                effects: [
                  {
                    visible: true,
                    offset: {
                      x: 20,
                      y: 30,
                    },
                    radius: 40,
                    color: {
                      r: 1,
                      g: 0,
                      b: 0,
                      a: 1,
                    },
                    type: "DROP_SHADOW",
                  },
                ],
              },
              {
                type: "RECTANGLE",
                name: "outer-shadow-Active",
                effects: [
                  {
                    visible: true,
                    offset: {
                      x: 20,
                      y: 30,
                    },
                    radius: 40,
                    color: {
                      r: 1,
                      g: 0,
                      b: 0,
                      a: 1,
                    },
                    type: "INNER_SHADOW",
                  },
                ],
              },
              // This is an unlikely use case, but for whatever reason
              // there might be two nodes with the same name.
              // If that is the case, the second one should be ignored.
              {
                type: "RECTANGLE",
                name: "outer-shadow-Active",
                effects: [
                  {
                    offset: {
                      x: 20,
                      y: 30,
                    },
                    radius: 40,
                    color: {
                      r: 1,
                      g: 0,
                      b: 0,
                      a: 1,
                    },
                    type: "INNER_SHADOW",
                  },
                ],
              },
              //
            ],
          },
          10
        )
      ).toEqual([
        {
          name: "outer-shadow-Default",
          values: [
            {
              x: "2rem",
              y: "3rem",
              blur: "4rem",
              color: "rgba(255, 0, 0, 1)",
              spread: false,
              inset: false,
            },
          ],
        },
        {
          name: "outer-shadow-Active",
          values: [
            {
              x: "2rem",
              y: "3rem",
              blur: "4rem",
              color: "rgba(255, 0, 0, 1)",
              inset: true,
              spread: false,
            },
          ],
        },
      ]);
    });
  });

  describe("without styles in the artboard", () => {
    test("returns an empty array", () => {
      const shadows = require("../../../../lib/token-import/styles/shadows");

      expect(
        shadows({
          children: [],
        })
      ).toEqual([]);
    });
  });
});
