module.exports = {
  /**
   * @param {string} command
   * @returns {Array}
   */
  getAdditionalParams(command) {
    const indexCommand = process.argv.indexOf(command);

    if (indexCommand >= 0) {
      const args = process.argv.slice(indexCommand + 1);

      if (args.includes("--only")) {
        const indexOnly = args.indexOf("--only");
        args.splice(indexOnly, 2);
      }

      return args;
    }

    return [];
  },
};
