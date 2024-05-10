const app = Vue.createApp({
  data() {
    return {
      number: 0,
      result: '',
    };
  },
  //   computed: {
  //     result() {
  //       return this.number < 37 ? 'Not there yet' : 'Too much';
  //     },
  //   },
  watch: {
    number(newValue) {
      if (newValue < 37) {
        this.result = 'Not there yet';
      } else if (newValue === 37) {
        this.result = newValue;
      } else {
        this.result = 'Too much';
        setTimeout(() => {
          this.number = 0;
        }, 3000);
      }
    },
  },
  methods: {
    add(num) {
      this.number += num;
    },
  },
});
app.mount('#assignment');
