const DEFAULT_CONFIG = {
    // 标题
    //APP_NAME: "数据科学平台",
    APP_NAME: '统一平台管理',

    // 首页
    //DASHBOARD_URL: "/dashboard",
    DASHBOARD_URL: '/dmp/application/deal/dataList',

    // 版本号
    APP_VER: '1.0',

    // 内核版本号
    CORE_VER: '1.5.0',
    // 基础平台
    BMP_API: '/bmp',
    // 工作流平台
    WMP_API: '/wmp',
    // 数据平台
    DMP_API: '/dmp',
    // 开发平台
    DEV_API: '/dev',
    // 自动化平台
    BI_API: '/bi',
    // 数据挖掘平台
    MN_API: '/mn',
    //
    PORTAL_API: '/portal',
    // 文档库
    STORAGE_API: '/storage',

    // 请求超时
    TIMEOUT: 10000 * 2,

    // TokenName
    TOKEN_NAME: 'Authorization',

    // Token前缀，注意最后有个空格，如不需要需设置空字符串
    TOKEN_PREFIX: 'Bearer ',

    // 追加其他头
    HEADERS: {},

    // 请求是否开启缓存
    REQUEST_CACHE: false,

    // 布局 默认：default | 通栏：header | 经典：menu | 功能坞：dock
    // dock将关闭标签和面包屑栏
    LAYOUT: 'default',

    // 菜单是否折叠
    MENU_IS_COLLAPSE: false,

    // 菜单是否启用手风琴效果
    MENU_UNIQUE_OPENED: true,

    // 是否开启多标签
    LAYOUT_TAGS: true,

    // 语言
    LANG: 'zh-cn',

    // 主题颜色
    COLOR: '',

    // 控制台首页默认布局
    DEFAULT_GRID: {
        // 默认分栏数量和宽度 例如 [24] [18,6] [8,8,8] [6,12,6]
        layout: [12, 6, 6],
        // 小组件分布，com取值:views/home/components 文件名
        copmsList: [
            ['welcome', 'todo'],
            ['about', 'ver'],
            ['time', 'progress'],
        ],
    },
};

const APP_CONFIG = {
    //标题
    APP_NAME: 'DMP',
    //接口地址，如遇跨域需使用nginx代理
    API_URL: 'https://www.fastmock.site/mock/5039c4361c39a7e3252c5b55971f1bd3/api',
};

//  如果生产模式，就合并动态的APP_CONFIG
//  public/config.js
if (import.meta.env.VITE_NODE_ENV === 'production') {
    Object.assign(DEFAULT_CONFIG, APP_CONFIG);
}

export default DEFAULT_CONFIG;
