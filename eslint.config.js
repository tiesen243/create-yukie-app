// @ts-nocheck
import jseslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

/** @type {import('typescript-eslint').Config} */
export default [
  { ignores: ['.next/**'] },

  // Base configs
  ...tseslint.config(
    { ignores: ['*.config.js'] },
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      plugins: { import: importPlugin },
      extends: [
        jseslint.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ],
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],
        '@typescript-eslint/no-unnecessary-condition': [
          'error',
          { allowConstantLoopConditions: true },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'import/no-anonymous-default-export': 'warn',
      },
    },
    {
      linterOptions: { reportUnusedDisableDirectives: true },
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: { projectService: true },
      },
    },
  ),

  // React configs
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // Restric environment variables
  ...tseslint.config(
    { ignores: ['**/env.ts'] },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-restricted-properties': [
          'error',
          {
            object: 'process',
            property: 'env',
            message:
              "Use `import { env } from '@/env'` instead to ensure validated types.",
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            name: 'process',
            importNames: ['env'],
            message:
              "Use `import { env } from '@/env'` instead to ensure validated types.",
          },
        ],
      },
    },
  ),
]
