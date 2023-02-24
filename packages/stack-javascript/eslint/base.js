module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    browser: true,
  },
  rules: {
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "no-use-before-define": ["error", { functions: false }],
  },
  ignorePatterns: [
    ".factorialrc.js",
    ".eslintrc.js",
    ".stylelintrc.js",
    "coverage",
  ],
};
