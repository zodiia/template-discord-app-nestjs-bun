import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  {
    name: 'Typescript',
    files: ['src/**/*.ts'],
    plugins: {
      'import': importPlugin,
      'prettier': prettierPlugin,
      '@typescript-eslint': tsPlugin,
      'ts': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    rules: {
      // Imported configs
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...prettierPlugin.configs['recommended'].rules,

      // Typescript
      'ts/no-explicit-any': 'error',
      'ts/no-non-null-assertion': 'error',
      'ts/no-shadow': 'error',
      'ts/no-unused-vars': 'error',

      // Import
      'import/first': 'error',
      'import/no-deprecated': 'warn',
      'import/no-mutable-exports': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        },
      ],

      // Other
      'curly': 'error',
      'no-shadow': 'off',
      'no-undef': 'off',
    },
  },
]
