<template>
    <el-menu
        :default-active="reactiveObj.active"
        active-text-color="#ffd04b"
        background-color="#1e1f24"
        text-color="#fff"
        :mode="'horizontal'"
        :collapse="reactiveObj.menuIsCollapse"
        :unique-opened="reactiveObj.uniqueOpened"
        class="header-menu"
        @select="onSelect"
    >
        <NavMenu :nav-menus="menuHeaderTop"></NavMenu>
    </el-menu>
</template>

<script lang="ts" setup>
import { getMenuRoot } from '@/router/menu';
import { computed, reactive, defineComponent, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { menuStoreHook } from '@/store/modules/menu';
import { deepLoopForTree, findRootTopNode } from '@/utils/tool';
import { type MenuInterface, type Menu } from '@/router/menu';

import NavMenu from '@/layout/components/NavMenu.vue';
const { menuHeader, menuRoot } = getMenuRoot();

const router = useRouter();
const menuStore = menuStoreHook();

const menuHeaderTop = computed(() => {
    return menuHeader;
});

const reactiveObj = reactive({
    active: '/index',
    menuIsCollapse: false,
    uniqueOpened: false,
    changing: false,
});

defineComponent({
    NavMenu,
});

watch(
    () => router.currentRoute.value,
    (val) => {
        // reactiveObj.active = val.path;
        // menuStore.setting_NavMenu(getTheRouteByTop(val.path, menuRoot));
        // const val = router.currentRoute.value;
        initState();
    },
    { immediate: true }
);

// onBeforeMount(() => {
//     initState();
// });

function initState() {
    // if (reactiveObj.changing) return (reactiveObj.changing = false);
    const val = router.currentRoute.value;
    // reactiveObj.active = val.path;
    // console.log(333, val.path);
    const topMenu: any = findRootTopNode(val.path, menuRoot); // 当前菜单的最顶层菜单
    const secondMenu = getTheRouteByTop(topMenu.path, menuRoot); // 当前一级菜单下，所有子菜单
    reactiveObj.active = topMenu.path;
    menuStore.setting_NavMenu(secondMenu);
    // menuStore.setting_NavMenu(getTheRouteByTop(val.path, menuRoot));
}

function getTheRouteByTop(path: string, menuRoot: Array<MenuInterface>) {
    const offsetRouter = [deepLoopForTree(path, menuRoot) || {}];
    let offsetRouterTop: any = offsetRouter[0] || {};
    offsetRouterTop = offsetRouterTop.children || [];
    return offsetRouterTop;
}

function onSelect(index: string, indexPath?: string) {
    reactiveObj.changing = true;
    menuStore.setting_NavMenu(getTheRouteByTop(index, menuRoot));
    if (/^https:\/\/|http:\/\//.test(index)) {
        window.open(index);
    } else {
        router.push({
            path: index,
        });
    }
}
</script>

<style lang="scss" scoped>
.header-menu {
    border-bottom: none;
}
</style>
