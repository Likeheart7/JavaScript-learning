const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      statusMsg: `You load this page on ${new Date().toLocaleString()}`,
      confirmedName: '',
      tempName: '',
    };
  },
  methods: {
    increment(step) {
      this.counter += step;
    },
    decrement(step) {
      this.counter -= step;
    },
    setName(e) {
      //   console.log(e);
      this.tempName = e.target.value;
    },
    confirmInput() {
      this.confirmedName = this.tempName;
    },
    submitForm() {
      alert('submitted');
    },
  },
});
app.mount('#events');
