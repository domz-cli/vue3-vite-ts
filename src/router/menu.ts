export declare interface MenuInterface {
    path?: string;
    title: string;
    icon?: string;
    children?: Menu | null;
    id?: number | string;
    pid?: number | string;
    deep?: number;
    hidden?: boolean;
    type?: string;
}

export declare type Menu = Array<MenuInterface>;

export const menuRoot: Menu = [
    {
        path: '/index',
        title: '首页',
        icon: 'el-icon-edit',
        id: 1,
        deep: 1,
        pid: -1,
        children: [
            {
                path: '/index/infoAssets',
                title: '一级菜单',
                icon: 'el-icon-house',
                id: 11,
                deep: 2,
                pid: 1,
                children: [{ path: '/index/infoAssets', title: '二级菜单', icon: 'el-icon-edit', id: 131, deep: 3, pid: 11, children: [] }],
            },
        ],
    },
    {
        path: '/workbench',
        title: '主题',
        icon: 'el-icon-data-line',
        id: 103,
        deep: 1,
        pid: -1,
        children: [
            // { path: '/workbench/index', title: '主题专区', icon: 'el-icon-edit', id: 121, deep: 2, pid: 2, children: [] }
        ],
    },
];

// 菜单 侧边栏
const menuAside: Menu = [];
// supplementPath([
//     {
//         path: '/index/cartory',
//         title: '目录分类管理',
//         icon: 'home', deep: 2
//     }
// ])

// 菜单 顶部栏
const menuHeader: Menu = [];

/**
 * @description 给菜单数据补充上 path 字段
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu: Menu): Menu {
    return menu.map((e) => ({
        ...e,
        path: e.path,
        ...(e.children
            ? {
                  children: supplementPath(e.children),
              }
            : {}),
    }));
}

/**
 * @description 拆分菜单
 * @param {Array} menu 原始的菜单数据
 * **/

export function rootMenuToTopAndOthers(menu: Menu = []): void {
    menu.map((item) => {
        if (item.deep === 1) {
            const par = { ...item };
            delete par.children;
            menuHeader.push(par);
        } else if (item.deep === 2) {
            menuAside.push(item);
        }
        if (item.children && item.children.length) {
            rootMenuToTopAndOthers(item.children);
        }
    });
}

/**
 * @description 获取拆分后路由
 * **/

export function getMenuRoot() {
    return {
        menuRoot: menuRoot,
        menuAside: supplementPath(menuAside),
        menuHeader: supplementPath(menuHeader),
    };
}
