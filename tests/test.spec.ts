import { mount } from '@vue/test-utils'

// 声明一个组件
const MessageComponent = {
    template: '<p>{{ msg }}</p>',
    props: ['msg']
}

// 编写了一个测试用例
// 单元测试 > 集成测试 > E2E测试(端到端) （测试工作量的大小排序）
test('displays message', () => {
    const wrapper = mount(MessageComponent, {
        props: {
            msg: 'Hello world'
        }
    })
    // expect 期待，这个函数执行返回结果包含 'Hello world'
    expect(wrapper.text()).toContain('Hello world')
})