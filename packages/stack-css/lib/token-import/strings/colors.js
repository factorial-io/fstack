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
  return `  --color-${name}-r: ${values.r};
  --color-${name}-g: ${values.g};
  --color-${name}-b: ${values.b};
  --color-${name}-a: ${values.a};
  --color-${name}: rgba(var(--color-${name}-r), var(--color-${name}-g), var(--color-${name}-b), var(--color-${name}-a));
`;
}
