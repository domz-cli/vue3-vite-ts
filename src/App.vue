<template>
    <div class="outer">Hello World</div>
    <button @click="handleClick">{{ state.count }}</button>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
defineProps({
    msg: String,
});
interface State {
    count: number;
}
const state = reactive<State>({ count: 0 });
const handleClick = () => {
    console.log(state.count);
    state.count++;
};

// 调用本地 Mock 接口
fetch('/apiMock/get')
    .then((response) => response.json())
    .then((json) => {
        console.log(`fetch('/api/todos/1')`, json);
    });
</script>

<style lang="scss" scoped>
.outer {
    font-size: 24px;

    &:hover {
        color: blueviolet;
    }
}
</style>
