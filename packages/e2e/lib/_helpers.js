module.exports = {
  /**
   * @param {string} command
   * @returns {Array}
   */
  getAdditionalParams(command) {
    const indexCommand = process.argv.indexOf(command);

    if (indexCommand >= 0) {
      const args = process.argv.slice(indexCommand + 1);
      const indexOfOnly = args.indexOf("--only");
      const indexOfSkip = args.indexOf("--skip");

      if (indexOfOnly >= 0 || indexOfSkip >= 0) {
        const index = indexOfOnly >= 0 ? indexOfOnly : indexOfSkip;

        args.splice(index, 2);
      }

      return args;
    }

    return [];
  },
};
