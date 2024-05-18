import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import BaseModel from './components/BaseModel.vue';
import UserInfo from './components/pages/UserInfo.vue';
import CourseGoal from './components/pages/CourseGoal.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'course-goal',
      path: '/course-goal',
      component: CourseGoal,
    },
    {
      name: 'user-info',
      path: '/user-info',
      component: UserInfo,
    },
  ],
});
const app = createApp(App);
app.use(router);
app.component('base-model', BaseModel);
app.mount('#app');
