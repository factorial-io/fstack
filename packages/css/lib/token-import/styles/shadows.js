const { getColor } = require("../converter");

module.exports = function getShadows(layer) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      if (child.type === "RECTANGLE") {
        const stringifiedName = child.name.toString();
        if (
          !styles.find(({ name }) => name === stringifiedName) &&
          (stringifiedName.startsWith("outer-shadow-") ||
            stringifiedName.startsWith("inner-shadow-"))
        ) {
          styles.push({
            name: stringifiedName,
            values: {
              x: `${child.effects[0].offset.x / 10}rem`,
              y: `${child.effects[0].offset.y / 10}rem`,
              blur: `${child.effects[0].radius / 10}rem`,
              color: getColor(child.effects[0].color),
              inset: child.effects[0].type === "INNER_SHADOW",
            },
          });
        }
      }
    });
  }

  return styles;
};
