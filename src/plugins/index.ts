import { type App, type ComponentPublicInstance } from 'vue';
import { loadElementPlusIcon } from '@/plugins/elemtent-plus';
import globalProperties from '@/plugins/globalProperties';
import globalComponents from '@/plugins/gloalComponents';

import errorHandler from '@/utils/errorHandler';

export interface ComponentOptions {
    errorCaptured?(this: ComponentPublicInstance, err: unknown, instance: ComponentPublicInstance | null, info: string): boolean | void;
}

export function loadPlugins(app: App) {
    loadElementPlusIcon(app);
    app.use(globalComponents);
    app.use(globalProperties);
    // 全局代码错误捕捉
    // app.config.errorHandler = (err: unknown | any, instance: ComponentPublicInstance | null, info: string) => {
    //     // handling the error
    //     errorHandler(err, instance)
    // }
}
