import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const isProd = (process.env.BUILD === 'production');

export default {
    input: 'main.ts', // or './src/main.ts' if you put files in src
    output: {
        dir: '.', // Output to root, or 'dist/'
        sourcemap: 'inline',
        sourcemapExcludeSources: isProd,
        format: 'cjs',
        exports: 'default',
    },
    external: ['obsidian'],
    plugins: [
        typescript(),
        nodeResolve({ browser: true }),
        commonjs(),
    ]
};