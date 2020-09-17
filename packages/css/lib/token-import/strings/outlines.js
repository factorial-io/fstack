/**
 * @param {Array} outlines
 * @returns {string}
 */
module.exports = function getOutlines(outlines) {
  return `${outlines
    .map(({ name = "Default", values }) => getOutlinesString(name, values))
    .join("\n")}`;
};

/**
 * @param {string} name
 * @param {object} values
 * @returns {string}
 */
function getOutlinesString(name, values) {
  let str = "";

  str += `  --${name}-width: ${values.width};\n`;
  str += `  --${name}-style: ${values.style};\n`;
  str += `  --${name}-color: ${values.color};\n`;
  str += `  --${name}: var(--${name}-width) var(--${name}-style) var(--${name}-color);`;

  return str;
}
