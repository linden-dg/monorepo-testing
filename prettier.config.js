/** @type {import("prettier").Config} */

module.exports = {
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./packages/theme/tailwind.config.js",
};
