const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { spawn } = require("child_process");

const configPath = path.join(process.cwd(), ".factorialrc.js");
const packages = ["css", "images", "javascript", "svg", "twig"];

/**
 * @param {string} name
 * @returns {string}
 */
function getNodeModuleName(name) {
  return `@factorial/stack-${name}`;
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
function createConfig(selectedPackages) {
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

  fs.writeFile(
    configPath,
    `module.exports = {${use}};`,
    "utf-8",
    function writeConfigFileCallback(err) {
      if (err) {
        console.log(err);
      }
    }
  );
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
    .then((answers) => {
      try {
        fs.readFileSync(configPath, "utf-8");
        inquirer
          .prompt([
            {
              type: "confirm",
              message:
                "The configuration file already exists. Do you want to overwrite it?",
              name: "overwriteConfig",
            },
          ])
          .then((answer) => {
            if (answer.overwriteConfig) {
              createConfig(answers.packages);
            }
            installPackages(answers.packages);
          });
      } catch (e) {
        createConfig(answers.packages);
        installPackages(answers.packages);
      }
    });
};
