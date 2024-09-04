/** @type {import("eslint").ESLint.Options} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      files: ['*.test.tsx', '*.test.ts'],
      plugins: ['jest', 'import', 'jsx-a11y', 'prettier', 'react', 'react-hooks'],
      extends: ['plugin:jest/recommended'],
      env: {
        jest: true,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.eslint.json',
      '<tsconfigRootDir>/tsconfig.eslint.json',
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  ignorePatterns: ['node_modules', 'coverage'],
};
