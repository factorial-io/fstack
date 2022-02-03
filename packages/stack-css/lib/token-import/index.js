const chalk = require("chalk");
const deepMerge = require("deepmerge");
const env = require("node-env-file");
const fetch = require("node-fetch");
const path = require("path");

const writeFile = require("./write-file");
const getColors = require("./styles/colors");
const getOutlines = require("./styles/outlines");
const getRadii = require("./styles/radii");
const getShadows = require("./styles/shadows");
const getSpacings = require("./styles/spacings");
const getTypography = require("./styles/typography");

module.exports = async function createTokens({ rootFolder, cssTokens = {} }) {
  console.log(`\n${chalk.magenta.bold("Importing tokens")}…`);

  const config = deepMerge(
    {
      file: "css/tokens.css",
      figma: {
        token: null,
        id: null,
      },
      page: "Design tokens",
      layers: {
        colors: "colors",
        other: "other",
        spacings: "spacings",
        typography: "typography",
      },
    },
    cssTokens
  );
  const styles = {};
  let envFile;

  try {
    envFile = env(path.join(process.cwd(), ".env"));
  } catch (e) {
    envFile = {};
  }

  if (process.env.FIGMA_TOKEN) {
    config.figma.token = process.env.FIGMA_TOKEN;
  } else if (envFile && envFile.FIGMA_TOKEN) {
    config.figma.token = envFile.FIGMA_TOKEN;
  }

  if (process.env.FIGMA_ID) {
    config.figma.id = process.env.FIGMA_ID;
  } else if (envFile && envFile.FIGMA_ID) {
    config.figma.id = envFile.FIGMA_ID;
  }

  if (!config.figma.token || !config.figma.id) {
    if (!config.figma.token) {
      console.error(
        `\n${chalk.red.bold(
          "Error:"
        )} cssTokens.figma.token is missing in the configuration file.`
      );
    }
    if (!config.figma.id) {
      console.error(
        `\n${chalk.red.bold(
          "Error:"
        )} cssTokens.figma.id is missing in the configuration file.`
      );
    }
    return Promise.reject();
  }

  // @ts-ignore
  const result = await fetch(
    `https://api.figma.com/v1/files/${config.figma.id}`,
    {
      headers: {
        "X-Figma-Token": config.figma.token,
      },
    }
  );

  const structure = await result.json();
  if (
    structure.status &&
    (structure.status === 403 || structure.status === 404)
  ) {
    if (structure.status === 403) {
      console.error(`\n${chalk.red.bold("Error:")} Authentication failed.`);
    }
    if (structure.status === 404) {
      console.error(
        `\n${chalk.red.bold("Error:")} Couldn't find Figma file "${
          config.figma.id
        }".`
      );
    }
    return Promise.reject();
  }

  if (!structure.document || !structure.document.children) {
    return Promise.reject();
  }

  const artboard = structure.document.children.find(
    ({ name }) => name === config.page
  );
  if (!artboard) {
    console.error(
      `\n${chalk.red.bold("Error:")} Couldn't find page "${
        config.page
      }" in your Figma file.`
    );
    return Promise.reject();
  }

  if (!artboard.children) {
    return Promise.reject();
  }

  styles.colors = getColors(
    artboard.children.find(({ name }) => name === config.layers.colors)
  );
  // In the Figma file a color from the "local styles" might be used for outlines.
  // To reflect that in our outline custom properties, we should use the custom property for the respective color.
  // To be able to do that, we need to pass the styles here.
  styles.outlines = getOutlines(
    artboard.children.find(({ name }) => name === config.layers.other),
    structure.styles
  );
  styles.radii = getRadii(
    artboard.children.find(({ name }) => name === config.layers.other)
  );
  styles.shadows = getShadows(
    artboard.children.find(({ name }) => name === config.layers.other)
  );
  styles.spacings = getSpacings(
    artboard.children.find(({ name }) => name === config.layers.spacings)
  );
  styles.typography = getTypography(
    artboard.children.find(({ name }) => name === config.layers.typography)
  );

  return new Promise((resolve, reject) =>
    // eslint-disable-next-line no-promise-executor-return
    writeFile(rootFolder, config.file, styles).then(resolve).catch(reject)
  );
};
