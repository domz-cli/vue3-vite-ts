<template>
    <div class="outer">Hello World For Vue3</div>
    <div class="outer">
        <p>Vite + Vue3 + Typescript + Eslint + Prettier + Husky + Jest</p>
        <button @click="handleClick">{{ state.count }}</button>
    </div>
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
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    p {
        font-weight: normal;
    }
    &:hover {
        color: blueviolet;
    }
}
</style>
