import request from '@/utils/request';

export const infoAssetsPage = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daInfoSysList/page', params);
};

export const infoAssetsAdd = <T = object>(params?: object): Promise<T> => {
    return request.post('/asset/daInfoSysList', params, { json: true });
};

export const infoAssetsQuery = <T = object>(params?: string | number): Promise<T> => {
    return request.get(`/asset/daInfoSysList/${params}`);
};

export const infoAssetsApply = <T = string>(params?: string[]): Promise<T> => {
    return request.get(`/asset/daInfoSysList/apply/${params}`);
};

export const infoAssetsDel = <T = string>(params?: string[]): Promise<T> => {
    return request.delete(`/asset/daInfoSysList/delete/${params}`);
};

export const infoAssetsEdit = <T = object>(params?: object): Promise<T> => {
    return request.put('/asset/daInfoSysList', params, { json: true });
};

export const infoAssetsUpdateSys = <T = object>(params?: object): Promise<T> => {
    return request.post('/asset/daInfoSysList/updateSys', params);
};

export const infoAssetsFileSysPage = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daDataFileSys/page', params);
};

export const infoAssetsFileDownload = <T = object>(params?: object): Promise<T> => {
    return request.get('/asset/daDataFileSys/download', params);
};

export const infoAssetsFileUpload = <T = object>(sysId: string, params: object): Promise<T> => {
    return request.post(`/asset/daDataFileSys/upload/${sysId}`, params);
};
