<template>
    <section class="info-assets">
        <ProTable ref="proTableRef" :cardStyle="true" title="用户列表" :columns="columns" :request-api="getTableList" :init-param="initParamObj" :data-callback="dataCallback" :selectId="'sysId'">
            <template #tableHeader="scope">
                <section class="flex-space-center full-box">
                    <article class="">
                        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('create')">新增</el-button>
                        <!-- <el-button type="primary" :icon="Edit" plain :disabled="!scope.isSelected" @click="downloadFile(scope)">完善系统</el-button> -->
                        <el-button type="primary" :icon="Upload" plain :disabled="!scope.isSelected" @click="batchAdd(scope)">接入</el-button>
                    </article>
                    <helpInfo :content="helpInfoTxt"></helpInfo>
                </section>
                <!-- <el-button type="primary" :icon="Download" plain :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)"> 注册资产 </el-button> -->
            </template>
            <template #expand="scope">
                {{ scope.row }}
            </template>
            <!-- <template #usernameHeader="scope">
                <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
                    {{ scope.row.label }}
                </el-button>
            </template> -->
            <template #createTime="scope">
                <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
                    {{ scope.row.createTime }}
                </el-button>
            </template>
            <template #operation="scope">
                <el-button type="primary" link @click="openDrawer('view', scope.row)">查看</el-button>
                <el-button type="primary" link @click="openDrawer('edit', scope.row)">编辑</el-button>
                <el-button type="primary" link @click="deleteAccount(scope.row)">删除</el-button>
            </template>
        </ProTable>
    </section>
    <!-- <section class="info-assets info-assets-list">
        <ProTable ref="proTableOther" :cardStyle="true" title="用户列表" :columns="columnsDb" :request-api="getDbTableList" :init-param="{}" :data-callback="dbDataCallback">
            <template #tableHeader>
                <el-button type="primary" :icon="CirclePlus" @click="addClickHandlerFn(1)">上传</el-button>
                <el-button type="primary" :icon="SortDown" @click="addClickHandlerFn(2)">下载模版</el-button>
                <helpInfo :content="dbHelpInfoTxt"></helpInfo>
            </template>
            <template #expand="scope">
                {{ scope.row }}
            </template>
            <template #operation="scope">
                <el-button @click="editScenic(scope.row, 1)" type="text" size="small">下载</el-button>
            </template>
        </ProTable>
    </section> -->

    <!-- 数据库设计文档 -->
    <proDialog width="80%" title="数据库文档" v-model="showFlg">
        <ProTable ref="proTableOther" title="用户列表" :columns="columnsDb" :request-api="getDbTableList" :init-param="{}" :data-callback="dbDataCallback">
            <template #tableHeader>
                <el-button type="primary" :icon="CirclePlus" @click="addClickHandlerFn(1)">上传</el-button>
                <el-button type="primary" :icon="SortDown" @click="addClickHandlerFn(2)">下载模版</el-button>
                <helpInfo :content="dbHelpInfoTxt"></helpInfo>
            </template>
            <template #expand="scope">
                {{ scope.row }}
            </template>
            <template #operation="scope">
                <el-button @click="editScenic(scope.row, 1)" type="text" size="small">下载</el-button>
            </template>
        </ProTable>
        <template #footer>
            <el-button-group>
                <el-button @click="showFlg = false">取 消</el-button>
                <el-button type="primary">保 存</el-button>
            </el-button-group>
        </template>
    </proDialog>
    <!-- <allinone @refresh="upsearch" :sysStateOptions="initParam.sysStateOptions" :operationType="operationType" :pageData="offsetRow" v-model="dialogFormVisible"></allinone> -->
    <!-- v-model="settingSysInfoVisible" -->
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive, toRefs, defineComponent, onBeforeMount, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { User } from '@/api/interface';
import { type ColumnProps } from '@/components/ProTable/interface';
import { CirclePlus, SortUp, Edit, Download, Upload, View, SortDown } from '@element-plus/icons-vue';
import allinone from '@/views/assetsCatalogue/infoAssets/components/allinone.vue';
import helpInfo from '@/views/assetsCatalogue/infoAssets/components/helpInfo.vue';

import api from '@/api';
import { type Dict } from '@/api/interface/dict';

const router = useRouter();

