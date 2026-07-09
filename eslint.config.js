import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    {
        ignores: [
            'dist/**',
            'coverage/**',
            'coverage copy/**',
            'docs/.nuxt/**',
            'docs/.output/**',
            '.nuxt/**',
            'openspec/**',
        ],
    },

    js.configs.recommended,
    tseslint.configs.recommended,
    pluginVue.configs['flat/recommended'],

    {
        files: ['**/*.{js,mjs,ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.browser },
            parserOptions: {
                // `vue-eslint-parser` owns .vue files and delegates <script> to this.
                parser: tseslint.parser,
            },
        },
    },

    {
        files: ['**/*.test.ts', 'src/vitest-setup.ts'],
        languageOptions: {
            globals: { ...globals.node, ...globals.vitest },
        },
        // Tests define inline wrapper components with `defineComponent` to
        // exercise slots and context; the one-per-file rule targets SFC sources.
        rules: { 'vue/one-component-per-file': 'off' },
    },

    {
        // TypeScript already resolves identifiers, and Nuxt auto-imports are
        // invisible to ESLint. `no-undef` only produces false positives here.
        files: ['**/*.{ts,vue}'],
        rules: { 'no-undef': 'off' },
    },

    {
        files: ['scripts/**/*.js', '*.config.js', 'rollup.config.js'],
        languageOptions: {
            globals: { ...globals.node },
        },
    },

    // Keep parity with the previous .eslintrc.json rule set.
    {
        rules: {
            'vue/html-indent': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/no-v-html': 'off',
            'vue/html-self-closing': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'vue/multi-word-component-names': [
                'error',
                { ignores: ['Loader', 'Mesh', 'Wrapper', 'Actions', 'Icon', 'Bento', 'Spinner'] },
            ],
            // `cond && fn()` is used as a guard throughout the components.
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            'no-empty': ['error', { allowEmptyCatch: true }],
        },
    },

    {
        // Must come after the block above, which sets `multi-word-component-names`
        // for every file. Documentation examples are intentionally single-word,
        // single-component files (`basic.vue`, `sizes.vue`) rendered by the
        // `component-preview` directive; neither convention applies to them.
        files: ['docs/**/*.vue'],
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/one-component-per-file': 'off',
        },
    },

    {
        // `:for` is Vue's same-name shorthand. `vue/valid-v-bind` cannot parse it
        // because `for` is a JS reserved word, but the compiler handles it — the
        // rendered markup carries `for="<id>"` (covered by SLabel's tests).
        files: ['src/components/spartan/SLabel/SLabel.vue'],
        rules: { 'vue/valid-v-bind': 'off' },
    },

    // Must stay last: disables stylistic rules that conflict with Prettier.
    prettierRecommended,
);
