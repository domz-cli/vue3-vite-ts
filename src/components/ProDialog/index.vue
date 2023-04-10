<template>
    <div class="pro-dialog" ref="scDialog">
        <el-dialog
            :custom-class="customClass"
            :close-on-click-modal="closeOnClickModal"
            :width="dialogWidth"
            ref="dialog"
            v-model="dialogVisible"
            :fullscreen="isFullscreen"
            v-bind="$attrs"
            :show-close="false"
        >
            <template v-if="$slots.header">
                <slot name="header"></slot>
            </template>
            <template v-if="!$slots.header" #header>
                <slot name="title">
                    <span class="el-dialog__title">{{ title }}</span>
                </slot>
                <div class="pro-dialog__headerbtn">
                    <button v-if="showFullscreen" aria-label="fullscreen" type="button" @click="setFullscreen">
                        <el-icon v-if="isFullscreen" class="el-dialog__close"><el-icon-bottom-left /></el-icon>
                        <el-icon v-else class="el-dialog__close"><el-icon-full-screen /></el-icon>
                    </button>
                    <button v-if="showClose" aria-label="close" type="button" @click="closeDialog">
                        <el-icon class="el-dialog__close"><el-icon-close /></el-icon>
                    </button>
                </div>
            </template>

            <div v-loading="loading" class="body-warp">
                <slot></slot>
            </div>
            <template #footer>
                <slot name="footer"></slot>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, nextTick, ref, onMounted } from 'vue';

const props = defineProps({
    dialogWidth: { type: [String, Number], default: '900px' },
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
    showClose: { type: Boolean, default: true },
    showFullscreen: { type: Boolean, default: true },
    drag: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    height: { type: [String, Number], default: '100%' },
    closeOnClickModal: { type: Boolean, default: false },
    customClass: { type: String, default: '' },
});

const reactiveObj = reactive({
    dialogVisible: false,
    isFullscreen: false,
});
const { dialogVisible, isFullscreen } = toRefs(reactiveObj);

const emit = defineEmits(['full-screen-change']);

const scDialog = ref();

watch(
    () => props.modelValue,
    (val) => {
        reactiveObj.dialogVisible = val;
        nextTick(() => {
            const el = scDialog.value;
            const elDialog = el.querySelector('.el-dialog');
            if (reactiveObj.dialogVisible) {
                if (el && elDialog) {
                    elDialog.style.top = '0px';
                    elDialog.style.left = '0px';
                }
                reactiveObj.isFullscreen = false;
            }
        });
    }
);

// 关闭
function closeDialog() {
    reactiveObj.dialogVisible = false;
}
// 最大化
function setFullscreen() {
    reactiveObj.isFullscreen = !reactiveObj.isFullscreen;
    emit('full-screen-change', reactiveObj.isFullscreen);
}

// 绑定拖拽
function dialogdrag() {
    const dialogHeaderEl = scDialog.value.querySelector('.el-dialog__header');
    const dragDom = scDialog.value.querySelector('.el-dialog');
    //dialogHeaderEl.style.cursor = 'move'
    if (!dialogHeaderEl) return;

    dialogHeaderEl.onmousedown = (e: any) => {
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;
        const screenWidth = document.body.clientWidth;
        const screenHeight = document.documentElement.clientHeight;
        const dragDomWidth = dragDom.offsetWidth;
        const dragDomheight = dragDom.offsetHeight;
        const minDragDomLeft = -dragDom.offsetLeft;
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
        const minDragDomTop = -dragDom.offsetTop;
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

        if (screenHeight < dragDomheight) {
            return false;
        }
        dragDom.style.marginBottom = '0px';

        let styL: string | number = getComputedStyle(dragDom).left;
        let styT: string | number = getComputedStyle(dragDom).top;
        if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace('%', '') / 100);
            styT = +document.body.clientHeight * (+styT.replace('%', '') / 100);
        } else {
            styL = +styL.replace('px', '');
            styT = +styT.replace('px', '');
        }
        document.onmousemove = function (e) {
            let left: any = e.clientX - disX;
            let top: any = e.clientY - disY;
            if (left < minDragDomLeft) {
                left = minDragDomLeft;
            } else if (left > maxDragDomLeft) {
                left = maxDragDomLeft;
            }
            if (top < minDragDomTop) {
                top = minDragDomTop;
            } else if (top > maxDragDomTop) {
                top = maxDragDomTop;
            }
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

onMounted(() => {
    reactiveObj.dialogVisible = props.modelValue;
    props.drag && dialogdrag();
});
</script>

<style lang="scss">
.pro-dialog {
    .el-dialog__header {
        min-height: 54px;
    }
    .el-dialog {
        height: 92%;
        overflow: auto;
        margin-top: 0;
        top: 4% !important;
    }
    .is-fullscreen {
        height: 100%;
    }
    .el-dialog__body {
        height: calc(100% - 55px - 55px);
        overflow: auto;
    }
    .el-dialog__footer {
        min-height: 55px;
        background: #f6f8f9;
        padding-bottom: 0;
    }
    .el-overlay-dialog {
        display: flex;
        align-items: center;
    }
}
</style>

<style scoped lang="scss">
.body-warp {
    flex-basis: 100%;
    height: 100%;
}
.pro-dialog__headerbtn {
    position: absolute;
    top: var(--el-dialog-padding-primary);
    right: var(--el-dialog-padding-primary);
}
.pro-dialog__headerbtn button {
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: var(--el-message-close-size, 16px);
    margin-left: 15px;
    color: var(--el-color-info);
}
.pro-dialog__headerbtn button:hover .el-dialog__close {
    color: var(--el-color-primary);
}
.pro-dialog:deep(.el-dialog).is-fullscreen {
    display: flex;
    flex-direction: column;
    top: 0px !important;
    left: 0px !important;
}
.pro-dialog:deep(.el-dialog).is-fullscreen .el-dialog__header {
}
.pro-dialog:deep(.el-dialog).is-fullscreen .el-dialog__body {
    flex: 1;
    overflow: auto;
}
.pro-dialog:deep(.el-dialog).is-fullscreen .el-dialog__footer {
    padding-bottom: 10px;
    border-top: 1px solid var(--el-border-color-base);
}
</style>
