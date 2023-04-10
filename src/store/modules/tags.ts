import store from '@/store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { type Menu, type MenuInterface } from '@/router/menu';

export const tagsStore = defineStore('tagsStore', () => {
    const tagsList = ref<MenuInterface[]>([]);

    const settingTagsList = (menuList: Menu) => {
        tagsList.value = menuList;
    };
    const pushTagsList = (item: MenuInterface) => {
        const path = item.path || '';
        const result = tagsList.value.find((list) => list.path === path);
        if (!result) tagsList.value.push(item);
    };
    return { tagsList, settingTagsList, pushTagsList };
});

export function tagsStoreHook() {
    return tagsStore(store);
}
