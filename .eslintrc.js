module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-spicy"`
  extends: ["spicy"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
