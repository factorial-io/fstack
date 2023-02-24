/**
 * @param {Array} spacings
 * @returns {string}
 */
module.exports = function getSpacings(spacings) {
  return `${spacings
    .map(({ name = "Default", value }) => `  --spacing-${name}: ${value};\n`)
    .join("")}`;
};
