import request from '@/utils/request';

export const infoTagsPage = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daInfoResourceClass/page', params);
};

export const infoTagsPageList = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daInfoResourceClass/pageList', params);
};

export const infoTagsTreeSearchList = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daInfoResourceClass/treeSearchList', params);
};

export const infoTagsTree = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daInfoResourceClass/tree', params);
};

export const infoTagsAdd = <T = object>(params?: object): Promise<T> => {
    return request.post('/asset/daInfoResourceClass', params, { json: true });
};

export const infoTagsEdit = <T = object>(params?: object): Promise<T> => {
    return request.put('/asset/daInfoResourceClass', params, { json: true });
};

export const infoTagsDel = <T = string>(params?: string[]): Promise<T> => {
    return request.delete(`/asset/daInfoResourceClass/delete/${params}`);
};
