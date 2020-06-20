module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    // Unnecessary for a library IMO
    'react/jsx-filename-extension': 'off',
    // Unnecessary IMO
    'react/require-default-props': 'off',
    // Our babel config doesn't have class properties
    'react/state-in-constructor': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
