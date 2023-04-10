<template>
    <el-tooltip class="box-item" effect="dark" :content="content" placement="top">
        <el-button round>?</el-button>
    </el-tooltip>
</template>

<script lang="ts" setup>
interface infoProps {
    content: string;
}
const props = withDefaults(defineProps<infoProps>(), {
    content: '',
});
</script>

<style lang="scss" scoped></style>
