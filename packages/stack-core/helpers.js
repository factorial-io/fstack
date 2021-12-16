const path = require("path");
const stagedFiles = require("staged-git-files");

module.exports = {
  /**
   * @param {Array} fileExtensions
   * @returns {Promise}
   */
  getStagedFiles(fileExtensions) {
    return new Promise((resolve) => {
      stagedFiles.cwd = process.cwd();

      stagedFiles({ filter: "d", relative: true }, (err, results) => {
        resolve(
          results
            .map((result) => result.filename)
            .filter((entry) =>
              fileExtensions.includes(path.extname(entry).slice(1))
            )
        );
      });
    });
  },

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
