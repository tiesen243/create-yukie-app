import eslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

const base = tseslint.config(
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unnecessary-condition': [2, { allowConstantLoopConditions: true }],
      '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-unused-vars': [
        2,
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { project: true } },
  },
)

const react = tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    react: reactPlugin,
    'react-hooks': hooksPlugin,
  },
  rules: {
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...hooksPlugin.configs.recommended.rules,
  },
  languageOptions: {
    globals: { React: 'writable' },
  },
})

const nextjs = tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  plugins: { '@next/next': nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    // TypeError: context.getAncestors is not a function
    '@next/next/no-duplicate-head': 'off',
  },
})

export const restrictEnvAccess = tseslint.config(
  { ignores: ['**/env.js'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message: "Use `import { env } from '@/env'` instead to ensure validated types.",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'process',
          importNames: ['env'],
          message: "Use `import { env } from '@/env'` instead to ensure validated types.",
        },
      ],
    },
  },
)

/** @type {import('typescript-eslint').Config} */
const config = [{ ignores: ['.next/**'] }, ...base, ...react, ...nextjs, ...restrictEnvAccess]

export default config
