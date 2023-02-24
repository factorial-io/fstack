module.exports = function getRadii(layer, rootFontSize) {
  const styles = [];

  if (layer && layer.children) {
    layer.children.forEach((child) => {
      if (child.type === "RECTANGLE") {
        const stringifiedName = child.name.toString();
        if (
          !styles.find(({ name }) => name === stringifiedName) &&
          stringifiedName.startsWith("radius-")
        ) {
          const remifiedValue = child.cornerRadius / rootFontSize;

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
