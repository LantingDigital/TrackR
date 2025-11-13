module.exports = {
  root: true,
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
  },
  rules: {
    // Enforce consistent code style
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'warn',
    'no-var': 'error',

    // React Native specific
    'react-native/no-unused-styles': 'off',
    'react-native/split-platform-components': 'off',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'off', // We use theme tokens instead
  },
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'dist/',
    'web-build/',
    '*.config.js',
  ],
};
