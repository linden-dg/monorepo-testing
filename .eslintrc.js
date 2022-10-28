module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-spicy"`
  extends: [
    "@spicy-soup/eslint-config/typescript",
    "@spicy-soup/eslint-config/prettier",
  ],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
