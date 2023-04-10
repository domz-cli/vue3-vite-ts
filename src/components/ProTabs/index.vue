<template>
    <div class="tabs-warp flex-align-center" :class="{ 'card-style': cardStyle }">
        <div @click="changeTab(index)" class="tabs-item" :class="{ 'tabs-item-active': activeIndex === index }" v-for="(item, index) in dataList" :key="index">
            <span>{{ item[propKey.name || 'name'] }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
const emit = defineEmits(['change-type']);

const activeIndex = ref(0);

const props = defineProps({
    dataList: {
        type: Array,
        default: () => [],
    },
    propsIndex: {
        type: Number,
        default: 0,
    },
    propKey: {
        type: Object,
        default: () => ({}),
    },
    cardStyle: { type: Boolean, default: false },
});

function changeTab(index) {
    activeIndex.value = index || 0;
    emit('change-type', index);
}

onMounted(() => {
    activeIndex.value = props.propsIndex;
});
</script>

<style lang="scss" scoped>
.tabs-warp {
    width: calc(100% + 0px);
    background: #fff;
    padding: 0px 0 15px 12px;
    overflow: auto;
    // margin-left: -30px;
    .tabs-item {
        cursor: pointer;
        padding: 10px 10px;
        margin-left: 30px;
        white-space: nowrap;
    }
    .tabs-item-active {
        position: relative;
        color: #409eff;
        &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 100%;
            height: 3px;
            content: '';
            background: #409eff;
        }
    }
}
$radius: 5px;
$border: #e4e7ed;
.card-style {
    border-left: 1px solid $border;
    border-bottom: 1px solid $border;
    // border-right: 1px solid $border;
    padding-left: 0;
    padding-bottom: 0;
    border-radius: $radius;
    .tabs-item {
        border-top: 1px solid $border;
        border-right: 1px solid $border;
        // border-bottom: 1px solid $border;
        margin-left: 0;
        height: 40px;
        // padding-top: 0;
        // padding-bottom: 0;
        padding: 0;
        display: flex;
        align-items: center;
        min-width: 70px;
        justify-content: center;
        // border-radius: $radius;
        &:last-child {
            border-radius: 0 $radius 0 0;
            // border-right: none;
        }
    }
    .tabs-item-active {
        // border-bottom: none;
        color: #409eff;
        &:after {
            display: none;
        }
    }
}
</style>
