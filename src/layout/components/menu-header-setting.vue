<template>
    <div class="right-menu flex-align-center">
        <el-icon @click="changeStatus" class="right-menu-item search-icon"><Search /></el-icon>
        <Screenfull v-if="showScreenfull" class="right-menu-item" />
        <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
        <Notify v-if="showNotify" class="right-menu-item" />
        <el-dropdown class="right-menu-item">
            <div class="right-menu-avatar">
                <el-avatar :icon="UserFilled" :size="30" />
                <span>{{ userStore.username }}</span>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <router-link to="/">
                        <el-dropdown-item>我的待办</el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click="logout">
                        <span style="display: block">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '@/store/modules/settings';
import { useRouter } from 'vue-router';
import { UserFilled, Search } from '@element-plus/icons-vue';
import { userStoreHook } from '@/store/modules/user';

import ThemeSwitch from '@/components/ThemeSwitch/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import Notify from '@/components/Notify/index.vue';

import { globalSettingStoreHook } from '@/store/modules/global';

const settingsStore = useSettingsStore();
const userStore = userStoreHook();
const router = useRouter();
const globalSettingStore = globalSettingStoreHook();

const showScreenfull = computed(() => {
    return settingsStore.showScreenfull;
});
const showThemeSwitch = computed(() => {
    return settingsStore.showThemeSwitch;
});
const showNotify = computed(() => {
    return settingsStore.showNotify;
});

const logout = () => {
    userStore.logout();
    router.push('/login');
};

const changeStatus = () => {
    globalSettingStore.searchOn = !globalSettingStore.searchOn;
};
</script>

<style lang="scss" scoped>
.right-menu-item {
    margin-left: 20px;
    cursor: pointer;
}
:deep(.search-icon) {
    font-size: 18px;
    color: #909399;
}
</style>
