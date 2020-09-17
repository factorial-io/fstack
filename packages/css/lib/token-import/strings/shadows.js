/**
 * @param {Array} shadows
 * @returns {string}
 */
module.exports = function getShadows(shadows) {
  return `${shadows
    .map(({ name = "Default", values }) => getShadowsString(name, values))
    .join("\n")}`;
};

/**
 * @param {string} name
 * @param {object} values
 * @returns {string}
 */
function getShadowsString(name, values) {
  let str = "";

  str += `  --${name}-x: ${values.x};\n`;
  str += `  --${name}-y: ${values.y};\n`;
  str += `  --${name}-blur: ${values.blur};\n`;
  str += `  --${name}-color: ${values.color};\n`;
  str += `  --${name}:`;

  if (values.inset) {
    str += " inset";
  }

  str += ` var(--${name}-x) var(--${name}-y) var(--${name}-blur) var(--${name}-color);`;

  return str;
}
