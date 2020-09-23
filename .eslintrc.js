module.exports = {
  plugins: [
    "bacon-lwc"
  ],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'bacon-lwc/no-dangling-subscribe': 'error'
  },
};
