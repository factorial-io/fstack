/* eslint no-console: 0 */
const deepMerge = require("deepmerge");
const path = require("path");

const init = require("./lib/init");
const build = require("./lib/build");
const lint = require("./lib/lint");
const watch = require("./lib/watch");
const test = require("./lib/test");

const command = process.argv.slice(2)[0];

let pjs;

try {
  /**
   * Usually the package.json should be required via `path.join(process.cwd(), "package.json")`,
   * but there is a special case where this doesn't work:
   * When using Sublime Text with a project, where the package.json, .eslintrc, .stylelintrc etc
   * are not in the root folder, `process.cwd()` would point to the root folder instead of the folder where
   * those files are. That's why we need to go up from the running process (this stack in the node_modules folder).
   */
  pjs = require(path.join(__dirname, "../../../package.json")); // eslint-disable-line
} catch (e) {
  pjs = {};
}

let targets;

if (pjs.targets || pjs.browserslist) {
  targets = pjs.targets || pjs.browserslist;
} else {
  targets = {
    browsers: [
      "last 2 versions",
      ">1%",
      "not ie 10",
      "not op_mini all",
      "not op_mob <= 46",
      "not ie_mob <= 11",
    ],
  };
}

/**
 * Returns the user configuration if available.
 * Otherwise an empty object.
 *
 * @returns {object} the user configuration
 */
function getUserConfig() {
  const configFileName = ".factorialrc.js";
  let cnf = {};

  try {
    cnf = require(path.join(process.cwd(), configFileName)); // eslint-disable-line
  } catch (e) {
    console.log(e.message);
  }

  return deepMerge(cnf, {
    targets,
  });
}

/**
 * Resolves all paths in the given config to absolute paths
 *
 * @param {object} config - the configuration object
 * @returns {object} the config object with resolved paths
 */
function resolveConfigPaths(config) {
  const cnf = { ...config };

  cnf.distFolder = path.join(process.cwd(), config.distFolder);
  cnf.rootFolder = path.join(process.cwd(), config.rootFolder);
  cnf.cssFiles = config.cssFiles.map((file) =>
    path.join(config.rootFolder, file)
  );
  cnf.jsFiles = config.jsFiles.map((file) =>
    path.join(config.rootFolder, file)
  );
  cnf.assetFolders = config.assetFolders.map((folder) =>
    path.join(cnf.rootFolder, folder)
  );

  return cnf;
}

/**
 * Merges the default configuration with the user configuration
 * and resolves the paths.
 *
 * @returns {object} the merged configuration object
 */
function getConfig() {
  const userConfig = getUserConfig();
  const defaultConfig = {
    use: [],
    assetFolders: [],
    cssFiles: [],
    distFolder: "dist",
    jsFiles: [],
    rootFolder: "src",
    testsFolder: "tests",
  };

  return resolveConfigPaths(deepMerge(defaultConfig, userConfig));
}

/**
 * Runs the correct script based on the given command.
 * Can be any of "lint", "build", "watch".
 *
 * @param {string} cmd - the command from the cli
 * @param {object} config - the configuration object
 */
async function run(cmd, config) {
  switch (cmd) {
    case "init":
      init();
      break;
    case "watch":
      watch(config);
      break;
    case "lint":
      {
        const type = process.argv.slice(3)[0];
        const valid = await lint(config, type);
        process.exit(valid ? 0 : 1);
      }
      break;
    case "test":
      {
        const type = process.argv.slice(3)[0];
        const valid = await test(config, type);
        process.exit(valid ? 0 : 1);
      }
      break;
    case "build": {
      await build(config);
      process.exit(0);
      break;
    }
    default:
  }
}

const commands = new Set(["init", "lint", "build", "watch", "test"]);
const config = getConfig();

if (command && commands.has(command)) {
  run(command, config);
  // } else {
  //   config.use.forEach((extension) => {
  //     if (extension.eslint && extension.eslint.config) {
  //       eslintConfig = deepMerge(eslintConfig, extension.eslint.config);
  //     }

  //     if (extension.stylelint && extension.stylelint.config) {
  //       stylelintConfig = deepMerge(stylelintConfig, extension.stylelint.config);
  //     }
  //   });
}

module.exports = {
  targets,
};
