import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import eslintPlugin from 'vite-plugin-eslint';

import { createHtmlPlugin } from 'vite-plugin-html';
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default (configEnv) => {
    const viteEnv = loadEnv(configEnv.mode, process.cwd());
    const { VITE_PUBLIC_PATH, VITE_NODE_ENV } = viteEnv;

    return {
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        css: {
            preprocessorOptions: {
                // css全局变量引入
                scss: {
                    additionalData: `@import "./src/style/variables/variables.scss";`,
                    javascriptEnabled: true,
                },
            },
        },
        server: {
            // hmr: { overlay: false },
            open: false,
            port: 2910,
            proxy: {
                '/devapi': {
                    target: 'http://125.124.183.20:91',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/devapi/, ''),
                },
                '/localapi': {
                    target: 'http://xxxx.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/localapi/, ''),
                },
                '/testapi': {
                    target: 'http://192.168.200.196:91',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/testapi/, ''),
                },
            },
        },
        build: {
            target: 'es2015',
            outDir: './dist/',
            cssCodeSplit: true,
            /** 打包后静态资源目录 */
            assetsDir: 'static',
            rollupOptions: {
                // 在dist中，将 js/css/img 归类
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/name-[hash].[ext]',
                },
            },
        },
        plugins: [
            // 将 SVG 静态图转化为 Vue 组件
            svgLoader(),
            vue(),
            vueJsx(),
            viteMockServe({}), // 添加下面这块
            eslintPlugin({
                include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
            }),
            createHtmlPlugin({
                template: 'public/index.html',
                entry: VITE_NODE_ENV === 'production' ? '' : 'src/main.ts',
                inject: {
                    data: {
                        title: 'DMP',
                        ...viteEnv,
                        // injectScript: `<script type="module" src="./static.env.config.js"></script>`,
                    },
                },
            }),
        ],
    };
};
