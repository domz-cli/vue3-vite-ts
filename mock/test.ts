import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/apiMock/get',
        method: 'get',
        response: ({ query }) => {
            return {
                code: 200,
                data: {
                    rows: [{
                        name: 'vben',
                        title: '标题',
                        body: '内容',
                    }]
                },
            };
        },
    },
] as MockMethod[];
// as 是 Typescript运算符。
// A as B 断言：断定 A 会是一个 B类型.
