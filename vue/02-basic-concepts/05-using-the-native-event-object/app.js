const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name: '',
    };
  },
  //   用于插值语法中展示需要计算的属性，防止每次视图更新都调用方法
  //   computed: {
  //     fullname() {
  //       return this.name === '' ? '' : this.name + ' chen';
  //     },
  //   },
  // 也可以使用watch来监听属性变动，但是这种情况computed更合适
  watch: {
    name(newValue) {
      this.fullname = newValue === '' ? '' : newValue + ' chen';
    },
  },
  methods: {
    add(step) {
      this.counter += step;
    },
    subtract(step) {
      this.counter -= step;
    },
    resetInput() {
      this.name = '';
    },
  },
});

app.mount('#events');
