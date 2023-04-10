import { type ComponentPublicInstance, createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import elementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { loadPlugins } from '@/plugins/index';
import errorHandler from '@/utils/errorHandler';

const app = createApp(App);
app.use(elementPlus);
app.use(router);
app.use(store);

/** 加载插件 */
loadPlugins(app);

app.config.errorHandler = (err, instance: ComponentPublicInstance | null, info) => {
    // report error to tracking services
    errorHandler(err, instance, info);
};

app.mount('#app');
