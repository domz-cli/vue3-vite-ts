<template>
    <section class="tags">
        <ul class="tag-ul">
            <li v-for="(item, index) in tagsList" :key="index" class="tags-li" :class="{ active: isActive(item.path) }">
                <span @click="setStoreForBreadList(item)">
                    <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
                </span>
                <span class="tags-li-icon" @click="closeTags(index, item.path)">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul>

        <div class="tags-close-box">
            <el-dropdown @command="handleCommand">
                <el-button size="mini">
                    <span class="mini-txt">标签选项</span>
                    <el-icon class="mini-icon">
                        <el-icon-arrow-down></el-icon-arrow-down>
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
                        <!-- <el-dropdown-item command="all">关闭所有</el-dropdown-item> -->
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, computed } from 'vue';
import { type MenuInterface, type Menu, getMenuRoot } from '@/router/menu';
import { useRoute } from 'vue-router';

import { tagsStoreHook } from '@/store/modules/tags';
const tagsStore = tagsStoreHook();

const tagsList: any = computed(() => tagsStore.tagsList);
const route = useRoute();
const { menuHeader, menuRoot } = getMenuRoot();

// onBeforeMount(() => {});

function isActive(path: string): boolean {
    return path === route.path;
}

function setStoreForBreadList(item: MenuInterface) {
    console.log(item);
}

function closeTags(index: number, path: string) {
    console.log(index, path);
}

function handleCommand(command: string) {
    if (command == 'closeOther') {
        // 关闭其他标签
        const curItem = tagsList.value.find((item: MenuInterface) => {
            return item.path === route.path;
        });
        // this.tagsList = curItem;
        tagsStore.settingTagsList([curItem]);
    }
}
</script>

<style lang="scss" scoped>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    // background: rgb(246,243,245);
    padding-right: 100px;
    // box-shadow: 0 1px 2px #ddd;
    // border-bottom: 1px solid $color-border-main;
    z-index: 0;
    box-sizing: content-box;
}

.tags ul {
    box-sizing: border-box;
    width: 1000%;
    height: 100%;
    &:active,
    &:focus {
        outline: none;
    }
}

.tags-li {
    float: left;
    margin: 1px 2px 0;
    border-radius: 3px 3px 0 0;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 29px;
    line-height: 26px;
    // border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 8px 0 12px;
    box-shadow: 0 0px 6px 0 rgba(232, 223, 225, 0.5);
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
    &:active,
    &:focus {
        outline: none;
    }
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    background-color: #fafafa;
    color: #000;
    border: 1px solid $color-border-main;
    border-bottom: none;
    position: relative;
    border-radius: 5px 5px 0 0;
    overflow: inherit;
    &:before {
        content: '';
        width: 99999%;
        height: 1px;
        background: $color-border-main;
        position: absolute;
        bottom: 0px;
        right: 100%;
    }
    &:after {
        content: '';
        width: 14183%;
        height: 1px;
        background: $color-border-main;
        position: absolute;
        bottom: 0px;
        left: 100%;
    }
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #000;
}

.tags-close-box {
    position: absolute;
    right: 10px;
    top: 1px;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    // width: 110px;
    height: 30px;
    background: #fff;
    // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
    .el-button--mini {
        border-radius: 3px 3px 0 0;
        height: 30px;
    }
    .mini-txt {
        font-size: 12px;
    }
    .mini-icon {
        margin-left: 2px;
        font-size: 12px;
        color: $color-text-sub;
    }
}
</style>
<!-- <style>
.tags .el-scrollbar .scrollbar-wrapper .el-scrollbar__view {
    overflow: initial !important;
}
</style> -->
