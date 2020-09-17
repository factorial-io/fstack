module.exports = function getRadii(layer) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      if (child.type === "RECTANGLE") {
        const stringifiedName = child.name.toString();
        if (
          !styles.find(({ name }) => name === stringifiedName) &&
          stringifiedName.startsWith("radius-")
        ) {
          styles.push({
            name: stringifiedName,
            values: {
              topLeft: `${child.rectangleCornerRadii[0] / 10}rem`,
              topRight: `${child.rectangleCornerRadii[1] / 10}rem`,
              bottomRight: `${child.rectangleCornerRadii[2] / 10}rem`,
              bottomLeft: `${child.rectangleCornerRadii[3] / 10}rem`,
            },
          });
        }
      }
    });
  }

  return styles;
};
