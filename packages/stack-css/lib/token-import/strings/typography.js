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
  return `  --typo-${name}-font-style: ${
    values.fontStyle === "none" ? "normal" : values.fontStyle
  };
  --typo-${name}-font-weight: ${values.fontWeight};
  --typo-${name}-font-size: ${values.fontSize};
  --typo-${name}-line-height: ${values.lineHeight};
  --typo-${name}-font-family: ${values.fontFamily};
  --typo-${name}: var(--typo-${name}-font-style) var(--typo-${name}-font-weight) var(--typo-${name}-font-size) / var(--typo-${name}-line-height) var(--typo-${name}-font-family);
`;
}
