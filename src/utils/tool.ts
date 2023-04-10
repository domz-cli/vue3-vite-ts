import { type MenuInterface, type Menu } from '@/router/menu';

interface gol {
    set(table: string, settings: any): void;
    get(table: string): any;
    remove(table: string): void;
    clear(): void;
}

interface toolConfig {
    data: gol;
    session: gol;
}

interface ParamsType {
    children: string;
    nodeValue: string | number;
}

interface Ifn {
    (): void;
}

const tool: toolConfig = {
    data: {
        set(table: string, settings: any) {
            const _set = JSON.stringify(settings);
            localStorage.setItem(table, _set);
        },
        get(table: string): any {
            let data: string | null = localStorage.getItem(table);
            try {
                if (data !== null) data = JSON.parse(data);
            } catch (err) {
                return null;
            }
            return data;
        },
        remove(table: string) {
            localStorage.removeItem(table);
        },
        clear() {
            localStorage.clear();
        },
    },
    /*sessionStorage*/
    session: {
        set(table: string, settings: any) {
            const _set = JSON.stringify(settings);
            return sessionStorage.setItem(table, _set);
        },
        get(table: string) {
            let data: string | null = sessionStorage.getItem(table);
            try {
                if (data !== null) data = JSON.parse(data);
            } catch (err) {
                return null;
            }
            return data;
        },
        remove(table: string) {
            return sessionStorage.removeItem(table);
        },
        clear() {
            return sessionStorage.clear();
        },
    },
};

// 根据路由path，查出对应的树节点
export function deepLoopForTree(path: string | number, tree: Array<MenuInterface>, paramsConfig?: ParamsType) {
    const treeParamsConfig: ParamsType = paramsConfig || {
        children: 'children', // 子节点
        nodeValue: 'path', // 被比对的key
    };
    let pathStr: string | number = path || '';
    const treeList = tree || [];
    if (typeof pathStr === 'string') pathStr = pathStr.split('?')[0];
    let result = {};

    function deep(path: string | number, tree: any) {
        if (!path || !tree.length) return {};
        for (let i = 0, j = tree.length; i < j; i++) {
            const row = tree[i] || {};
            if (row[treeParamsConfig.nodeValue] === path) {
                result = row;
                break;
            } else {
                const children = row[treeParamsConfig.children] || [];
                if (children.length && !Object.keys(result).length) {
                    deep(path, children);
                }
            }
        }
        return result;
    }
    return deep(pathStr, treeList);
}

// 根据路由path，查出对应的树节点的最后一级菜单
export function findDeepsNode(path: string, rootTree: Array<MenuInterface>, paramsConfig?: ParamsType) {
    const treeParamsConfig = paramsConfig || {
        children: 'children', // 子节点
        nodeValue: 'path', // 被比对的key
    };
    const itemObject: any = deepLoopForTree(path, rootTree, treeParamsConfig);
    const tree = itemObject.children || [];

    let result = {};
    function deep(itemObj: MenuInterface, tree: Array<MenuInterface>) {
        if (!(itemObj instanceof Object) || !tree.length) return itemObj;
        const firstItem = tree[0] || {};
        const firstItemChildren = firstItem.children || [];
        if (firstItemChildren.length) {
            deep(firstItem, firstItemChildren);
        } else {
            result = firstItem;
        }
        return result;
    }
    return deep(itemObject, tree);
}

// 根据路由path，查出对应树节点的最顶级菜单
export function findRootTopNode(path: string, menuRoot: Array<MenuInterface>, paramsConfig?: ParamsType): MenuInterface {
    const treeParamsConfig: ParamsType = paramsConfig || {
        children: 'children', // 子节点唯一标识
        nodeValue: 'id', // 父节点唯一标识
    };

    let itemObj: any = {};
    itemObj = deepLoopForTree(path, menuRoot) || {};
    const tree = menuRoot || [];

    let result: MenuInterface;
    function deep(itemObj: MenuInterface, tree: Array<MenuInterface>, treeParamsConfig: ParamsType): MenuInterface {
        if (itemObj.pid <= 0) {
            result = itemObj;
        } else {
            const res: any = deepLoopForTree(itemObj.pid, tree, treeParamsConfig);
            deep(res, tree, treeParamsConfig);
        }
        return result;
    }
    return deep(itemObj, tree, treeParamsConfig);
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames 指定 label && value 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(callValue: any, enumData: any[] | undefined, fieldNames?: { label: string; value: string }, type?: string): string {
    const value = fieldNames?.value ?? 'value';
    const label = fieldNames?.label ?? 'label';
    let filterData: { [key: string]: any } = {};
    if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue);
    if (type == 'tag') return filterData?.tagType ? filterData.tagType : '';
    return filterData ? filterData[label] : '--';
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--';
    return callValue ?? '--';
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val);
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
    const propArr = prop.split('.');
    if (propArr.length == 1) return prop;
    return propArr[propArr.length - 1];
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
    if (!prop.includes('.')) return row[prop] ?? '--';
    prop.split('.').forEach((item) => (row = row[item] ?? '--'));
    return row;
}

// 防抖
export function debounce(fn: Ifn, delay: number) {
    let timeId: any = null;
    return function () {
        const argumentsArr: any = arguments;
        if (timeId) {
            clearTimeout(timeId);
        }
        timeId = setTimeout(function () {
            fn.apply(this, argumentsArr);
            clearTimeout(timeId);
        }, delay);
    };
}
export const filterNode = (value: string, data: any) => {
    if (!value) return true;
    const targetText = data.title;
    return targetText.indexOf(value) !== -1;
};

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
    const str: string = 'browserLanguage' in navigator && typeof navigator.browserLanguage === 'string' ? navigator.browserLanguage : 'zh-CN';
    const browserLang: string = navigator.language ? navigator.language : str;
    let defaultBrowserLang = '';
    if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
        defaultBrowserLang = 'zh';
    } else {
        defaultBrowserLang = 'en';
    }
    return defaultBrowserLang;
}

export default tool;
