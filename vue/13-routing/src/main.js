import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NotFound from './components/nav/NotFound.vue';

const app = createApp(App);
app.component(NotFound);
// 3. 添加router信息
app.use(router);
app.mount('#app');
