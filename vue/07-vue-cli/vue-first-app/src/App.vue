<template>
  <section>
    <header>
      <h1>Friends</h1>
    </header>
    <ul>
      <!-- 父组件定义监听事件，子组件通过emit触发 -->
      <friend-contact v-for="friend in friends" :key="friend.id" :friend="friend"
        @toggle-favorite="toggleFavorite"></friend-contact>
    </ul>
    <new-friend @add-friend="addFriend"></new-friend>
  </section>
</template>

<script>
import FriendContact from './components/FriendContact.vue';
import NewFriend from './components/NewFriend.vue';
export default {
  data() {
    return {
      friends: [
        {
          id: 'manuel',
          name: 'Manuel Lorenz',
          phone: '0123 45678 90',
          email: 'manuel@localhost.com',
          isFavorite: true
        },
        {
          id: 'female',
          name: 'pinkman Lorenz',
          phone: '1112 32123 90',
          email: 'pinkman@localhost.com',
          isFavorite: false
        },
      ]
    }
  },
  methods: {
    toggleFavorite(friendId) {
      const targetFriend = this.friends.find(friend => friend.id == friendId)
      targetFriend.isFavorite = !targetFriend.isFavorite
    },
    addFriend(friend) {
      this.friends.push(friend)
    }
  },
  components: { FriendContact, NewFriend },
}
</script>
<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Jost', sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li,
form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
  padding: 0.4em 1.6em;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: bold;
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>