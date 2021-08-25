const chalk = require("chalk");

const rootFolder = "rootFolder";
const id = "id";
const token = "token";

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();

  console.log = jest.fn();
  jest.mock("fs");
});

describe("tokens/lib/token-import", () => {
  describe("without config.figma.token", () => {
    test("returns a rejected Promise and renders an error messages", async () => {
      const tokenImport = require("../../../lib/token-import");
      const spy = jest.spyOn(console, "error").mockImplementation();

      const response = tokenImport({ rootFolder });

      expect(spy).toHaveBeenCalledWith(
        `\n${chalk.red.bold(
          "Error:"
        )} cssTokens.figma.token is missing in the configuration file.`
      );
      await expect(response).rejects.toEqual(undefined);
    });
  });

  describe("without config.figma.id", () => {
    test("returns a rejected Promise and renders an error messages", async () => {
      const tokenImport = require("../../../lib/token-import");
      const spy = jest.spyOn(console, "error").mockImplementation();

      const response = tokenImport({ rootFolder });

      expect(spy).toHaveBeenCalledWith(
        `\n${chalk.red.bold(
          "Error:"
        )} cssTokens.figma.id is missing in the configuration file.`
      );
      await expect(response).rejects.toEqual(undefined);
    });
  });

  describe("with config.figma.token and config.figma.id", () => {
    test("fetches data from the Figma API", async () => {
      mockFetch();
      jest.mock("../../../lib/token-import/styles/colors");
      jest.mock("../../../lib/token-import/write-file", () => {
        return () => Promise.resolve();
      });

      const tokenImport = require("../../../lib/token-import");
      const fetch = require("node-fetch");

      await tokenImport({
        rootFolder,
        cssTokens: {
          figma: {
            id,
            token,
          },
        },
      });

      expect(fetch).toHaveBeenCalledWith(
        `https://api.figma.com/v1/files/${id}`,
        {
          headers: {
            "X-Figma-Token": token,
          },
        }
      );
    });

    describe("failing fetch", () => {
      describe("due to invalid config.figma.token", () => {
        test("returns a rejected Promise and renders an error messages", async () => {
          jest.mock("node-fetch", () => {
            return jest.fn(() =>
              Promise.resolve({
                json: () =>
                  Promise.resolve({
                    status: 403,
                  }),
              })
            );
          });

          const tokenImport = require("../../../lib/token-import");
          const spy = jest.spyOn(console, "error").mockImplementation();

          await expect(
            tokenImport({
              rootFolder,
              cssTokens: {
                figma: {
                  id,
                  token,
                },
              },
            })
          ).rejects.toEqual(undefined);

          expect(spy).toHaveBeenCalledWith(
            `\n${chalk.red.bold("Error:")} Authentication failed.`
          );
        });
      });

      describe("due to invalid config.figma.id", () => {
        test("returns a rejected Promise and renders an error messages", async () => {
          jest.mock("node-fetch", () => {
            return jest.fn(() =>
              Promise.resolve({
                json: () =>
                  Promise.resolve({
                    status: 404,
                  }),
              })
            );
          });

          const tokenImport = require("../../../lib/token-import");
          const spy = jest.spyOn(console, "error").mockImplementation();

          await expect(
            tokenImport({
              rootFolder,
              cssTokens: {
                figma: {
                  id,
                  token,
                },
              },
            })
          ).rejects.toEqual(undefined);

          expect(spy).toHaveBeenCalledWith(
            `\n${chalk.red.bold("Error:")} Couldn't find Figma file "${id}".`
          );
        });
      });
    });

    describe("successful fetch", () => {
      describe("with invalid page name", () => {
        test("returns a rejected Promise and renders an error messages", async () => {
          mockFetch();
          jest.fn(() => Promise.reject(new Error()));

          const tokenImport = require("../../../lib/token-import");
          const spy = jest.spyOn(console, "error").mockImplementation();
          const page = "invalid page name";

          await expect(
            tokenImport({
              rootFolder,
              cssTokens: {
                page,
                figma: {
                  id,
                  token,
                },
              },
            })
          ).rejects.toEqual(undefined);

          expect(spy).toHaveBeenCalledWith(
            `\n${chalk.red.bold(
              "Error:"
            )} Couldn't find page "${page}" in your Figma file.`
          );
        });
      });

      describe("with valid page name", () => {
        test("calls the correct module for each layer", async () => {
          mockFetch();
          jest.mock("../../../lib/token-import/styles/colors");
          jest.mock("../../../lib/token-import/write-file", () => {
            return () => Promise.resolve();
          });

          const tokenImport = require("../../../lib/token-import");
          const getColors = require("../../../lib/token-import/styles/colors");

          await tokenImport({
            rootFolder,
            cssTokens: {
              figma: {
                id,
                token,
              },
            },
          });

          expect(getColors).toHaveBeenCalledWith({
            name: "colors",
            colors: [],
          });
        });

        test("calls token-import/write-file", async () => {
          mockFetch();
          jest.mock("../../../lib/token-import/styles/colors", () => {
            return () => ["colors"];
          });
          jest.mock("../../../lib/token-import/write-file", () => {
            return jest.fn(() => Promise.resolve());
          });

          const tokenImport = require("../../../lib/token-import");
          const writeFile = require("../../../lib/token-import/write-file");

          await tokenImport({
            rootFolder,
            cssTokens: {
              figma: {
                id,
                token,
              },
            },
          });

          expect(writeFile).toHaveBeenCalledWith(rootFolder, "css/tokens.css", {
            colors: ["colors"],
            outlines: [],
            radii: [],
            shadows: [],
            spacings: [],
            typography: [],
          });
        });

        describe("when writing the css file fails", () => {
          test("returns a rejected promise", async () => {
            mockFetch();
            jest.mock("../../../lib/token-import/styles/colors", () => {
              return () => Promise.resolve();
            });
            jest.mock("../../../lib/token-import/write-file", () => {
              return jest.fn(() => Promise.reject());
            });

            const tokenImport = require("../../../lib/token-import");

            const response = tokenImport({
              rootFolder,
              cssTokens: {
                figma: {
                  id,
                  token,
                },
              },
            });

            await expect(response).rejects.toEqual(undefined);
          });
        });

        describe("when writing the css file succeeds", () => {
          test("returns a resolved promise", async () => {
            mockFetch();
            jest.mock("../../../lib/token-import/styles/colors", () => {
              return () => Promise.resolve();
            });
            jest.mock("../../../lib/token-import/write-file", () => {
              return jest.fn(() => Promise.resolve());
            });

            const tokenImport = require("../../../lib/token-import");

            const response = tokenImport({
              rootFolder,
              cssTokens: {
                figma: {
                  id,
                  token,
                },
              },
            });

            await expect(response).resolves.toEqual(undefined);
          });
        });
      });
    });
  });
});

/**
 * @returns {void}
 */
function mockFetch() {
  jest.mock("node-fetch", () => {
    return jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            document: {
              children: [
                {
                  name: "Design tokens",
                  children: [
                    {
                      name: "colors",
                      colors: [],
                    },
                  ],
                },
              ],
            },
          }),
      })
    );
  });
}
