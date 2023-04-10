import {
    // type MenuInterface,
    type Menu,
    type MenuInterface,
} from '@/router/menu';
import { defineStore } from 'pinia';
import store from '@/store';

import { ref } from 'vue';

export const menuStore = defineStore('menuStore', () => {
    // 声明，初始化state
    const navMenu = ref<Menu>([]);

    const setting_NavMenu = (menuList: Menu) => {
        navMenu.value = menuList;
    };
    return { navMenu, setting_NavMenu };
});

/** 在 setup 外使用 */
export function menuStoreHook() {
    return menuStore(store);
}
