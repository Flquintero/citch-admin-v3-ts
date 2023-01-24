module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:vue/strongly-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "vue/require-default-prop": "off",
    // not needed for vue 3
    "vue/no-multiple-template-root": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-this-alias": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  // settings: {
  //   "import/resolver": {
  //     alias: {
  //       map: [
  //         ["~", "."],
  //         ["@", "."],
  //       ],
  //       extensions: [".ts", ".js", ".json"],
  //     },
  //   },
  // },
  // overrides: [
  //   {
  //     files: ["*"],
  //     rules: {
  //       quotes: ["error", "single", { allowTemplateLiterals: true }],
  //     },
  //   },
  // ],
};
