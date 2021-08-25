module.exports = function getTypography(layer) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      const stringifiedName = child.name.toString();

      if (
        child.style &&
        !styles.find(({ name }) => name.toString() === stringifiedName)
      ) {
        const { letterSpacing } = child.style;
        const lineHeight = child.style.lineHeightPercent / 100;

        styles.push({
          name: stringifiedName,
          values: {
            fontFamily: child.style.fontFamily,
            fontWeight: child.style.fontWeight,
            fontSize: `${child.style.fontSize / 10}rem`,
            fontStyle: `${child.style.italic ? "italic" : "none"}`,
            letterSpacing: Number.isInteger(letterSpacing)
              ? letterSpacing
              : letterSpacing.toFixed(2),
            lineHeight: Number.isInteger(lineHeight)
              ? lineHeight
              : lineHeight.toFixed(2),
          },
        });
      }
    });
  }

  return styles;
};
