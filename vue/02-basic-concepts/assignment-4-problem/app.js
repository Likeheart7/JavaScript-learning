const app = Vue.createApp({
  data() {
    return {
      inputClass: '',
      visible: true,
      backColor: '#fff',
    };
  },
  computed: {
    paragraphClass() {
      return {
        user1: this.inputClass === 'user1',
        user2: this.inputClass === 'user2',
        visible: this.visible,
        hidden: !this.visible,
      };
    },
  },
  methods: {
    addClass(event) {
      //   document.querySelector('p').classList.add(event.target.value);
      this.inputClass = event.target.value;
      console.log(this.inputClass);
    },
    changeVisible() {
      console.log(this.visible);
      this.visible = !this.visible;
    },
    // changeColor(event) {
    //   this.backColor = '#' + event.target.value;
    // },
  },
});
app.mount('#assignment');
