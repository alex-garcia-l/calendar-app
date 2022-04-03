module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'tedect',
    },
  },
  extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'standard', 'eslint-config-prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'space-before-function-paren': ['error', 'named'],
    'jsx-quotes': ['error', 'prefer-double'],
  },
};
