export default {
  addToCart(context, payload) {
    console.log(context.getters);
    // 使用rootGetters才能访问到所有命名空间的的getter，否则只访问本模块的
    console.log(context.rootGetters);
    const prodId = payload.id;
    const products = context.rootGetters['prods/products'];
    const product = products.find((prod) => prod.id === prodId);
    context.commit('addProductToCart', product);
  },
  removeFromCart(context, payload) {
    context.commit('removeProductFromCart', payload);
  },
};
