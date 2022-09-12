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
          const remifiedValue = child.cornerRadius / 10;

          styles.push({
            name: stringifiedName,
            values: {
              topLeft: `${remifiedValue}rem`,
              topRight: `${remifiedValue}rem`,
              bottomRight: `${remifiedValue}rem`,
              bottomLeft: `${remifiedValue}rem`,
            },
          });
        }
      }
    });
  }

  return styles;
};
