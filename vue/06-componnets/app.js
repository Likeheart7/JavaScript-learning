const app = Vue.createApp({
  data() {
    return {
      showDetail: false,
      friends: [
        {
          id: 'first',
          name: 'juice',
          address: 'aisa',
          email: 'juice@google.com',
        },
        {
          id: 'second',
          name: 'sleep',
          address: 'russia',
          email: 'sleep@google.com',
        },
      ],
    };
  },
  methods: {},
});

app.component(`friend-contact`, {
  template: `
  <li :key="friend.id">
	<h2>{{ friend.name }}</h2>
	<button @click="toggleVisible">
	  {{ showDetail ? 'Hide' : 'Show'}} Details
	</button>
	<ul v-show="showDetail">
	  <li><strong>Phone:</strong> {{ friend.address }}</li>
	  <li><strong>Email:</strong> {{ friend.email }}</li>
	</ul>
  </li>`,
  data() {
    return {
      showDetail: false,
      friend: {
        id: 'first',
        name: 'juice',
        address: 'aisa',
        email: 'juice@google.com',
      },
    };
  },
  methods: {
    toggleVisible() {
      this.showDetail = !this.showDetail;
    },
  },
});

const vm = app.mount('#app');
console.log(vm);
