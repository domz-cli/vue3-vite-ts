<template>
    <ErrorPageLayout>
        <Svg403 />
    </ErrorPageLayout>
</template>

<script lang="ts" setup>
import ErrorPageLayout from '@/layout/error-page/components/ErrorPageLayout.vue';
import Svg403 from '@/assets/icons/403.svg?component'; // vite-svg-loader 插件的功能
</script>
