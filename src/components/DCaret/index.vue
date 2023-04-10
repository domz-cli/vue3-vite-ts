<template>
    <div class="contain">
        <i class="sort-caret ascending" :style="{ borderBottomColor: active == 1 ? activeColor : unActiveColor }" @click="handleAscEvent"></i>
        <i class="sort-caret descending" :style="{ borderTopColor: active == 2 ? activeColor : unActiveColor }" @click="handleDescEvent"></i>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, ref, reactive, defineEmits, onMounted } from 'vue';

const props = defineProps({
    activeColor: {
        type: String,
        default: '#409eff',
    },
    unActiveColor: {
        type: String,
        default: '#a8abb2',
    },
});

const active = ref<number>(3);
const emit = defineEmits(['ascEvent', 'descEvent']);

/* const noSelect = (e) => {
    active.value = 3;
};
const _window = window as any;
onMounted(() => {
    console.log(66666666666, window);
    _window.addEventListener('click', noSelect);
});
onBeforeUnmount(() => {
    _window.removeEventListener('click', noSelect);
}); */

function handleAscEvent() {
    active.value = 1;
    emit('ascEvent');
}
function handleDescEvent() {
    active.value = 2;
    emit('descEvent');
}
</script>
<style lang="scss" scoped>
.contain {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 14px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
    .sort-caret {
        width: 0;
        height: 0;
        border: solid 5px transparent;
        position: absolute;
        left: 7px;
    }
    .ascending {
        top: -5px;
    }
    .descending {
        bottom: -3px;
    }
}
</style>
