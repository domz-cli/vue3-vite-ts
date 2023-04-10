import request from '@/utils/request';

export const tagsPage = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daDataAssetLabel/page', params);
};

export const tagsPageList = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daDataAssetLabel/pageList', params);
};

export const tagsTreeSearchList = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daDataAssetLabel/treeSearchList', params);
};

export const tagsTree = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daDataAssetLabel/tree', params);
};

export const tagsAdd = <T = object>(params?: object): Promise<T> => {
    return request.post('/asset/daDataAssetLabel', params, { json: true });
};

export const tagsEdit = <T = object>(params?: object): Promise<T> => {
    return request.put('/asset/daDataAssetLabel', params, { json: true });
};

export const tagsDel = <T = string>(params?: string[]): Promise<T> => {
    return request.delete(`/asset/daDataAssetLabel/delete/${params}`);
};
