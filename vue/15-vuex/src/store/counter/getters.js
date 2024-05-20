export default {
  readCounter(state) {
    return state.counter * 2;
  },
  // 可以通过第二个默认参数getters调用其他的getters
  normalizeCounter(_, getters) {
    console.log(getters);
    const counter = getters.readCounter;
    if (counter < 10) {
      return 10;
    } else if (counter > 50) {
      return 50;
    }
    return counter;
  },
};
