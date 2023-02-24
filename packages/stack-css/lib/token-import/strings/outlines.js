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
  return `  --${name}-width: ${values.width};
  --${name}-style: ${values.style};
  --${name}-color: ${values.color};
  --${name}: var(--${name}-width) var(--${name}-style) var(--${name}-color);
`;
}
