const js = require('@eslint/js');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      '.npm-cache/**',
      '.auth/**',
      'playwright-report/**',
      'test-results/**',
      'blob-report/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        __dirname: 'readonly',
        console: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        URL: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
];
