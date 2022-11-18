module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: 2021,
    },
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
};
