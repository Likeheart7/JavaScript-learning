import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';
import counterStore from './store/counter/index';
const store = createStore({
  // 引入其他模块
  modules: {
    counter: counterStore,
  },
  // state里面存放数据
  state() {
    return {
      isAuth: false,
    };
  },
  //   mutations存放操作数据的方法，有一个默认参数,通过commit调用
  // 使用mutations可以统一管理对全局数据的操作，降低代码耦合度
  // mutation内部必须是同步函数，异步会导致内部状态难以追踪，devtool难以追踪state的状态
  mutations: {
    changeAuth(state, payload) {
      state.isAuth = payload;
    },
  },
  // 可以通过getters，在获取state数据时做一些额外处理
  // 通过this.$store.getters.readCounter获取
  getters: {
    isLogin(state) {
      return state.isAuth;
    },
  },
  // 处理异步逻辑的地方，通过this.$store.dispatch调用
  // 默认参数context可以调用commit、getters、state和dispatch
  actions: {
    login(context, payload) {
      context.commit('changeAuth', payload);
    },
    logout(context, payload) {
      context.commit('changeAuth', payload);
    },
  },
});
const app = createApp(App);
app.use(store);
app.mount('#app');
