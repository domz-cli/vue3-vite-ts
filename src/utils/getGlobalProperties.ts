import { ComponentInternalInstance, getCurrentInstance } from 'vue';

// 获取当前组件实例化中挂载的全局方法
export default function globalCurrentInstance() {
    // ComponentInternalInstance 是一种类型，在同时启用了 "preserveValueImports" 和 "isolatedModules" 时，必须使用仅类型导入进行导入。
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const globalConfig = appContext.config.globalProperties;
    return {
        globalConfig,
    };
}
