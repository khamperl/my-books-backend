// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts}']
  },

  {
    ignores: ['eslint.config.mjs']
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    },

    rules: {
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@stylistic/indent': ['error', 2, { ImportDeclaration: 1, SwitchCase: 1 }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always']
    }
  }
)
