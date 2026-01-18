import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { FlatCompat } from '@eslint/eslintrc'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)
const autoImport = require('./.eslintrc-auto-import.json')

const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default [
  {
    ignores: [
      '**/*.sh',
      '**/*.md',
      '**/*.woff',
      '**/*.ttf',
      '**/node_modules/**',
      '**/.vscode/**',
      '**/.idea/**',
      '**/dist/**',
      'public/**',
      'docs/**',
      '**/.husky/**',
      '**/.local/**',
      '**/.cache/**'
    ]
  },
  ...compat.extends(
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended'
  ),
  {
    files: ['src/**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: autoImport.globals
    },
    rules: {
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'prefer-const': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'vue/script-setup-uses-vars': 'error',
      'vue/v-slot-style': 'error',
      'vue/no-mutating-props': 'error',
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/attribute-hyphenation': 'error',
      'vue/attributes-order': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off',
      'vue/html-closing-bracket-newline': 'off'
    }
  }
]
