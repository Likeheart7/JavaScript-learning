import { createApp } from 'vue';
import App from './App.vue';
import globalMixin from './mixins/loger';
const app = createApp(App);
// 全局混入，所有组件共享
app.mixin(globalMixin);
app.mount('#app');
