<template>
    <proDialog @closed="close" :title="parseTitle(operationType)" :modelValue="modelValue" width="70%">
        <el-form
            :class="{ 'preview-form': operationType === 'view' }"
            :disabled="operationType === 'view'"
            :hide-required-asterisk="operationType === 'view'"
            class="sc-el-form"
            inline
            :model="reactiveObj.form"
            :rules="reactiveObj.rules"
            ref="formEl"
        >
            <el-form-item class="half-item" label="系统名称" prop="sysName" :label-width="labelWidth">
                <el-input v-model="reactiveObj.form.sysName" placeholder="请输入" class="el-form-input"></el-input>
            </el-form-item>
            <el-form-item class="half-item" label="系统简称" prop="sysShort" :label-width="labelWidth">
                <el-input v-model="reactiveObj.form.sysShort" placeholder="请输入" class="el-form-input"></el-input>
            </el-form-item>
            <el-form-item class="half-item" label="系统状态" prop="sysState" :label-width="labelWidth">
                <el-select v-model="reactiveObj.form.sysState" class="el-form-input" placeholder="请选择">
                    <el-option v-for="item in raOptions" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="half-item" label="权责部门" prop="deptId" :label-width="labelWidth">
                <el-select @change="deptChange" v-model="reactiveObj.form.deptId" class="el-form-input" placeholder="请选择">
                    <el-option v-for="item in deptOptions" :key="item.deptId" :label="item.deptFullName" :value="item.deptId"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="half-item" label="联系电话" prop="telPhone" :label-width="labelWidth">
                <el-input v-model="reactiveObj.form.telPhone" placeholder="请输入" class="el-form-input"></el-input>
            </el-form-item>
            <el-form-item class="half-item" label="部门经办人" prop="deptOperator" :label-width="labelWidth">
                <el-select v-model="reactiveObj.form.deptOperator" class="el-form-input" placeholder="请选择">
                    <el-option v-for="item in bmOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button-group>
                    <el-button @click="close()">{{ operationType !== 'view' ? '取 消' : '关 闭' }}</el-button>
                    <el-button v-if="operationType !== 'view'" type="primary" @click="submitAdd(1)">确 定</el-button>
                </el-button-group>
            </div>
        </template>
    </proDialog>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, watch } from 'vue';
import { User } from '@/api/interface';
import { ElMessage } from 'element-plus';
import { type codeInter } from '@/api/interface/dict';

import api from '@/api';
import { getData, type Ifn } from '@/views/assetsCatalogue/infoAssets/components/info';

interface sysForm {
    sysId: number;
    sysName: string;
    sysShort: string;
    sysState: number;
    deptId: number;
    telPhone: number;
    deptOperator: string; // 默认值是当前登录的用户id
}
interface infoProps {
    operationType: string;
    modelValue: boolean;
    pageData: { [key: string]: any };
    sysStateOptions: codeInter[];
}

const props = withDefaults(defineProps<infoProps>(), {
    operationType: 'create',
    modelValue: false,
    pageData: () => ({}),
    sysStateOptions: () => [],
});
const emit = defineEmits(['update:modelValue', 'refresh', 'close']);

interface raOptionsType {
    id: number;
    name: string;
}

interface deptOptionsType {
    deptId: number;
    deptFullName: string;
}

interface FormRules {
    form: sysForm;
    rules: { [key: string]: any };
}

const reactiveObj: FormRules = reactive({
    form: {} as sysForm, // User.ResUserList,
    rules: {
        sysName: [{ required: true, message: '请输入', trigger: 'blur' }],
        sysShort: [{ required: true, message: '请输入', trigger: 'blur' }],
        sysState: [{ required: true, message: '请选择', trigger: 'blur' }],
        deptId: [{ required: true, message: '请选择', trigger: 'blur' }],
        telPhone: [{ required: true, message: '请输入', trigger: 'blur' }],
        deptOperator: [{ required: true, message: '请选择', trigger: 'blur' }],
    },
});

const raOptions = ref<codeInter[]>([]);
const bmOptions = ref<raOptionsType[]>([]);
const deptOptions = ref<deptOptionsType[]>([]);

const labelWidth = ref('120px');
const formEl = ref();

function submitAdd(type: number) {
    const thisRuleForm = reactiveObj.form;
    formEl.value.validate((valid: boolean) => {
        if (valid) {
            const params: any = { sysName: '', sysState: 0, telPhone: '', sysShort: '', deptId: 0, deptOperator: 0 };
            for (const [k, v] of Object.entries(thisRuleForm)) {
                if (k in params && v) params[k] = v;
            }
            switch (props.operationType) {
                case 'create':
                    params.bizState = 1;
                    manageFn(1, params, () => {
                        emit('update:modelValue', false);
                        emit('refresh');
                    });
                    break;
                case 'edit':
                    params.sysId = thisRuleForm.sysId;
                    manageFn(2, params, () => {
                        emit('update:modelValue', false);
                        emit('refresh');
                    });
                    break;
            }
            // console.log(params, 999);
        } else {
            return false;
        }
    });
}

async function deptChange(val: number) {
    reactiveObj.form.deptOperator = '';
    const resData = await getData(api.userModules.user.userPage, { deptId: val });
    bmOptions.value = resData;
}

// 各类编辑操作
async function manageFn(type: number, params: any, callBack: Ifn) {
    let asyncResult = null;
    let msg = '';
    let msgType: any = '';
    const waitResult = null;
    switch (type) {
        case 1:
            asyncResult = await api.assetsCatalogue.infoAssets.infoAssetsAdd(params);
            msg = '新增';
            break;
        case 2:
            asyncResult = await api.assetsCatalogue.infoAssets.infoAssetsEdit(params);
            msg = '编辑';
            break;
        default:
            break;
    }
    console.log(msg, asyncResult);
    if (msg === '') return asyncResult;
    asyncResult.code === 200 ? (msgType = 'success') : (msgType = 'error');
    ElMessage({
        message: `${msg}${msgType === 'success' ? '成功' : '失败了'}！`,
        type: msgType,
    });
    // this.pagination.currentPage = 1;
    // 刷新列表数据
    // this.searchCurrKeys()
    if (typeof callBack === 'function') callBack();
}

function close() {
    formEl.value.clearValidate();
    emit('update:modelValue', false);
    emit('close');
}
function parseTitle(type: string) {
    switch (type) {
        case 'create':
            return '新增';
        case 'edit':
            return '编辑';
        case 'view':
            return '查看';
        default:
            // console.log(type)
            return '';
    }
}

watch(
    (): any => props.pageData,
    (newValObj: sysForm, oldValue) => {
        const newVal: sysForm = Object.assign({}, newValObj);
        reactiveObj.form = newVal || {};
    },
    { deep: true }
);

watch(
    () => props.sysStateOptions,
    (newVal) => {
        raOptions.value = newVal;
    }
);

watch(
    () => props.modelValue,
    (newVal: boolean) => {
        if (newVal && !deptOptions.value.length) {
            getData(api.userModules.user.deptPage, {}, (resData) => {
                deptOptions.value = resData || [];
            });
        }
        if (!newVal) {
            reactiveObj.form = {} as sysForm;
        }

        // if (dimensionRef.value) dimensionRef.value.select(dimensionRef.value.getNode(newVal.subjName));
    }
);

onBeforeMount(() => {
    // getData(api.userModules.user.userPage);
});
</script>

<style lang="scss" scoped></style>
