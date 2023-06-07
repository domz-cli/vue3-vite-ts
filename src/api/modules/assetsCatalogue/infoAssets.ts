import request from '@/utils/request';

export const infoAssetsPage = <T = object>(params?: object): Promise<T> => {
    return request.get('/apiMock/get', params);
};
