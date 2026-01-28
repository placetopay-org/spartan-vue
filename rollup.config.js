import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';

export default [
    {
        input: 'src/expose/plugin.js',
        output: [
            {
                file: 'dist/plugin.mjs',
                format: 'es',
                exports: 'default',
            },
            {
                file: 'dist/plugin.cjs',
                format: 'cjs',
                exports: 'default',
            },
        ],
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
        plugins: [
            nodeResolve({ extensions: ['.js', '.ts', '.json'] }),
            json(),
            commonjs(),
            esbuild({
                target: 'esnext',
                sourceMap: false,
                tsconfig: 'tsconfig.json',
            }),
            terser(),
        ],
    },
];
