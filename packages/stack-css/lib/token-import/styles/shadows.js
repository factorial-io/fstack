const { getColor } = require("../converter");

module.exports = function getShadows(layer, rootFontSize) {
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
          const data = {
            name: stringifiedName,
            values: [],
          };

          child.effects.reverse().forEach((effect) => {
            if (effect.visible) {
              data.values.push({
                x: `${effect.offset.x / rootFontSize}rem`,
                y: `${effect.offset.y / rootFontSize}rem`,
                blur: `${effect.radius / rootFontSize}rem`,
                spread: effect.spread
                  ? `${effect.spread / rootFontSize}rem`
                  : false,
                color: getColor(effect.color),
                inset: effect.type === "INNER_SHADOW",
              });
            }
          });
          styles.push(data);
        }
      }
    });
  }

  return styles;
};
