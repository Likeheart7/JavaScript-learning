export default {
  addOne(state) {
    state.counter++;
  },
  // 从第二个参数开始接收自定义参数
  add(state, payload) {
    state.counter += payload.value;
  },
};
