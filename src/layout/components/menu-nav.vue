<template>
    <aside class="doz-aside" :style="{ width: asideWidth, minWidth: asideWidth }" :class="{ 'no-border': layoutPageType }">
        <el-menu
            class="aside-menu"
            :mode="mode"
            text-color="#7d7f84"
            :default-openeds="reactiveObj.defaultOpeneds"
            :default-active="reactiveObj.active"
            router
            :collapse="asideCollapse"
            :unique-opened="reactiveObj.uniqueOpened"
        >
            <NavMenu v-if="menuHeaderTop && menuHeaderTop.length" :nav-menus="menuHeaderTop"></NavMenu>
        </el-menu>
    </aside>
</template>

<script lang="ts" setup>
import { getMenuRoot, type MenuInterface } from '@/router/menu';
import { computed, reactive, defineComponent, watch } from 'vue';

import { menuStoreHook } from '@/store/modules/menu';
import { globalSettingStoreHook } from '@/store/modules/global';
import { tagsStoreHook } from '@/store/modules/tags';

import NavMenu from '@/layout/components/NavMenu.vue';
import { findDeepsNode, findRootTopNode } from '@/utils/tool';
import { useRouter, useRoute } from 'vue-router';

const menuStore = menuStoreHook();
const globalSettingStore = globalSettingStoreHook();
const tagsStore = tagsStoreHook();

const { menuRoot } = getMenuRoot();
const router = useRouter();
const route = useRoute();

const menuHeaderTop = computed(() => {
    return menuStore.navMenu;
});

const asideCollapse = computed(() => {
    return globalSettingStore.asideCollapse;
});

const layoutPageType = computed(() => {
    return globalSettingStore.layoutPageType;
});

const asideWidth = computed(() => {
    const layoutPage = layoutPageType.value;
    if (layoutPage === 1) return '0px';
    return asideCollapse.value ? '65px' : '200px';
});

const reactiveObj = reactive({
    active: '',
    menuIsCollapse: false,
    uniqueOpened: false,
    defaultOpeneds: [] as string[],
    lastMenuInRoot: {} as any,
});

watch(
    () => route.path,
    (val) => {
        reactiveObj.active = route.path;
    }
);

watch(
    () => menuStore.navMenu,
    (val = []) => {
        const firstMenu = val || [];
        const firstMenuItem = firstMenu[0] || {};
        if (firstMenuItem.path) {
            // 进去当前一级菜单时，自动跳转到当前菜单的最后一个子级
            reactiveObj.lastMenuInRoot = findDeepsNode(firstMenuItem.path, menuRoot); // 找到当前一级菜单，第一个最深的节点
            reactiveObj.defaultOpeneds = [firstMenuItem.path];

            // 当前路由的顶层
            const offsetRouteTopRoot: MenuInterface = findRootTopNode(route.path, menuRoot);
            // 当前路由的最后一级
            const lastMenuInRootTopRoot: MenuInterface = findRootTopNode(reactiveObj.lastMenuInRoot.path, menuRoot) || {};
            // console.log(233, route.redirectedFrom, route.path, offsetRouteTopRoot.path === lastMenuInRootTopRoot.path);
            // 当前路由的顶层 与 自动跳转目标的顶层，是同一个时
            if (offsetRouteTopRoot.path === lastMenuInRootTopRoot.path) {
                // router.push({ path: reactiveObj.lastMenuInRoot.path });
                reactiveObj.active = route.path;
                // 当前路由就是顶层路由时
                if (route.path === offsetRouteTopRoot.path) {
                    router.push({ path: reactiveObj.lastMenuInRoot.path });
                    reactiveObj.active = reactiveObj.lastMenuInRoot.path;
                }
            } else {
                router.push({ path: reactiveObj.lastMenuInRoot.path });
                reactiveObj.active = reactiveObj.lastMenuInRoot.path;
            }
            tagsStore.pushTagsList(reactiveObj.lastMenuInRoot);
        }
    },
    { immediate: true }
);

defineComponent({
    NavMenu,
});

defineProps({
    mode: {
        type: String,
        default: 'vertical',
    },
});
</script>

<style lang="scss" scoped>
@import './../layout.scss';
.doz-aside {
    width: $aside-width;
    height: 100%;
    background: #fff;
    transition: all ease 0.2s;
    overflow: auto;
    border-right: 1px solid $color-border-main;
}
:deep(.aside-menu) {
    height: 100%;
    overflow-y: auto;
}
.no-border {
    border: none;
}
</style>
