export interface Ifn {
    (result?: any): void;
}

export interface apiInter {
    <T>(params: any): Promise<T>;
}

export async function getData(apiFn: apiInter, params: any, callBack?: Ifn) {
    try {
        const res: any = await apiFn(params);
        if (res.code === 200) {
            let resData = res.data || {};
            // if (resData instanceof Array) {
            //     resData = resData || [];
            // }
            if (resData.rows) {
                resData = resData.rows || [];
            }
            if (callBack instanceof Function) callBack(resData);
            return resData;
        }
    } catch (e) {
        console.log('err:', e);
    } finally {
        // this.loading_ = false;
    }
}