interface sysForm {
    sysId: number;
    sysName: string;
    sysShort: string;
    sysState: number;
    deptId: number;
    telPhone: number;
    deptOperator: number; // 默认值是当前登录的用户id
}

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTableRef = ref();
const proTableOther = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParamObj = reactive({
    type: 1,
});

const initParam = reactive({
    type: 1,
    showFlg: false,
    loading: false,
    operationType: 'create',
    offsetRow: {} as sysForm,
    dialogFormVisible: false,
    settingSysInfoVisible: false,
    offsetScope: {} as sysForm,
    groupTabList: {
        tableList: [],
    },
    helpInfoTxt: '',
    dbHelpInfoTxt: '',
    sysStateOptions: [],
});

const reactiveObj = reactive({
    fileList: [],
    uploadURI: '',
});

defineComponent({
    allinone,
});

const { showFlg, helpInfoTxt, dbHelpInfoTxt, operationType, offsetRow, dialogFormVisible, settingSysInfoVisible } = toRefs(initParam);

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any = {}) => {
    const list = data.rows || data.list;
    list.forEach((item: any) => {
        item.deptId = parseInt(item.deptId);
        item.sysState = parseInt(item.sysState);
        // item.bizState = item.bizState ? item.bizState : 1;
    });
    return {
        list,
        total: data.total,
        pageNum: data.page,
        pageSize: data.pageSize || 10,
    };
};

const dbDataCallback = (data: any = {}) => {
    return {
        list: data.rows || [],
        total: data.total,
        pageNum: data.page,
        pageSize: data.pageSize || 10,
    };
};
// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const reRender = (scope: { row: sysForm }) => {
    return (
        <>
            <el-button type="text" plain onClick={showDetail.bind(this, scope)}>
                {scope.row.sysName}
            </el-button>
        </>
    );
};

function settingClose() {
    offsetRow.value = {} as sysForm;
}

async function uploadSuccess() {
    // groupTabList.tableList
    // const { data } = await api.assetsCatalogue.infoAssets.infoAssetsQuery(offsetRow.value.sysId);
    // groupTabList.value.tableList = data.fileList || [];
    proTableOther.value && proTableOther.value.getTableList();
}

async function showDetail(scope: any) {
    // ElMessage.success('我是通过 tsx 语法渲染的表头');
    // const selectedListIds = scope.selectedListIds || [];
    // api.assetsCatalogue.infoAssets.infoAssetsQuery(scope.row.sysId).then((res: any) => {
    //     console.log(333, res);
    //     offsetRow.value = res.data || {};
    // });
    offsetRow.value = scope.row || {};
    showFlg.value = true;
    // groupTabList.value.tableList = data.fileList || [];
}
const getTableList = (params: User.ReqUserParams) => {
    const newParams = JSON.parse(JSON.stringify(params));
    newParams.username && (newParams.username = 'custom-' + newParams.username);
    // return getUserList(newParams);
    return initPageData(newParams);
};

function addClickHandlerFn(type: number) {
    switch (type) {
        case 1:
            settingSysInfoVisible.value = true;
            operationType.value = 'upload';
            break;
        default:
            break;
    }
}

const getDbTableList = (params: User.ReqUserParams, data?: any) => {
    // if (!data instanceof Array) return [];
    const newParams = JSON.parse(JSON.stringify(params));
    newParams.username && (newParams.username = 'custom-' + newParams.username);

    return initPageData(newParams, 1); // data || []; // getUserList(newParams);
};

async function editScenic(row: any, type: number) {
    console.log(33, row, type);
    switch (type) {
        case 1: // 下载
            window.open(`${import.meta.env.VITE_APP_LOGOUT_URL}/asset/daDataFileSys/download/${row.fileId}`);
            break;
        case 2: // 标题的跳转
            break;
        default:
            break;
    }
}

// 表格配置项
const columns: ColumnProps[] = [
    { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '序号', width: 80 },
    // { type: 'expand', label: 'Expand', width: 100 },
    // 多级 prop
    { prop: 'sysName', label: '名称', search: { el: 'input' } },
    // { prop: 'sysName', label: '系统名称', render: reRender, search: { el: 'input' } },
    { prop: 'sysShort', label: '简称' },
    { prop: 'username', label: '账号' },
    { prop: 'operation', label: '操作', fixed: 'right', width: 160 },
];

