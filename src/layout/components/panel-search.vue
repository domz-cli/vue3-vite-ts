<template>
    <div class="panel-search">
        <div class="flex-center" @click.self="handlePanelClick">
            <img class="logo-icon" src="@/assets/img/logo.png" alt="logo" />
            <span class="logo-name">domz-admin</span>
            <el-input class="search-input" v-model="input" placeholder="搜索页面" clearable>
                <template #suffix>
                    <el-icon class="el-input__icon"><Search /></el-icon>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

import { globalSettingStoreHook } from '@/store/modules/global';

const globalSettingStore = globalSettingStoreHook();

const input = ref('');

const handlePanelClick = () => {
    globalSettingStore.searchOn = !globalSettingStore.searchOn;
};
</script>

<style lang="scss" scoped>
.panel-search {
    margin: 20px;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.logo-icon {
    width: 50px;
}
.search-input {
    width: 45%;
    height: 40px;
    margin-top: 20px;
}
.logo-name {
    font-size: 16px;
    color: var(--el-menu-active-color);
}
</style>
