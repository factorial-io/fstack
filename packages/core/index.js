const chalk = require("chalk");

const init = require("./lib/tasks/init");
const build = require("./lib/tasks/build");
const custom = require("./lib/tasks/custom");
const lint = require("./lib/tasks/lint");
const watch = require("./lib/tasks/watch");
const optimize = require("./lib/tasks/optimize");
const test = require("./lib/tasks/test");
const getConfig = require("./lib/config");

module.exports = async function core(command) {
  await run(command);
  // } else {
  //   config.use.forEach((extension) => {
  //     if (extension.eslint && extension.eslint.config) {
  //       eslintConfig = deepMerge(eslintConfig, extension.eslint.config);
  //     }

  //     if (extension.stylelint && extension.stylelint.config) {
  //       stylelintConfig = deepMerge(stylelintConfig, extension.stylelint.config);
  //     }
  //   });
};

/**
 * Returns the type that is passed as a CLI arg via --only
 *
 * @param {string} task
 * @returns {string}
 * */
function getType(task) {
  const indexTask = process.argv.indexOf(task);
  const [firstParam, type] = process.argv.slice(indexTask + 1);

  return firstParam === "--only" ? type : null;
}

/**
 * Returns an array with all commands available in packages used by the user.
 *
 * @param {Array} packages
 * @returns {Array}
 */
function getAvailableCommands(packages = []) {
  // core's build task internally builds asset files,
  // so this task is always available, as well as
  // init and watch.
  // TODO: This should probably be refactored.
  const commands = ["build", "init", "watch"];

  packages.forEach((ext) => {
    const extension = Array.isArray(ext) ? ext[0] : ext;

    Object.keys(extension.tasks).forEach((command) => {
      if (!commands.includes(command)) {
        commands.push(command);
      }
    });
  });

  return commands;
}

/**
 * @param {Array} commands
 */
function logAvailableCommands(commands) {
  let commandsString = "";

  commands.forEach((command) => {
    commandsString += `- ${command}\n`;
  });

  console.error(
    `${chalk.red.bold("Error:")} Please run any command of:\n${commandsString}`
  );
}

/**
 * Runs the correct script based on the given command.
 *
 * There is a fixed set of commands for core (init, watch, lint, test, build, optimize),
 * which have dedicated tasks.
 * But also custom commands can be run which are simply executed and do not have a
 * dedicated task.
 *
 * @param {string} commandArg - the command from the cli
 */
async function run(commandArg) {
  const config = getConfig();
  const availableCommands = getAvailableCommands(config.use);

  if (availableCommands.includes(commandArg)) {
    switch (commandArg) {
      case "init": {
        init();
        break;
      }
      case "watch": {
        watch(config);
        break;
      }
      case "lint": {
        const successful = await lint({
          config,
          type: getType("lint"),
        });
        process.exit(successful ? 0 : 1);
        break;
      }
      case "test": {
        const successful = await test({
          config,
          type: getType("test"),
        });
        process.exit(successful ? 0 : 1);
        break;
      }
      case "build": {
        const successful = await build({ config, type: getType("build") });
        process.exit(successful ? 0 : 1);
        break;
      }
      case "optimize": {
        const successful = await optimize({
          config,
          type: getType("optimize"),
        });
        process.exit(successful ? 0 : 1);
        break;
      }
      default: {
        const successful = await custom(
          config,
          commandArg,
          getType(commandArg)
        );
        process.exit(successful ? 0 : 1);
      }
    }
  } else {
    logAvailableCommands(availableCommands);
  }
}
