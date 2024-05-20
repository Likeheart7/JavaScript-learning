export default {
  increase(context, payload) {
    setTimeout(() => {
      context.commit('add', payload);
    }, 2000);
  },
};
