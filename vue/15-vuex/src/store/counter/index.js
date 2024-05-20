import mutations from './mutations';
import getters from './getters';
import actions from './actions';
// store结构优化
const counterModule = {
  // 开启命名空间，防止多模块名称冲突，
  // 访问需要修改为this.$store.getters['namespaces/xxx']等，所有访问都需要加上命名空间
  // this.$store.commit('counter/addOne')
  namespaced: true,
  state() {
    return {
      counter: 0,
    };
  },
  mutations: mutations,
  getters: getters,
  actions: actions,
};

export default counterModule;
