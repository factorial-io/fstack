/**
 * @param {Array} radii
 * @returns {string}
 */
module.exports = function getRadii(radii) {
  return `${radii
    .map(({ name = "Default", values }) => getRadiiString(name, values))
    .join("\n")}`;
};

/**
 * @param {string} name
 * @param {object} values
 * @returns {string}
 */
function getRadiiString(name, values) {
  return `  --${name}-top-left: ${values.topLeft};
  --${name}-top-right: ${values.topRight};
  --${name}-bottom-right: ${values.bottomRight};
  --${name}-bottom-left: ${values.bottomLeft};
  --${name}: var(--${name}-top-left) var(--${name}-top-right) var(--${name}-bottom-right) var(--${name}-bottom-left);
`;
}
