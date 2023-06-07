import { ref } from 'vue';

interface IThemeList {
    title: string;
    name: ThemeName;
}

const SYSTEM_NAME = 'domz-vite';

/** 缓存数据时用到的 Key */
export class CacheKey {
    static TOKEN = `${SYSTEM_NAME}-token-key`;
    static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`;
    static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`;
}
export const getActiveThemeName = () => {
    return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName;
};
export const setActiveThemeName = (themeName: ThemeName) => {
    localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName);
};

/** 注册的主题名称, 其中 normal 是必填的 */
export type ThemeName = 'normal' | 'dark' | 'dark-blue';

/** 主题列表 */
const themeList: IThemeList[] = [
    {
        title: '默认',
        name: 'normal',
    },
    {
        title: '黑暗',
        name: 'dark',
    },
    {
        title: '深蓝',
        name: 'dark-blue',
    },
];

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || 'normal');

const initTheme = () => {
    setHtmlClassName(activeThemeName.value);
};

const setTheme = (value: ThemeName) => {
    activeThemeName.value = value;
    setHtmlClassName(activeThemeName.value);
    setActiveThemeName(activeThemeName.value);
};

/** 在 html 根元素上挂载 class */
const setHtmlClassName = (value: ThemeName) => {
    // document.documentElement.className = value;
    document.body.setAttribute(`data-theme`, value);
};

/** 主题 hook */
export function useTheme() {
    return { themeList, activeThemeName, initTheme, setTheme };
}
