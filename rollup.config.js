import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/expose/plugin.js',
        output: {
            file: 'dist/plugin.js',
            format: 'es',
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            terser(),
            postcss({
                minimize: true,
                inject: true,
            }),
        ],
    },
    {
        input: 'src/expose/i18n.ts',
        output: {
            file: 'dist/expose/i18n.js',
            format: 'es',
        },
        external: ['@intlify/unplugin-vue-i18n/messages'],
        plugins: [
            typescript({
                compilerOptions: {
                    declaration: true,
                    declarationDir: './dist/expose',
                    outDir: './dist/expose',
                },
                include: ['src/expose/i18n.ts'],
            }),
            nodeResolve(),
            commonjs(),
            terser(),
        ],
    },
];