const columnsDb: ColumnProps[] = [
    // { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '序号', width: 80 },
    // { type: 'expand', label: 'Expand', width: 100 },
    // 多级 prop
    { prop: 'fileName', label: '文件名称' },
    { prop: 'description', label: '描述' },
    { prop: 'filePath', label: '存储路径' },
    { prop: 'updateTm', label: '更新时间' },
    { prop: 'operation', label: '操作', fixed: 'right', width: 100 },
];

// 删除用户信息
const deleteAccount = (params: sysForm) => {
    // await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
    // proTableRef.value.getTableList();
    ElMessageBox.confirm('确认删除数据?', '温馨提示', { type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消' }).then(async () => {
        const { code } = await api.assetsCatalogue.infoAssets.infoAssetsDel([params.sysId]);
        if (code === 200) {
            ElMessage({
                message: `删除成功`,
                type: 'success',
            });
        }
        proTableRef.value.getTableList();
    });
};

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
    console.log(123, id);
};

// 导出用户列表
const downloadFile = async (scope: any) => {
    const selectedListIds = scope.selectedListIds || [];
    const selectedList = scope.selectedList || [];
    const offsetScope = selectedList[0] || {};

    initParam.offsetScope = offsetScope;
    if (offsetScope.ifOpenAcct === 1) return ElMessage.warning('此数据，已完善');
    if (selectedListIds.length > 1) {
        return ElMessage.warning('此操作，仅勾选1条数据');
    }
    operationType.value = 'create';
    offsetRow.value = scope;
    offsetRow.value.sysId = selectedListIds[0];
    settingSysInfoVisible.value = true;

    // infoAssetsQuery
};

// 批量添加用户
const dialogRef = ref();
const batchAdd = async (scope: any) => {
    const { selectedList = [] } = scope || {};
    const sysId = selectedList.map((item: sysForm) => item.sysId);
    // console.log(333, sysId);
    try {
        const { code } = await api.assetsCatalogue.infoAssets.infoAssetsApply(sysId);
        if (code === 200) {
            ElMessage.success('申请成功');
            proTableRef.value.getTableList();
            // scope.selectedList = [];
            // scope.selectedListIds = [];
        }
    } catch (e) {
        console.log('err: initPageData', e);
        return {};
    }
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData?: sysForm) => {
    switch (title) {
        case 'edit':
            api.assetsCatalogue.infoAssets.infoAssetsQuery(rowData?.sysId).then((res: any) => {
                offsetRow.value = res.data || {};
            });
            break;
        default:
            operationType.value = 'create';
            if (rowData) initParam.offsetRow = rowData;
            break;
    }

    operationType.value = title;
    dialogFormVisible.value = true;
};

function upsearch() {
    proTableRef.value.getTableList();
}

async function initPageData(params: User.ReqUserParams, type?: number) {
    try {
        let res;
        switch (type) {
            case 1:
                res = await api.assetsCatalogue.infoAssets.infoAssetsFileSysPage(params);
                break;
            default:
                res = await api.assetsCatalogue.infoAssets.infoAssetsPage(params);
                break;
        }
        return res;
    } catch (e) {
        console.log('err: initPageData', e);
        return {};
    }
}

function handleUpload(file: any, fileList: []) {
    reactiveObj.fileList = fileList;
}

function beforeAvatarUpload(file: any) {
    const fileType = file.name || '';
    const isJPG = /^.*\.(xls|xlsx|csv)$/i.test(fileType);

    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        ElMessage({
            type: 'warning',
            message: '上传文件大小，不能超过 5MB!',
        });
    }
    return isJPG && isLt2M;
}

watch(
    () => initParam.showFlg,
    (val) => {
        if (!val) {
            proTableOther.value.tableData = [];
        } else {
            proTableOther.value && proTableOther.value.getTableList();
        }
    }
);

async function getDict(name: string) {
    try {
        const res = {}; // await api.setting.dict.getDictCode(name);
        return res;
    } catch (e) {
        console.log('err: getDict', e);
        return { code: 0, data: {} };
    }
}

onBeforeMount(() => {
    console.log('ok');
});
</script>

<style lang="scss" scoped>
.info-assets {
    height: 100%;
    // height: 50%;
}
.full-box {
    width: 100%;
}
.info-assets-list {
    margin-top: 10px;
    height: calc(50% - 10px);
}
</style>
