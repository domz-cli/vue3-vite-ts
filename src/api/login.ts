import request from '@/utils/request';

// export const getCaptcha = () => {
//     return request.get('/bmp/captcha');
// };

export const getCaptcha = <T = object>(params?: object): Promise<T> => {
    return request.get('/bmp/captcha', params);
};

export const login = <T = object>(params?: object): Promise<T> => {
    return request.post('/bmp/jwt/token', params);
};

export type ILoginData = {
    form?: string;
    username: string;
    password: string;
    verCode: string;
    uuid: string;
    autologin?: boolean;
};
