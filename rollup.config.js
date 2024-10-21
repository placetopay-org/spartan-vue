import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
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
};
