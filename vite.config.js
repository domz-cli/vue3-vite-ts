import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import {resolve} from 'path';
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    plugins: [vue(), viteMockServe({})]
})