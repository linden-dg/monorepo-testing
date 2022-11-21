/** @type {import('tailwindcss').Config} */
const tailwindColors = require("tailwindcss/colors");
const path = require("path");
const { freefall, sunflower, watermelon, meadow, gigas } = require("./palette");

const componentsPackagePath = `${require.resolve(
  "@spicy-soup/components"
)}`.replace("index.tsx", "");

const colors = {
  primary: gigas,
  secondary: gigas,
  accent: gigas,
  success: meadow,
  info: freefall,
  warning: sunflower,
  danger: watermelon,
  // gray: tailwindColors["slate"],
};

// remove deprecated colors
delete tailwindColors["lightBlue"];
delete tailwindColors["warmGray"];
delete tailwindColors["trueGray"];
delete tailwindColors["coolGray"];
delete tailwindColors["blueGray"];

module.exports = {
  darkMode: "class",
  content: [
    path.join(componentsPackagePath, "**/*.{ts,tsx}"),
    // `${root}/packages/components/**/*.{ts,tsx}`,
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...tailwindColors,
      ...colors,
    },
  },
  plugins: [],
};
