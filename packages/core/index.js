const chalk = require("chalk");

const init = require("./lib/tasks/init");
const build = require("./lib/tasks/build");
const lint = require("./lib/tasks/lint");
const watch = require("./lib/tasks/watch");
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
 * @returns {string}
 * */
function getType() {
  const [firstParam, type] = process.argv.slice(3);
  return firstParam === "--only" ? type : null;
}

/**
 * Runs the correct script based on the given command.
 * Can be any of "lint", "build", "watch".
 *
 * @param {string} cmd - the command from the cli
 */
async function run(cmd) {
  const config = getConfig();

  switch (cmd) {
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
        type: getType(),
      });
      process.exit(successful ? 0 : 1);
      break;
    }
    case "test": {
      const successful = await test({
        config,
        type: getType(),
      });
      process.exit(successful ? 0 : 1);
      break;
    }
    case "build": {
      const successful = await build({ config, type: getType() });
      process.exit(successful ? 0 : 1);
      break;
    }
    default:
      console.error(
        `${chalk.red.bold("Error:")} Please run any command of ${chalk.cyan(
          "init"
        )}, ${chalk.cyan("lint")}, ${chalk.cyan("build")}, ${chalk.cyan(
          "watch"
        )} or ${chalk.cyan("test")}.`
      );
  }
}
