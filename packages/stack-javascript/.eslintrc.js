module.exports = {
  root: true,
  ignorePatterns: [
    ".factorialrc.js",
    ".eslintrc.js",
    ".stylelintrc.js",
    "coverage",
  ],
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:jsdoc/recommended",
  ],
  plugins: ["prettier", "jsdoc"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "prettier/prettier": "error",
    "no-use-before-define": ["error", { functions: false }],
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
  overrides: [
    {
      files: ["**/__tests__/**/*.spec.js"],
      extends: ["plugin:jest/recommended"],
      plugins: ["jest"],
      rules: {
        "global-require": 0,
      },
    },
  ],
  env: {
    browser: true,
    "jest/globals": true,
  },
};
