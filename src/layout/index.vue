<template>
    <section class="ayout-header-aside-group">
        <!-- 半透明遮罩 -->
        <div class="ayout-header-aside-mask"></div>
        <!-- 主体内容 -->
        <div class="ayout-header-aside-content">
            <!-- 顶栏 -->
            <header class="doz-theme-header" :style="{ opacity: searchActive ? 0.5 : 1 }" flex-box="0" flex>
                <section class="logo-box flex">
                    <router-link to="/index" :class="{ 'logo-group': true, 'logo-transition': asideCollapse }" :style="{ width: asideCollapse ? '65px' : '190px' }" flex-box="0">
                        <img class="logo" src="@/assets/img/logo2.png" />
                    </router-link>
                    <!-- 折叠按钮 -->
                    <div class="toggle-aside-btn" @click="handleToggleAside">
                        <el-icon>
                            <el-icon-expand v-if="asideCollapse" />
                            <el-icon-fold v-else />
                        </el-icon>
                    </div>
                    <menu-header flex-box="1" />
                </section>
                <!-- 顶栏右侧 -->
                <section class="doz-header-right flex-align-center" flex-box="0">
                    <menuHeaderSetting></menuHeaderSetting>
                </section>
            </header>
            <!-- 下面 主体 -->
            <div class="doz-theme-container flex" flex-box="1" flex>
                <!-- 主体 侧边栏 -->
                <menuNav></menuNav>
                <!-- 主体 -->
                <transition name="fade-scale">
                    <div class="doz-theme-container-main" :style="{ width: `calc(100vw - ${asideWidth})` }" :class="{ 'doz-theme-container-noside': layoutPageType }" flex-box="1" flex>
                        <!-- 搜索 -->
                        <transition name="fade-scale"></transition>
                        <!-- 内容 -->
                        <transition name="fade-scale">
                            <!-- tab -->
                            <section class="doz-theme-container-main-layer" flex="dir:top">
                                <!-- <div v-if="!layoutPageType" class="doz-theme-container-main-header" flex-box="0">
                                    <menuTags />
                                </div> -->
                                <!-- 页面 -->
                                <main class="doz-theme-container-main-body" :class="{ 'no-margin': layoutPageType }">
                                    <transition :name="transitionActive ? 'fade-transverse' : ''">
                                        <keep-alive :include="keepAlive">
                                            <router-view :key="routerViewKey" />
                                        </keep-alive>
                                    </transition>
                                </main>
                            </section>
                        </transition>
                    </div>
                </transition>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, reactive, toRefs, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
// import { mapMutations, mapState, mapGetters } from 'vuex';
import defineGlobalStance from '@/utils/getGlobalProperties';
import { globalSettingStoreHook } from '@/store/modules/global';

import menuHeader from '@/layout/components/menu-header.vue';
import menuHeaderSetting from '@/layout/components/menu-header-setting.vue';
// import menuTags from '@/layout/components/menu-tags.vue';
import menuNav from '@/layout/components/menu-nav.vue';
import NavMenu from '@/layout/components/NavMenu.vue';

const route = useRoute();
const { globalConfig } = defineGlobalStance();
const globalSettingStore = globalSettingStoreHook();

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

const routerViewKey = computed(() => {
    // 默认情况下 key 类似 __transition-n-/foo
    // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
    const stamp = route.meta[`__stamp-${route.path}`] || '';
    return `${stamp ? `__stamp-${stamp}-` : ''}${route.path}`;
});

const listObject: Array<any> = [];
const pmenuObject: any = {};

const env = import.meta.env.VUE_APP_CURRENTMODE || 'production';
const reactiveObj = reactive({
    menu: listObject,
    processEnv: env,
    pmenu: pmenuObject,
    nextMenu: [],
    active: '',
    searchActive: false,
    transitionActive: true,
    keepAlive: [], // 需要缓存的页面 name，此功能待进一步完善
});
const { transitionActive, keepAlive, processEnv, pmenu, menu, active, nextMenu, searchActive } = toRefs(reactiveObj);

defineComponent({
    menuHeader,
    NavMenu,
    menuNav,
    // menuTags,
});

// const { isProjectionScreen } = mapState(['isProjectionScreen']);

function showMenu(route: object) {
    console.log('showMenu');
}

function exitMaximize() {
    console.log('exitMaximize');
}
function openSetting() {
    console.log('openSetting');
}

function handleToggleAside() {
    globalSettingStore.asideCollapse = !globalSettingStore.asideCollapse;
}
</script>

<style lang="scss" scoped>
@import './layout.scss';
</style>
