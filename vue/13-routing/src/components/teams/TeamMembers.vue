<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item v-for="member in members" :key="member.id" :name="member.fullName" :role="member.role"></user-item>
    </ul>
    <!-- 处于当前组件时，路由切换界面默认并没有改变，需要通过watch来监视路径，更新数据 -->
    <router-link to="/teams/t2">go to team2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  data() {
    return {
      teamName: 'Test',
      members: [],
    };
  },
  props: ['teamId'], // 来自路由配置中的props:true  
  inject: ['teams', 'users'],
  created() {
    this.loadMembers(this.teamId)
  },
  methods: {
    loadMembers(teamId) {
      const selectedTeam = this.teams.find(team => team.id === teamId);
      const selectedUsers = []
      for (const userId of selectedTeam.members) {
        const selectedUser = this.users.find(user =>
          user.id === userId
        );
        if (!selectedUser) continue;
        selectedUsers.push(selectedUser);
      }
      this.members = selectedUsers;
    }
  },
  watch: {
    // 监听以下两个都可以
    // $route() {
    //   this.loadMembers(this.$route.params.teamId)
    // }
    teamId() {
      this.loadMembers(this.teamId)
      // 查询参数
      console.log(this.$route.query.sort)
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>