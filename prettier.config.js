/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',

  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // Tailwind
  tailwindFunctions: ['cn', 'cva'],

  // Sort Imports
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrder: [
    '<TYPES>',
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^([.|..|@]/.*)$',
    '^@/',
    '^[../]',
    '^[./]',
  ],

  // Others
  overrides: [
    { files: '*.json.hbs', options: { parser: 'json' } },
    { files: '*.js.hbs', options: { parser: 'babel' } },
  ],
}

export default config
