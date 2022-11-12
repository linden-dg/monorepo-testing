/**
 * Opinionated config base for projects using react.
 * @see https://github.com/belgattitude/nextjs-monorepo-example/tree/main/packages/eslint-config-bases
 */
const { getDefaultIgnorePatterns } = require("../helpers");

const nextPagedPatterns = {
  files: ["**/pages/\\_*.{ts,tsx}"],
};

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), ".next", ".out"],
  extends: [
    "./typescript",
    "./react",
    "plugin:@next/next/core-web-vitals",
    "./prettier",
  ],
  rules: {
    // https://github.com/vercel/next.js/discussions/16832
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  overrides: [
    {
      files: nextPagedPatterns.files,
      rules: {
        "react/display-name": "off",
      },
    },
  ],
};
