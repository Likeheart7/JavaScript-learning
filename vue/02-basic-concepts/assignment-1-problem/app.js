const app = Vue.createApp({
  data() {
    return {
      myself: {
        name: 'chensheng',
        age: 27,
      },
      imgUrl: 'https://t7.baidu.com/it/u=334080491,3307726294&fm=193&f=GIF',
    };
  },
  methods: {
    favNumber() {
      return Math.random().toFixed(2);
    },
    calculateAge() {
      return this.myself.age + 5;
    },
  },
});
app.mount('#assignment');
