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
  if (values.length === 1) {
    const [value] = values;

    return `  --${name}-inset:${value.inset ? " inset" : ""};
  --${name}-x: ${value.x};
  --${name}-y: ${value.y};
  --${name}-blur: ${value.blur};
  --${name}-spread: ${value.spread || ""};
  --${name}-color: ${value.color};
  --${name}: var(--${name}-inset) var(--${name}-x) var(--${name}-y) var(--${name}-blur) var(--${name}-spread) var(--${name}-color);
`;
  }

  let string = "";
  const combined = [];

  values.forEach((value, i) => {
    const index = i + 1;

    string += `  --${name}-${index}-inset:${value.inset ? " inset" : ""};
  --${name}-${index}-x: ${value.x};
  --${name}-${index}-y: ${value.y};
  --${name}-${index}-blur: ${value.blur};
  --${name}-${index}-spread: ${value.spread || ""};
  --${name}-${index}-color: ${value.color};
  --${name}-${index}: var(--${name}-${index}-inset) var(--${name}-${index}-x) var(--${name}-${index}-y) var(--${name}-${index}-blur) var(--${name}-${index}-spread) var(--${name}-${index}-color);`;

    if (i < values.length - 1) string += `\n`;

    combined.push(`var(--${name}-${index})`);
  });

  return `${string}
  --${name}: ${combined.join(", ")};\n`;
}
