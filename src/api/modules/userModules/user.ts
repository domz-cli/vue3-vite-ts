import request from '@/utils/request';

export const userPage = <T = object>(params?: object): Promise<T> => {
    return request.get('/bmp/user/page', params);
};

export const deptPage = <T = object>(params?: object): Promise<T> => {
    return request.get('/bmp/dept/page', params);
};
