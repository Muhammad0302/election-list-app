module.exports = {
  env: {
    'react-native/react-native': true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb/hooks',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
      files: ['**/*.tsx'], // Include all TypeScript files
      rules: {
        // Disable the unused variable rule for TypeScript files
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  rules: {
    // allow .js files to contain JSX code
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
    // prevent eslint to complain about the "styles" variable being used before it was defined
    'no-use-before-define': ['error', { variables: false }],
    // ignore errors for the react-navigation package
    'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
      },
    ],
    'react/no-danger': 'off',
    'linebreak-style': 'off',
    'global-require': 'off',
    'no-continue': 'off',
    'space-before-function-paren': 'off',
    'react/prefer-stateless-function': 'off',
    semi: 'off',
    'arrow-body-style': 'off',
    'no-useless-constructor': 'off',
    'comma-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'no-unused-vars': 'warn',
    'spaced-comment': 'warn',
    'no-trailing-spaces': 'off',
    'max-len': [2, 120, 4],
    'prefer-template': 'warn',
    'arrow-parens': 'off',
    'keyword-spacing': 'off',
    'class-methods-use-this': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-else-return': 'off',
    'react/no-children-prop': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'prefer-destructuring': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    eqeqeq: 'off',
    'import/no-named-as-default-member': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'react/no-unused-state': 'warn',
    'no-unreachable': 'warn',
    'react/destructuring-assignment': 'off',
    'react/no-unstable-nested-components': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
