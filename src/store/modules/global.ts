import store from '@/store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const globalSettingStore = defineStore('globalSettingStore', () => {
    const asideCollapse = ref(false); // 是否折叠
    const asideTransition = ref(true);
    const layoutPageType = ref(0); // 0=后台模式 1=前台模式
    const searchOn = ref(false); // 搜索模式

    const language = ref('');
    // element组件大小
    const assemblySize = ref('default');
    return { asideCollapse, asideTransition, layoutPageType, language, assemblySize, searchOn };
});

export function globalSettingStoreHook() {
    return globalSettingStore(store);
}
