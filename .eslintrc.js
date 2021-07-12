module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'max-len': ['warn', 130],
    'no-useless-catch': 'off',
    'import/no-dynamic-require': 'off',
    'import/extensions': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-undef': 'off',
    'new-cap': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
