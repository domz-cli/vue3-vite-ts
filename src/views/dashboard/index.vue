<template>
    <el-card shadow="never" class="search-wrapper">
        <el-form ref="searchFormRef" :inline="true" :model="searchData">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="searchData.username" placeholder="请输入" />
                <el-button type="danger" :icon="Delete">批量删除</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import { Delete } from '@element-plus/icons-vue';

const reactiveObj = reactive({
    searchData: {
        username: '',
    },
});
const { searchData } = toRefs(reactiveObj);
</script>

<style lang="scss" scoped>
.dash-box {
    flex: 1;
}
</style>
