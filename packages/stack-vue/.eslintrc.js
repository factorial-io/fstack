const eslintConfig = require("@factorial/stack-javascript").eslint
const deepMerge = require("deepmerge")

module.exports = deepMerge(eslintConfig, {
  extends: ["plugin:vue/essential"],
  globals: {
    $nuxt: true,
  },
  env: {
    node: true,
  },
})
