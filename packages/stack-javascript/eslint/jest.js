module.exports = {
  overrides: [
    {
      files: ["**/__tests__/**/*.spec.js"],
      extends: ["plugin:jest/recommended"],
      rules: {
        "global-require": 0,
      },
    },
  ],
};
