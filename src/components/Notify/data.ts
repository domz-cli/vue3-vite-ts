export interface IListItem {
    avatar?: string;
    title: string;
    datetime?: string;
    description?: string;
    status?: '' | 'success' | 'info' | 'warning' | 'danger';
    extra?: string;
}

export const notifyData: IListItem[] = [
    {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '上线啦',
        datetime: '半年前',
        description: '更新',
    },
    {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '上线啦',
        datetime: '一年前',
        description: '发布',
    },
];

export const messageData: IListItem[] = [
    {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '来自大话西游',
        description: '如果非要在这份爱上加上一个期限，我希望是一万年',
        datetime: '1995-02-04',
    },
];

export const todoData: IListItem[] = [
    {
        title: '任务名称',
        description: '这家伙很懒，什么都没留下',
        extra: '未开始',
        status: 'info',
    },
    {
        title: '任务名称',
        description: '这家伙很懒，什么都没留下',
        extra: '进行中',
        status: '',
    },
    {
        title: '任务名称',
        description: '这家伙很懒，什么都没留下',
        extra: '已超时',
        status: 'danger',
    },
];
