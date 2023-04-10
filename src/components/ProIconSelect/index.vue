<template>
    <div class="pro-icon-select">
        <el-input v-model="defaultValue" :prefix-icon="defaultValue || 'none'" :placeholder="placeholder" :clearable="clearable" :disabled="disabled">
            <template #append><el-button class="append-icon" icon="el-icon-more-filled" @click="open"></el-button></template>
        </el-input>
        <ProDialog title="图标选择器" v-model="dialogVisible" :width="780" destroy-on-close>
            <el-tabs style="margin-top: -30px">
                <el-tab-pane v-for="item in iconsList" :key="item.name" lazy>
                    <template #label>
                        {{ item.name }}
                        <el-tag size="small" type="info">{{ item.icons.length }}</el-tag>
                    </template>
                    <div class="pro-icon-select__list">
                        <el-scrollbar>
                            <ul @click="selectIcon">
                                <li v-for="icon in item.icons" :key="icon">
                                    <span :data-icon="icon"></span>
                                    <el-icon><component :is="icon" /></el-icon>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </ProDialog>
    </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, watch, nextTick, ref, onMounted } from 'vue';
import { iconsList } from '@/config/iconSelect';

const props = defineProps({
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '请输入或者选择图标' },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
});
const react = reactive({
    defaultValue: '',
    dialogVisible: false,
});
const { defaultValue, dialogVisible } = toRefs(react);

const emit = defineEmits(['update:modelValue']);

watch(
    () => props.modelValue,
    (newVal) => {
        defaultValue.value = newVal;
    }
);
watch(
    () => react.defaultValue,
    (newVal) => {
        emit('update:modelValue', newVal);
    }
);
onMounted(() => {
    react.defaultValue = props.modelValue;
});

const open = () => {
    if (props.disabled) {
        return false;
    }
    react.dialogVisible = true;
};
const selectIcon = (e: any) => {
    if (e.target.tagName != 'SPAN') {
        return false;
    }
    react.defaultValue = e.target.dataset.icon;
    react.dialogVisible = false;
    emit('update:modelValue', react.defaultValue);
};
</script>
<style scoped>
.pro-icon-select {
    display: inline-block;
}
.pro-icon-select__list {
    height: 360px;
    overflow: auto;
}
.pro-icon-select__list ul {
}
.pro-icon-select__list li {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 5px;
    vertical-align: top;
    box-shadow: 0 0 0 1px #eee;
    transition: all 0.1s;
    border-radius: 4px;
    position: relative;
}
.pro-icon-select__list li span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    cursor: pointer;
}
.pro-icon-select__list li i {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 26px;
    color: #6d7882;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
}
.pro-icon-select__list li:hover {
    box-shadow: 0 0 1px 4px rgba(64, 158, 255, 1);
}
.pro-icon-select__list li:hover i {
    color: #409eff;
}
</style>

<style lang="scss">
.el-input-group__append {
    .append-icon {
        margin: 0;
    }
}
</style>
