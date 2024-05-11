const app = Vue.createApp({
  data() {
    return {
      goals: ['sleep'],
      inputGoal: '',
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.inputGoal);
      this.inputGoal = '';
    },
    // removeGoal(event) {
    //   const idx = this.goals.findIndex((e) => {
    //     e === event.target.innerText;
    //   });
    removeGoal(idx) {
      this.goals.splice(idx, 1);
    },
  },
});
app.mount('#user-goals');

const user = {
  name: 'chen',
  age: 29,
};
