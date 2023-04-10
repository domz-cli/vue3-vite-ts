import { defineStore } from 'pinia';

export const appStore = defineStore('appStore', {
    // 声明，初始化state
    state: () => {
        return {
            sidebar: {
                opened: true,
            },
        };
    },
    // 发起请求，以及修改state值
    actions: {
        toggleSideBar() {
            this.sidebar.opened = !this.sidebar.opened;
        },
    },
    // state的计算属性
    getters: {
        sidebarOpened: (state) => state.sidebar.opened,
    },
});
