module.exports = function getColors(layer) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      const [fills] = child.fills;

      if (fills) {
        const { color } = fills;
        const stringifiedName = child.name.toString();

        if (!styles.find(({ name }) => name === stringifiedName)) {
          styles.push({
            name: stringifiedName,
            id: child.id,
            values: {
              r: Math.round(color.r * 255),
              g: Math.round(color.g * 255),
              b: Math.round(color.b * 255),
              a: color.a,
            },
          });
        }
      }
    });
  }

  return styles;
};
