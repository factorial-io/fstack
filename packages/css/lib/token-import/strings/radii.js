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
  let str = "";

  str += `  --${name}-top-left: ${values.topLeft};\n`;
  str += `  --${name}-top-right: ${values.topRight};\n`;
  str += `  --${name}-bottom-right: ${values.bottomRight};\n`;
  str += `  --${name}-bottom-left: ${values.bottomLeft};\n`;
  str += `  --${name}: var(--${name}-top-left) var(--${name}-top-right) var(--${name}-bottom-right) var(--${name}-bottom-left);`;

  return str;
}
