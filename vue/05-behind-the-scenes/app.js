const app = Vue.createApp({
  data() {
    return {
      enteredValue: '',
      message: '',
    };
  },
  methods: {
    setInput(event) {
      this.enteredValue = event.target.value;
    },
    setText() {
      //   this.message = this.enteredValue;
      this.message = this.$refs.userText.value;
    },
  },
  // vue生命周期相关的钩子
  beforeCreate() {
    console.log('beforeCreate()');
  },
  created() {
    console.log('created()');
  },
  beforeMount() {
    console.log('beforeMount()');
  },
  mounted() {
    console.log('mounted()');
  },
  beforeUpdate() {
    console.log('beforeUpdate()');
  },
  updated() {
    console.log('updated()');
  },
  beforeUnmount() {
    console.log('beforeUnmount');
  },
  unmounted() {
    console.log('unmounted()');
  },
});
app.mount('#app');
setTimeout(() => {
  app.unmount();
}, 4000);
// js的代理
const data = {
  message: 'Hello',
  longMessage: 'Hello! World!',
};

const handler = {
  set(target, key, value) {
    console.log(target);
    console.log(key);
    console.log(value);
    //通过代理来修改别的属性
    if (key === 'message') {
      target.longMessage = value + 'World!!';
    }
    target.message = value;
  },
};
const proxy = new Proxy(data, handler);
// proxy.message = 'Hello!!!!';
// console.log(proxy.longMessage);

const app2 = Vue.createApp({
  // vue会将template的内容添加到挂载的部分，且template的内容是被vue处理的
  template: `
  <p>{{meal}}</p>
  `,
  data() {
    return {
      meal: 'patato',
    };
  },
});
app2.mount('#app2');
