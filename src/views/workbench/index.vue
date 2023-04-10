<template>
    <el-container>
        <section class="work-space">
            <article class="space-top">
                <!-- <p class="space-name flex-align-center">
          <el-icon :size="20"><el-icon-grid /></el-icon>
        <h1>工作专区</h1>
        </p> -->
            </article>
            <article class="content-box flex">
                <div @click="goPage(item)" class="content-item" v-for="(item, index) in spaceList" :key="index">
                    <div class="img-warp">
                        <img v-if="item.bgImg" class="img-item" :src="`${getAssetsFile(`img/${item.bgImg}`)}`" alt="" />
                        <!-- <img v-if="item.bgImg" class="img-item" :src="item.bgImg" alt="" /> -->
                    </div>
                    <div class="content-title">
                        <h3 class="title">{{ item.workName }}</h3>
                        <p class="desc">{{ item.workDesc || '' }}</p>
                    </div>
                </div>
            </article>
        </section>
    </el-container>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
// import groupApi from '@/api/modules/bmp-modules/bmp-basic/group';
import tool from '@/utils/tool';
import { getAssetsFile } from '@/utils/loadStatic';
import api from '@/api';

import itemPhoto from '@/assets/img/stock-photo-1654599283.jpg';

const reactiveObj = reactive({
    spaceList: [
        { workName: '主题1', workDesc: '描述内容描述内容描述内容描述内容', bgImg: itemPhoto, pageUrl: '/index' },
        { workName: '主题1', workDesc: '描述内容描述内容', bgImg: itemPhoto, pageUrl: '/index' },
        { workName: '主题1', workDesc: '描述内容描述内容描述内容', bgImg: itemPhoto, pageUrl: '/index' },
        { workName: '主题1', workDesc: '描述内容、描述内容', bgImg: itemPhoto, pageUrl: '/index' },
        { workName: '主题1', workDesc: '多维度描述内容、描述内容', bgImg: itemPhoto, pageUrl: '/index' },
        { workName: '主题1', workDesc: '描述内容、描述内容', bgImg: itemPhoto, pageUrl: '/index' },
        { workName: '主题1', workDesc: '描述内容描述内容描述内容描述内容描述内容', bgImg: itemPhoto, pageUrl: '/index' },
        { workName: '主题1', workDesc: '描述内容描述内容描述内容', bgImg: itemPhoto, pageUrl: '/index' },
    ],
});
const { spaceList } = toRefs(reactiveObj);

const router = useRouter();

function goPage(item = {}) {
    const { pageUrl = '', webRoute = '' } = item;
    if (!pageUrl && !webRoute) return;
    router.push({ path: pageUrl || webRoute });
}

onBeforeMount(() => {
    const userInfo = tool.data.get('USER_INFO');
    // api.mine.workbench
    //     .getWorkSpace(userInfo.id)
    //     .then(({ data = [] }) => {
    //         data.forEach((list) => {
    //             list.bgImg = list.imgUrl;
    //         });
    //         spaceList.value = data;
    //     })
    //     .catch((err) => console.log(err));
});
</script>

<style lang="scss" scoped>
.work-space {
    width: 100%;
    height: 100%;
}
.content-title {
    padding: 10px;
    max-height: 65px;
    .title {
        color: #303133;
        font-size: 13px;
    }
    .desc {
        margin-top: 8px;
        font-size: 10px;
        color: #c6c1c1;
    }
}
.content-box {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    padding: 10px 40px 30px;
    margin-top: 0px;
    $sizeWidth: 30px;
    // margin-left: -$sizeWidth;
    background: #fff;
    min-height: calc(100% - 180px);
    .content-item {
        margin-left: $sizeWidth;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        width: 230px;
        width: calc(25% - 30px);
        height: 200px;
        margin-top: 30px;
        transition: all ease 0.3s;
        box-shadow: 0 0 8px 3px rgba(50, 50, 50, 0.1);
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 10px 5px rgba(50, 50, 50, 0.15);
            .img-item {
                transform: scale(1.3);
            }
            .title {
                color: var(--el-color-primary);
            }
        }
    }
}

.img-warp {
    width: 100%;
    height: 120px;
    overflow: hidden;
    background: #999;
    .img-item {
        width: 100%;
        height: auto;
        cursor: pointer;
        transition: all ease 0.5s;
    }
}
.space-top {
    width: 100%;
    height: 180px;
    background: url('@/assets/img/stock-photo-1654599283.jpg') no-repeat center;
    background-size: cover;
    .space-name {
        padding: 80px 0 60px 40px;
        color: var(--el-color-primary);
        font-size: 20px;
        h1 {
            color: var(--el-color-primary);
            font-size: 18px;
            margin-left: 5px;
        }
    }
}
</style>
