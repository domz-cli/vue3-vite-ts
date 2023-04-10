module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    /* 指定如何解析语法 */
    parser: 'vue-eslint-parser',
    /* 优先级低于 parse 的语法解析配置 */
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/typescript/recommended', '@vue/eslint-config-prettier'],
    rules: {
        quotes: [0, 'single'], // 允许单引号或双引号
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],

        // vue (https://eslint.vuejs.org/rules)
        'vue/no-v-html': 'off', // 禁止使用 v-html
        'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
        'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
        'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
        'vue/custom-event-name-casing': 'off', // 为自定义事件名称强制使用特定大小写
        'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
        'vue/one-component-per-file': 'off', // 强制每个组件都应该在自己的文件中
        'vue/html-closing-bracket-newline': 'off', // 在标签的右括号之前要求或禁止换行
        'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
        'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
        'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容之前和之后需要换行符
        'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
        'vue/multi-word-component-names': 0,
        '@typescript-eslint/no-namespace': 'off', // 允许自定义命名空间
    },
};
