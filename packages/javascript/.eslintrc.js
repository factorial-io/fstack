module.exports = {
  root: true,
  ignorePatterns: [".factorialrc.js", ".eslintrc.js", ".stylelintrc.js"],
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:jsdoc/recommended",
  ],
  plugins: ["prettier", "jsdoc"],
  rules: {
    "prettier/prettier": "error",
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
  env: {
    browser: true,
  },
  globals: {
    describe: true,
    it: true,
    jest: true,
    test: true,
    expect: true,
  },
};
