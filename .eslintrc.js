module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-useless-escape': 'off',
  },
};
