describe("css/lib/token-import/styles/outlines", () => {
  describe("with styles in the artboard", () => {
    test("returns an array with deduplicated outlines values", () => {
      const outlines = require("../../../../lib/token-import/styles/outlines");

      expect(
        outlines(
          {
            children: [
              {
                name: "should-be-ignored",
                strokeWeight: 5,
                strokes: [
                  {
                    type: "SOLID",
                  },
                ],
                styles: {},
              },
              {
                type: "RECTANGLE",
                name: "outline-1",
                strokeWeight: 1,
                strokes: [
                  {
                    type: "SOLID",
                    color: {
                      r: 1,
                      g: 0,
                      b: 0,
                      a: 1,
                    },
                  },
                ],
                styles: {},
              },
              {
                type: "RECTANGLE",
                name: "outline-3",
                strokeWeight: 3,
                strokes: [
                  {
                    type: "SOLID",
                  },
                ],
                styles: {
                  stroke: "ID_3",
                },
              },
              // This is an unlikely use case, but for whatever reason
              // there might be two nodes with the same name.
              // If that is the case, the second one should be ignored.
              {
                type: "RECTANGLE",
                name: "outline-3",
                strokeWeight: 3,
                strokes: [
                  {
                    type: "SOLID",
                  },
                ],
                styles: {
                  stroke: "ID_4",
                },
              },
            ],
          },
          10,
          {
            ID_3: {
              name: "Stroke3",
            },
            ID_4: {
              name: "Stroke4",
            },
          }
        )
      ).toEqual([
        {
          name: "outline-1",
          values: {
            width: "0.1rem",
            style: "solid",
            color: "rgba(255, 0, 0, 1)",
          },
        },
        {
          name: "outline-3",
          values: {
            width: "0.3rem",
            style: "solid",
            color: "var(--color-decoration-Stroke3)",
          },
        },
      ]);
    });
  });

  describe("without styles in the artboard", () => {
    test("returns an empty array", () => {
      const outlines = require("../../../../lib/token-import/styles/outlines");

      expect(
        outlines(
          {
            children: [],
          },
          {}
        )
      ).toEqual([]);
    });
  });
});
