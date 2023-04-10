import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import tool from '@/utils/tool';
import { globalSettingStoreHook } from '@/store/modules/global';

const globalSettingStore = globalSettingStoreHook();

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 路由拆分
import { rootMenuToTopAndOthers, menuRoot } from '@/router/menu';
rootMenuToTopAndOthers(menuRoot);

const Layout = () => import('@/layout/index.vue');

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/403',
        component: () => import('@/layout/error-page/403.vue'),
        meta: {
            hidden: true,
        },
    },
    {
        path: '/404',
        component: () => import('@/layout/error-page/404.vue'),
        meta: {
            hidden: true,
        },
        alias: '/:pathMatch(.*)*',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/userCenter/login.vue'),
        meta: {
            hidden: true,
        },
    },
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {
                    title: '首页',
                    svgIcon: 'dashboard',
                    affix: true,
                },
            },
            {
                path: '/index/infoAssets',
                component: () => import('@/views/assetsCatalogue/infoAssets/index.vue'),
                name: 'infoAssets',
                meta: {
                    title: '信息资源管理',
                    svgIcon: 'dashboard',
                    affix: true,
                },
            },
            {
                path: '/index/cartory/ota',
                component: () => import('@/views/assetsCatalogue/index.vue'),
                name: 'cartory',
                meta: {
                    title: '首页',
                    svgIcon: 'dashboard',
                    affix: true,
                },
            },
            {
                path: '/sent',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'set',
                meta: {
                    title: '首页',
                    svgIcon: 'dashboard',
                    affix: true,
                },
            },
            {
                path: '/workbench',
                component: () => import('@/views/workbench/index.vue'),
                name: 'workbench',
                meta: {
                    title: '主题',
                    svgIcon: 'dashboard',
                    affix: true,
                    pageType: 1,
                },
            },
        ],
    },
];

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
// export const asyncRoutes: RouteRecordRaw[] = [
//     {
//         path: '/permission',
//         component: Layout,
//         redirect: '/permission/page',
//         name: 'Permission',
//         meta: {
//             title: '权限管理',
//             svgIcon: 'lock',
//             roles: ['admin', 'editor'], // 可以在根路由中设置角色
//             alwaysShow: true, // 将始终显示根菜单
//         },
//         children: [
//             {
//                 path: 'page',
//                 component: () => import('@/views/permission/page.vue'),
//                 name: 'PagePermission',
//                 meta: {
//                     title: '页面权限',
//                     roles: ['admin'], // 或者在子导航中设置角色
//                 },
//             }
//         ],
//     },
//     {
//         path: '/:pathMatch(.*)*', // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
//         redirect: '/404',
//         name: 'ErrorPage',
//         meta: {
//             hidden: true,
//         },
//     },
// ];

const router = createRouter({
    history: import.meta.env.VITE_ROUTER_HISTORY === 'hash' ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH) : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes,
});

/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        router.getRoutes().forEach((route) => {
            const { name, meta } = route;
            if (name && meta.roles instanceof Array && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name);
            }
        });
    } catch (error) {
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload();
    }
}

//判断是否已加载过动态/静态路由
let isGetRouter = false;

// 导航守卫
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // to即将要进入的目标页 from正要离开的路由
    const token = tool.data.get('TOKEN');
    const { pageType } = to.meta;

    globalSettingStore.layoutPageType = !pageType ? 0 : 1;

    if (['/login'].indexOf(to.path) > -1) {
        isGetRouter = false;
        next();
        NProgress.done();
        return false;
    }
    if (!token) {
        next({ path: 'login' });
        isGetRouter = true;
        NProgress.done();
        return false;
    }

    // 加载动态/静态路由
    if (!isGetRouter) {
        const apiMenu: Array<RouteRecordRaw> = []; // 接口来的路由
        const menuRouter: Array<RouteRecordRaw> = [...apiMenu];

        menuRouter.forEach((item) => {
            router.addRoute(item);
        });
        isGetRouter = true;
    }
    next();
});

router.onError((error) => {
    NProgress.done();
    console.log(error);
});

router.afterEach((to, from) => {
    NProgress.done();
});

export default router;
