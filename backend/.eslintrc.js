module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: [
    'react'
  ],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-function-paren": ["error", "never"]
  },
}
