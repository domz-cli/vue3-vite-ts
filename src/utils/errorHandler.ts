import { type ComponentPublicInstance } from 'vue';
/**
 * 全局代码错误捕捉
 * 比如 null.length 就会被捕捉到
 */

export default (error: any, vm: ComponentPublicInstance | null, info?: string) => {
    // 过滤HTTP请求错误
    if (error instanceof Object && error.status) {
        return false;
    }

    const errorMap: any = {
        InternalError: 'Javascript引擎内部错误',
        ReferenceError: '未找到对象',
        TypeError: '使用了错误的类型或对象',
        RangeError: '使用内置对象时，参数超范围',
        SyntaxError: '语法错误',
        EvalError: '错误的使用了Eval',
        URIError: 'URI错误',
    };
    const errorName: string = errorMap[error.name] || '未知错误';
    console.error(`${errorName} - ${error}`, vm, info);
};
