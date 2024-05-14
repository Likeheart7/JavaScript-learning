import { createApp } from 'vue';

import App from './App.vue';
import BaseBadge from './components/BaseBadge';
import BaseCard from './components/BaseCard.vue';
const app = createApp(App);

// 全局引入，这种引入方式会在程序初始化时加载所有的引入
app.component('base-badge', BaseBadge);
app.component('base-card', BaseCard);
// app.component('the-header', TheHeader);
// app.component('badge-list', BadgeList);
// app.component('user-info', UserInfo);
app.mount('#app');
