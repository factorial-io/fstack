/**
 * @param {Array} colors
 * @returns {string}
 */
module.exports = function getColors(colors) {
  return `${colors
    .map(({ name = "Default", values }) => getColorsString(name, values))
    .join("\n")}`;
};

/**
 * @param {string} name
 * @param {object} values
 * @returns {string}
 */
function getColorsString(name, values) {
  let str = "";

  str += `  --color-${name}-r: ${values.r};\n`;
  str += `  --color-${name}-g: ${values.g};\n`;
  str += `  --color-${name}-b: ${values.b};\n`;
  str += `  --color-${name}-a: ${values.a};\n`;
  str += `  --color-${name}: rgba(var(--color-${name}-r), var(--color-${name}-g), var(--color-${name}-b), var(--color-${name}-a));`;

  return str;
}
