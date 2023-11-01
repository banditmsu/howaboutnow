module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/essential',
      "plugin:@typescript-eslint/recommended",
      "plugin:vue/vue3-recommended"
    ],
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    rules: {
      // Additional project-specific rules, if needed
    },
    plugins: ["@typescript-eslint"],
  };
  