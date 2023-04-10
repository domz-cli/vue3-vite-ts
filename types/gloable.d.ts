import Vue from 'vue';

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $CONFIG: any,
        $store: any,
        $errorHandler: (err: unknown, instance: ComponentPublicInstance | null, info: string) => void;
    }
}