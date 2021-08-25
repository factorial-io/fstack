module.exports = {
  getColor({ r, g, b, a }) {
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
      b * 255
    )}, ${a})`;
  },
};
