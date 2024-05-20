// 组合式API方式的mixin代码方式
// 本质就是在组件中执行这个方法拿到他的返回值作为自己的方法/变量
import { ref } from 'vue';
export function alertMixin() {
  const alertIsVisible = ref(false);
  const showAlert = () => {
    alertIsVisible.value = true;
  };
  const hideAlert = () => {
    alertIsVisible.value = false;
  };

  return {
    alertIsVisible,
    showAlert,
    hideAlert,
  };
}
