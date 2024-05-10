const app = Vue.createApp({
  data() {
    return {
      carBrand: 'Benz',
      carModel: '',
    };
  },
  methods: {
    alertInfo() {
      alert('this is an information for you');
    },
    outputCarBrand(event) {
      this.carBrand = event.target.value;
      console.log(this.carBrand);
    },
    updateModel(event) {
      this.carModel = event.target.value;
    },
  },
});
app.mount('#assignment');
