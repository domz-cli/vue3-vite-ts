<template>
    <div v-if="navMenus.length <= 0" style="padding: 20px; text-align: center">
        <el-icon color="#ccc" size="12px" class="nav-menu-icon"><sc-icon-inbox /></el-icon>
    </div>
    <template v-for="navMenu in navMenus" :key="navMenu.id">
        <el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu.path">
            <a v-if="navMenu.type == 'link'" :href="navMenu.path" target="_blank" @click.stop="() => {}"></a>
            <el-icon v-if="navMenu.icon" class="nav-menu-icon"><component :is="navMenu.icon || 'el-icon-menu'" /></el-icon>
            <template #title>
                <span class="title-box">{{ navMenu.title }}</span>
            </template>
        </el-menu-item>
        <el-sub-menu v-else :index="navMenu.path">
            <template #title>
                <el-icon v-if="navMenu.icon" class="nav-menu-icon">
                    <component :is="navMenu.icon || 'el-icon-menu'" />
                </el-icon>
                <span class="title-box">{{ navMenu.title }}</span>
            </template>
            <NavMenu :nav-menus="navMenu.children"></NavMenu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { defineComponent, PropType } from 'vue';
import NavMenu from '@/layout/components/NavMenu.vue';
import { type MenuInterface, type Menu } from '@/router/menu';

defineComponent({
    NavMenu,
});

const props = defineProps({
    navMenus: {
        type: Array as PropType<MenuInterface[]>,
        default: () => [],
    },
});

function hasChildren(item: MenuInterface) {
    return item.children && !item.children.every((item: MenuInterface) => item.hidden);
}
</script>
<style lang="scss" scoped>
.title-box {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    padding: 0 3px;
    display: inline-block;
}
.el-sub-menu__title {
    font-size: 13px;
}
.el-menu {
    --el-menu-item-font-size: 13px;
}
.el-sub-menu .el-icon {
    margin-right: 0;
    font-size: 14px;
}
.el-menu-item [class^='el-icon'] {
    margin-right: 0;
    font-size: 14px;
}
</style>
