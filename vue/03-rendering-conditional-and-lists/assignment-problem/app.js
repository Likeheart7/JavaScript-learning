const app = Vue.createApp({
  data() {
    return {
      tasks: [],
      curTask: '',
      showList: false,
    };
  },
  computed: {
    btnText() {
      return this.showList ? 'Hide List' : 'Show List';
    },
  },
  methods: {
    addTask() {
      if (this.curTask) {
        this.tasks.push(this.curTask);
        this.curTask = '';
      }
    },
  },
});
app.mount('#assignment');
