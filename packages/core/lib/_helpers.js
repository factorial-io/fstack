module.exports = {
  getAdditionalParams(command) {
    const index = process.argv.indexOf(command);

    if (index >= 0) {
      return process.argv.slice(index + 1);
    }

    return [];
  },
};
