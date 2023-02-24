module.exports = function getTypography(layer, rootFontSize) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      const stringifiedName = child.name.toString();

      if (
        child.style &&
        !styles.find(({ name }) => name.toString() === stringifiedName)
      ) {
        const { letterSpacing } = child.style;
        const lineHeight = child.style.lineHeightPx / child.style.fontSize;

        styles.push({
          name: stringifiedName,
          values: {
            fontFamily: child.style.fontFamily,
            fontWeight: child.style.fontWeight,
            fontSize: `${child.style.fontSize / rootFontSize}rem`,
            fontStyle: `${child.style.italic ? "italic" : "none"}`,
            letterSpacing: Number.isInteger(letterSpacing)
              ? letterSpacing
              : letterSpacing,
            lineHeight: Number.isInteger(lineHeight) ? lineHeight : lineHeight,
          },
        });
      }
    });
  }

  return styles;
};
