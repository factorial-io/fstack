module.exports = function getSpacings(layer) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      if (child.type === "RECTANGLE") {
        const stringifiedName = child.name.toString();

        if (!styles.find(({ name }) => name === stringifiedName)) {
          styles.push({
            name: stringifiedName,
            value: `${child.absoluteBoundingBox.width / 10}rem`,
          });
        }
      }
    });
  }

  return styles;
};
