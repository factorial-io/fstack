const { getColor } = require("../converter");

module.exports = function getOutlines(layer, rootFontSize, figmaStyles) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      if (child.type === "RECTANGLE") {
        const stringifiedName = child.name.toString();

        if (
          !styles.find(({ name }) => name === stringifiedName) &&
          stringifiedName.startsWith("outline-")
        ) {
          let color;

          if (child.styles.stroke && figmaStyles[child.styles.stroke]) {
            color = `var(--color-decoration-${
              figmaStyles[child.styles.stroke].name
            })`;
          } else {
            color = getColor(child.strokes[0].color);
          }

          styles.push({
            name: stringifiedName,
            values: {
              width: `${child.strokeWeight / rootFontSize}rem`,
              style: child.strokes[0].type.toLowerCase(),
              color,
            },
          });
        }
      }
    });
  }

  return styles;
};
