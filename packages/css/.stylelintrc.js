module.exports = {
  extends: [
    require.resolve("stylelint-config-suitcss"),
    require.resolve("stylelint-config-prettier"),
  ],
  plugins: [require.resolve("stylelint-selector-bem-pattern")],
  rules: {
    "plugin/selector-bem-pattern": {
      preset: "suit",
      presetOptions: {
        namespace: "",
      },
    },
    "rule-empty-line-before": ["always", { except: ["first-nested"] }],
    "suitcss/custom-property-no-outside-root": null,
  },
};
