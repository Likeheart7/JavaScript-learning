<template>
  <button @click="toTeams">toTeams</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    toTeams() {
      // 编程式路由切换
      // 也可以传一个对象，来指定对应的路由信息
      this.$router.push('/teams') // 转到
      // this.$router.back() //回退
      // this.$router.forward()// 前进
      console.log(this.$router)
      console.log(this.$route)
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>