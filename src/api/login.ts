import request from '@/utils/request';

// export const getCaptcha = () => {
//     return request.get('/apiMock/captcha');
// };

export const getCaptcha = <T = object>(params?: object): Promise<T> => {
    return request.get('/apiMock/captcha', params);
};

export const login = <T = object>(params?: object): Promise<T> => {
    return request.post('/apiMock/jwt/token', params);
};

export type ILoginData = {
    form?: string;
    username: string;
    password: string;
    verCode: string;
    uuid: string;
    autologin?: boolean;
};
