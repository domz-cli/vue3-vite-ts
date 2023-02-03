import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import eslintPlugin from 'vite-plugin-eslint';

export default (configEnv) => {
    const viteEnv = loadEnv(configEnv.mode, process.cwd());
    const { VITE_PUBLIC_PATH } = viteEnv;
    return {
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://jsonplaceholder.typicode.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        plugins: [
            vue(),
            viteMockServe({}),
            eslintPlugin({
                include: [
                    'src/**/*.js',
                    'src/**/*.vue',
                    'src/*.js',
                    'src/*.vue',
                ],
            }),
        ],
    };
};
