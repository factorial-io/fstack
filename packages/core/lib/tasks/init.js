const chalk = require("chalk");
const fs = require("fs");
const inquirer = require("inquirer");
const { spawn } = require("child_process");

const configPath = ".factorialrc.js";
const packages = ["css", "e2e", "html", "images", "javascript", "svg", "twig"];

const scopeName = "@factorial";
const packagePrefix = "stack";

/**
 * @param {string} name
 * @returns {string}
 */
function getNodeModuleName(name) {
  return `${scopeName}/${packagePrefix}-${name}`;
}

/**
 * Installs all selected packages via yarn by spawning a new child process
 *
 * @param {Array} selectedPackages
 * @returns {Promise}
 */
function installPackages(selectedPackages) {
  if (selectedPackages.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    const process = spawn("yarn", [
      "add",
      "-D",
      ...selectedPackages.map((p) => getNodeModuleName(p)),
    ]);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.log(data.toString());
    });

    process.on("error", (error) => {
      console.log(`${chalk.red("\nERROR:")} ${error.message}`);
    });

    process.on("close", (code) => {
      resolve(code === 0);
    });
  });
}

/**
 * Creates a .factorialrc.js with content based on the selected packages
 *
 * @param {Array} selectedPackages
 * @returns {void}
 */
async function createConfig(selectedPackages) {
  let use = "";

  if (selectedPackages.length > 0) {
    use = `
  use: [${selectedPackages
    .map(
      (p) => `
    require("${getNodeModuleName(p)}")`
    )
    .join(",")}
  ]
`;
  }

  await checkIfFileExists(
    configPath,
    `module.exports = {${use}};
`
  );
}

/**
 * @param {Array} selectedPackages
 */
async function createPackageConfigs(selectedPackages) {
  /* eslint-disable no-restricted-syntax */
  for (const pkg of selectedPackages) {
    const { configFiles } = require(`../../../${packagePrefix}-${pkg}`); // eslint-disable-line global-require, import/no-dynamic-require

    if (Array.isArray(configFiles)) {
      for (const { name, content = "" } of configFiles) {
        await checkIfFileExists(name, content); // eslint-disable-line no-await-in-loop
      }
    }
  }
  /* eslint-enable */
}

/**
 * @param {string} pathToConfigFile
 * @param {string} content
 * @returns {Promise}
 */
async function checkIfFileExists(pathToConfigFile, content) {
  try {
    fs.readFileSync(pathToConfigFile, "utf-8");
    const { overwriteConfig } = await inquirer.prompt([
      {
        type: "confirm",
        message: `The file ${pathToConfigFile} already exists. Do you want to overwrite it?`,
        name: "overwriteConfig",
      },
    ]);
    if (overwriteConfig) {
      return writeFile(pathToConfigFile, content);
    }

    return true;
  } catch (e) {
    return writeFile(pathToConfigFile, content);
  }
}

/**
 * @param {*} pathToConfigFile
 * @param {string} content
 * @returns {Promise}
 */
function writeFile(pathToConfigFile, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      pathToConfigFile,
      content,
      "utf-8",
      function writeConfigFileCallback(err) {
        if (err) {
          console.error(err);
          reject();
        }
        resolve();
      }
    );
  });
}

module.exports = function init() {
  inquirer
    .prompt([
      {
        type: "checkbox",
        message: "Select the packages which are required for your project",
        name: "packages",
        choices: packages,
      },
    ])
    .then(async (answers) => {
      await createConfig(answers.packages);
      await installPackages(answers.packages);
      await createPackageConfigs(answers.packages);
      process.exit(0);
    });
};
