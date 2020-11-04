const path = require("path");

const targets = getTargets();

/**
 * Merges the default configuration with the user configuration
 * and resolves the paths.
 *
 * @returns {object} the merged configuration object
 */
module.exports = function getConfig() {
  const userConfig = getUserConfig();
  const defaultConfig = {
    use: [],
    assetFolders: [],
    cssFiles: [],
    customPropertyFiles: [],
    distFolder: "dist",
    jsFiles: [],
    rootFolder: "src",
    testsFolder: "tests",
    svgFolders: [],
    addHashes: false,
  };

  return resolveConfigPaths({ ...defaultConfig, ...userConfig });
};

/**
 * @returns {object}
 */
function getPackageJsonObject() {
  try {
    // Usually the package.json should be required via `path.join(process.cwd(), "package.json")`,
    // but there is a special case where this doesn't work:
    // When using Sublime Text with a project, where the package.json, .eslintrc, .stylelintrc etc
    // are not in the root folder, `process.cwd()` would point to the root folder instead of the folder where
    // those files are. That's why we need to go up from the running process (this stack in the node_modules folder).
    return require(path.join(__dirname, "../../../package.json")); // eslint-disable-line
  } catch (e) {
    return {};
  }
}

/**
 * @returns {object}
 */
function getTargets() {
  const pjson = getPackageJsonObject();

  if (pjson.targets) return pjson.targets;
  if (pjson.browserslist) return pjson.browserslist;

  return {
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
 * @returns {object}
 */
function getUserConfig() {
  const configFileName = ".factorialrc.js";
  let conf;

  try {
    conf = require(path.join(process.cwd(), configFileName)); // eslint-disable-line
  } catch (e) {
    conf = {};
    console.error(e.message);
  }

  if (conf && !conf.targets) {
    conf.targets = targets;
  }

  return conf;
}

/**
 * Resolves all paths in the given config to absolute paths
 *
 * @param {object} conf
 * @returns {object} the config object with resolved paths
 */
function resolveConfigPaths(conf) {
  const copy = { ...conf };

  copy.distFolder = path.join(process.cwd(), conf.distFolder);
  copy.rootFolder = path.join(process.cwd(), conf.rootFolder);
  copy.cssFiles = conf.cssFiles.map((file) => path.join(conf.rootFolder, file));
  copy.customPropertyFiles = conf.customPropertyFiles.map((file) =>
    path.join(conf.rootFolder, file)
  );
  copy.jsFiles = conf.jsFiles.map((file) => path.join(conf.rootFolder, file));
  copy.assetFolders = conf.assetFolders.map((folder) =>
    path.join(copy.rootFolder, folder)
  );
  copy.svgFolders = conf.svgFolders.map((folder) =>
    path.join(copy.rootFolder, folder)
  );

  return copy;
}
