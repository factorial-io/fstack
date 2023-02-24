const chalk = require("chalk");
const path = require("path");

const rootFolder = "rootFolder";
const file = "css/tokens.css";
const styles = {
  colors: [
    {
      name: "Primary",
      values: {
        r: 255,
        g: 0,
        b: 0,
        a: 1,
      },
    },
  ],
  outlines: [
    {
      name: "outline-1",
      values: {
        width: ".1rem",
        style: "solid",
        color: "var(--color-Primary)",
      },
    },
  ],
  radii: [
    {
      name: "radius-3",
      values: {
        topLeft: ".3rem",
        topRight: ".3rem",
        bottomRight: ".3rem",
        bottomLeft: ".3rem",
      },
    },
  ],
  shadows: [
    {
      name: "shadow-Default",
      values: {
        x: ".1rem",
        y: ".1rem",
        blur: "1rem",
        color: "rgba(0, 0, 0, 1)",
      },
    },
  ],
  spacings: [
    {
      name: "12",
      value: "1.2rem",
    },
  ],
  typography: [
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
  ],
};

jest.mock("../../../lib/token-import/strings/colors", () => () => "colors");
jest.mock("../../../lib/token-import/strings/outlines", () => () => "outlines");
jest.mock("../../../lib/token-import/strings/radii", () => () => "radii");
jest.mock("../../../lib/token-import/strings/shadows", () => () => "shadows");
jest.mock("../../../lib/token-import/strings/spacings", () => () => "spacings");
jest.mock(
  "../../../lib/token-import/strings/typography",
  () => () => "typography"
);

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();

  console.log = jest.fn();
});

describe("css/lib/token-import/write-file", () => {
  describe("successful", () => {
    test("calls fs.writeFileSync, logs a message and returns a resolved Promise", async () => {
      jest.mock("fs", () => {
        return {
          mkdirSync: jest.fn(),
          writeFileSync: jest.fn(),
        };
      });
      const fs = require("fs");
      const spy = jest.spyOn(console, "log");
      const writeFile = require("../../../lib/token-import/write-file");

      const response = writeFile(rootFolder, file, styles);

      expect(fs.writeFileSync).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        chalk.green(`\nCreated rootFolder/css/tokens.css!`)
      );
      await expect(response).resolves.toEqual(undefined);
    });

    describe("with properties", () => {
      test("calls fs.writeFileSync with the correct string", () => {
        jest.mock("fs", () => {
          return {
            mkdirSync: jest.fn(),
            writeFileSync: jest.fn(),
          };
        });

        const fs = require("fs");
        const spy = jest.spyOn(fs, "writeFileSync");

        const writeFile = require("../../../lib/token-import/write-file");

        writeFile(rootFolder, file, styles);

        expect(spy).toHaveBeenCalledWith(
          path.join(rootFolder, file),
          `html {
  /* Colors */

colors

  /* Outlines */

outlines

  /* Radii */

radii

  /* Shadows */

shadows

  /* Spacings */

spacings

  /* Typography */

typography
}
`
        );
      });
    });

    describe("without properties", () => {
      test("calls fs.writeFileSync with the correct string", () => {
        jest.mock("fs", () => {
          return {
            mkdirSync: jest.fn(),
            writeFileSync: jest.fn(),
          };
        });

        const fs = require("fs");
        const spy = jest.spyOn(fs, "writeFileSync");

        const writeFile = require("../../../lib/token-import/write-file");

        writeFile(rootFolder, file, {
          colors: [],
          outlines: [],
          radii: [],
          shadows: [],
          spacings: [],
          typography: [],
        });

        expect(spy).toHaveBeenCalledWith(
          path.join(rootFolder, file),
          "html {}\n"
        );
      });
    });
  });

  describe("not successful", () => {
    describe("creating folder failed", () => {
      test("logs an error message and returns a rejected Promise", async () => {
        jest.mock("fs", () => {
          return {
            mkdirSync: () => {
              throw new Error("error");
            },
          };
        });
        console.error = jest.fn();

        const spy = jest.spyOn(console, "error");
        const writeFile = require("../../../lib/token-import/write-file");

        const response = writeFile(rootFolder, file, styles);

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(
          1,
          chalk.red(`\nCreating ${path.join(rootFolder, file)} failed!`)
        );
        expect(spy).toHaveBeenNthCalledWith(2, "error");
        await expect(response).rejects.toEqual(undefined);
      });
    });

    describe("creating file failed", () => {
      test("logs an error message and returns a rejected Promise", async () => {
        jest.mock("fs", () => {
          return {
            mkdirSync: () => {},
            writeFileSync: () => {
              throw new Error("error");
            },
          };
        });
        console.error = jest.fn();

        const spy = jest.spyOn(console, "error");
        const writeFile = require("../../../lib/token-import/write-file");

        const response = writeFile(rootFolder, file, styles);

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(
          1,
          chalk.red(`\nCreating ${path.join(rootFolder, file)} failed!`)
        );
        expect(spy).toHaveBeenNthCalledWith(2, "error");
        await expect(response).rejects.toEqual(undefined);
      });
    });
  });
});
