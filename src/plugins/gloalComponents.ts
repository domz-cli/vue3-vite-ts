import { type App } from 'vue';
import proTable from '@/components/ProTable/index.vue';
import proDialog from '@/components/ProDialog/index.vue';
import proIconSelect from '@/components/ProIconSelect/index.vue';
import proOrg from '@/components/ProOrg/index.vue';

// export function registerGloalComponents(app: App) {
//     app.component('ProTable', proTable);
// }

export default {
    install(app: App) {
        app.component('ProTable', proTable);
        app.component('ProDialog', proDialog);
        app.component('ProIconSelect', proIconSelect);
        app.component('ProOrg', proOrg);
    },
};
