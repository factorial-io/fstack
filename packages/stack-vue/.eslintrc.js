const eslintConfig = require("@factorial/stack-javascript").eslint;
const deepMerge = require("deepmerge");

module.exports = deepMerge(eslintConfig, {
  extends: ["plugin:vue/recommended", "plugin:prettier-vue/recommended"],
  plugins: ["vue"],
  rules: {
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-v-html": "off",
    "prettier-vue/prettier": "error",
  },
  globals: {
    $nuxt: true,
  },
});
