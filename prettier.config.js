/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  /* General Prettier Config */
  semi: false,
  tabWidth: 2,
  printWidth: 90,
  singleQuote: true,
  trailingComma: 'all',

  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  tailwindFunctions: ['cn', 'cva'],

  importOrder: [
    '<TYPES>',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^(@/(.*)$)',
    '<TYPES>^[.|..]',
    '^@/',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '4.4.0',

  overrides: [{ files: '*.mdx', options: { parser: 'mdx' } }],
}

export default config
