module.exports = {
  extends: ["plugin:jsdoc/recommended"],
  rules: {
    "jsdoc/require-jsdoc": [
      "warn",
      {
        require: {
          MethodDefinition: true,
        },
      },
    ],
    "jsdoc/require-param-description": 0,
    "jsdoc/require-returns-description": 0,
  },
};
