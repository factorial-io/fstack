/**
 * @param {Array} typography
 * @returns {string}
 */
module.exports = function getTypography(typography) {
  return `${typography
    .map(({ name = "Default", values }) => getTypographyString(name, values))
    .join("\n")}`;
};

/**
 * @param {string} name
 * @param {object} values
 * @returns {string}
 */
function getTypographyString(name, values) {
  let str = "";

  str += `  --typo-${name}-font-style: ${values.fontStyle};\n`;
  str += `  --typo-${name}-font-weight: ${values.fontWeight};\n`;
  str += `  --typo-${name}-font-size: ${values.fontSize};\n`;
  str += `  --typo-${name}-line-height: ${values.lineHeight};\n`;
  str += `  --typo-${name}-font-family: ${values.fontFamily};\n`;
  str += `  --typo-${name}:`;

  if (values.fontStyle !== "none") {
    str += ` var(--typo-${name}-font-style)`;
  }

  str += ` var(--typo-${name}-font-weight) var(--typo-${name}-font-size) / var(--typo-${name}-line-height) var(--typo-${name}-font-family);`;

  return str;
}
