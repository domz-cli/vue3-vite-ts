import store from '@/store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userStore = defineStore('userStore', () => {
    const token = ref<string>(getToken() || '');
    const username = ref<string>('');

    function logout() {
        removeToken();
        token.value = '';
    }

    function removeToken() {
        localStorage.removeItem('TOKEN');
    }

    function getToken(): string | null {
        return localStorage.getItem('TOKEN');
    }
    return { username, logout };
});

export function userStoreHook() {
    return userStore(store);
}
