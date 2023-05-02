module.exports = {
  env: {
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint:recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-useless-escape': 'off',
  },
};
