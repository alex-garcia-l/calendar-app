module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-config-prettier'],
  rules: {
    'space-before-function-paren': ['error', 'never'],
  },
};
