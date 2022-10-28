require("@spicy-soup/eslint-config/patch/modern-module-resolution");
const {
  getDefaultIgnorePatterns,
} = require("@spicy-soup/eslint-config/helpers");

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    "@spicy-soup/eslint-config/typescript",
    "@spicy-soup/eslint-config/react",
    // Apply prettier and disable incompatible rules
    "@spicy-soup/eslint-config/prettier",
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
};
