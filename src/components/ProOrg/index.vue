<template>
    <template v-for="(org, index) in options">
        <template v-if="values.includes(org.value)">
            <span v-if="tag == false" :key="org.value" :index="index">{{ org.label || org.username }}</span>
            <el-tag v-else :key="index" :disable-transitions="true">{{ org.label || org.username }}</el-tag>
        </template>
    </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    // 列表
    options: {
        type: Array,
        default: null,
    },
    // 值
    value: [Number, String, Array],
    // 标签否
    tag: { type: Boolean, default: false },
});

const values = computed(() => {
    if (props.value !== null && typeof props.value !== 'undefined') {
        return Array.isArray(props.value) ? props.value : [Number(props.value)];
    } else {
        return [];
    }
});
</script>

<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}
</style>
