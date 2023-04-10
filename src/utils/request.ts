import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessageBox, ElNotification } from 'element-plus';
import sysConfig from '@/config';
import tool, { debounce } from '@/utils/tool';
import router from '@/router';

axios.defaults.baseURL = import.meta.env.VITE_APP_LOGOUT_URL; // ''
//axios.defaults.baseURL = 'http://125.124.183.20:89'

axios.defaults.timeout = 10000;

let errorBox: any = null;

function reLogin() {
    if (errorBox) return;
    errorBox = ElMessageBox.confirm('登录令牌已失效，请您重新登录！', '', {
        type: 'error',
        closeOnClickModal: false,
        cancelButtonText: '取消',
        confirmButtonText: '登录',
    })
        .then(() => {
            errorBox = null;
            router.replace({ path: '/login' });
        })
        .catch((e) => {
            console.log('e', e);
            errorBox = null;
        });
}

// HTTP request 拦截器
axios.interceptors.request.use(
    (config) => {
        const token = tool.data.get('TOKEN');
        if (token) {
            config.headers['Authorization'] = sysConfig.TOKEN_PREFIX + token;
        }
        if (config.method == 'get') {
            config.params = config.params || {};
            config.params['_'] = new Date().getTime();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 防抖
const errorDebounce = debounce(reLogin, 500);

// HTTP response 拦截器
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('error.response', error.response);
            if (error.response.status === 404) {
                ElNotification.error({
                    title: '请求错误',
                    message: 'Status:404，正在请求不存在的服务器记录！',
                });
            } else if (error.response.status === 500) {
                ElNotification.error({
                    title: '请求错误',
                    message: error.response.message || 'Status:500，服务器发生错误！',
                });
            } else if (error.response.status === 401) {
                errorDebounce();
            } else if (error.response.status === 403) {
                ElNotification.error({
                    title: '没有请求权限!',
                    message: error.response.data.message || `Status:${error.response.data.code}！`,
                });
            } else {
                ElNotification.error({
                    title: '请求错误',
                    message: error.response.status || `Status:${error.response.statusText}，未知错误！`,
                });
            }
        } else {
            console.log('error', error);
            ElNotification.error({
                title: '请求错误',
                message: '请求服务器无响应！',
            });
        }

        return Promise.reject(error.response);
    }
);
class http {
    /** get 请求
     * @param  {string} url
     * @param  {请求参数} params
     * @param  {参数} config
     */
    get<T = object>(url: string, params: object = {}, config: object = {}): Promise<T> {
        const paramsObj: any = Object.assign({}, params);
        for (const i in paramsObj) {
            const offsetStr = paramsObj[i];
            if (typeof offsetStr === 'string') {
                paramsObj[i] = offsetStr.trim();
            }
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                params: paramsObj,
                ...config,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /** post 请求
     * @param  {string} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    post<T = object>(url: string, data: object = {}, config: object = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: data,
                ...config,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /** put 请求
     * @param  {string} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    put<T = object>(url: string, data: object = {}, config: object = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: url,
                data: data,
                ...config,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /** patch 请求
     * @param  {接口地址} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    patch<T = object>(url: string, data: object = {}, config: object = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'patch',
                url: url,
                data: data,
                ...config,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /** delete 请求
     * @param  {string} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    delete<T = object>(url: string, data: object = {}, config: object = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: url,
                data: data,
                ...config,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /** jsonp 请求
     * @param  {接口地址} url
     * @param  {JSONP回调函数名称} name
     */
    jsonp<T = object>(url: string, name: string | number = 'jsonp'): Promise<T> {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            const _id = `jsonp${Math.ceil(Math.random() * 1000000)}`;
            script.id = _id;
            script.type = 'text/javascript';
            script.src = url;
            const _window = window as any;
            _window[name] = (response: T): void => {
                resolve(response);
                document.getElementsByTagName('head')[0].removeChild(script);
                try {
                    delete _window[name];
                } catch (e) {
                    _window[name] = undefined;
                }
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }
}

export default new http();
