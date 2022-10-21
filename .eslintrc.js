module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@spicy-soup/eslint"`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
