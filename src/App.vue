<template>
    <el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize">
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts" setup name="appPage">
import { onErrorCaptured, computed, reactive } from 'vue';
import '@/assets/fonts/iconfont.css';
import { useTheme } from '@/hooks/useTheme';
import { globalSettingStoreHook } from '@/store/modules/global';
import { getBrowserLang } from '@/utils/tool';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

// 初始化主题
const { initTheme } = useTheme();
initTheme();

const globalStore = globalSettingStoreHook();
// element 语言配置
const i18nLocale = computed(() => {
    if (globalStore.language && globalStore.language == 'zh') return zhCn;
    if (globalStore.language == 'en') return en;
    return getBrowserLang() == 'zh' ? zhCn : en;
});

// 配置全局组件大小
const assemblySize = computed(() => globalStore.assemblySize);

// 配置element按钮文字中间是否有空格
const config = reactive({
    autoInsertSpace: false,
});

onErrorCaptured((err, el, info) => {
    console.log(err, el, info);
});
</script>
<style lang="scss">
@import '@/style/index.scss';
</style>
