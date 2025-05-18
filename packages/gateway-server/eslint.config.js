const { defineConfig, globalIgnores } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const _import = require('eslint-plugin-import');

const { fixupPluginRules } = require('@eslint/compat');

const globals = require('globals');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },

      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      import: fixupPluginRules(_import),
    },

    extends: compat.extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'eslint:recommended',
    ),

    rules: {
      'prettier/prettier': 2,
      'no-multiple-empty-lines': 2,
      'no-duplicate-imports': 2,
      'no-mixed-spaces-and-tabs': 2,

      'no-else-return': [
        'error',
        {
          allowElseIf: true,
        },
      ],

      'no-param-reassign': 1,
      'no-var': 2,
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-var-requires': 1,
      '@typescript-eslint/no-unused-vars': 1,
      'no-unused-vars': 0,
      'no-useless-escape': 0,
      'no-undef': 0,

      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },

          groups: [
            'external',
            'builtin',
            'internal',
            'sibling',
            'parent',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
  globalIgnores(['**/.eslintrc.js']),
]);
