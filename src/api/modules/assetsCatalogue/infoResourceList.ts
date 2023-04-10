import request from '@/utils/request';

export const daInfoResourcePage = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daInfoResourceList/page', params);
};

export const daInfoResourceAdd = <T = object>(params?: object): Promise<T> => {
    return request.post('/asset/daInfoResourceList', params, { json: true });
};

export const daInfoResourceAddOrUpdate = <T = object>(params?: object): Promise<T> => {
    return request.post('/asset/daInfoResourceList/addOrUpdate', params, { json: true });
};

export const daInfoResourceQuery = <T = object>(params?: string | number): Promise<T> => {
    return request.get(`/asset/daInfoResourceList/findById/${params}`);
};

export const daInfoResourceApply = <T = string>(params?: string[]): Promise<T> => {
    return request.get(`/asset/daInfoResourceList/apply/${params}`);
};

export const daInfoResourceDel = <T = string>(params?: string[]): Promise<T> => {
    return request.delete(`/asset/daInfoResourceList/delete/${params}`);
};

export const daInfoResourceEdit = <T = object>(params?: object): Promise<T> => {
    return request.put('/asset/daInfoResourceList', params, { json: true });
};

export const daInfoResourceUpdateSys = <T = object>(params?: object): Promise<T> => {
    return request.post('/asset/daInfoResourceList/updateSys', params);
};
