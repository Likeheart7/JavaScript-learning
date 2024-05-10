const app = Vue.createApp({
  data() {
    return {
      goals: ['vue', 'async'],
      link: 'https://vuejs.org',
      goalA: 'Learn more about java',
      goalB: 'Study vue every day',
    };
  },
  methods: {
    outputGoal() {
      const number = Math.random();
      //   if (number < 0.5) {
      //     return 'Learn more about java';
      //   } else {
      //     return 'Study vue every day';
      //   }
      return number < 0.5 ? this.goalA : this.goalB;
    },
  },
});
app.mount('#user-goal');
