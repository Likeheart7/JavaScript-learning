<template>
  <li>
    <h3>{{ name }}</h3>
    <div class="team-members">{{ memberCount }} Members</div>
    <!-- to属性可以接收一个对象，就不需要硬编码路径了 -->
    <router-link :to='routePath'>View Members</router-link>
  </li>
</template>

<script>
export default {
  props: ['id', 'name', 'memberCount'], // 这个teamId来自router配置中的props：true，将路由中的动态参数:teamId传入
  computed: {
    routePath() {
      // return '/teams/' + this.id;
      return {
        name: 'team-members',
        params: {
          teamId: this.id
        },
        // 可以传递参数，即url的?后的请求参数
        query: {
          sort: 'asc'
        }
      }
    }
  }

};
</script>

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

li h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

li .team-members {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #11005c;
}

a:hover,
a:active {
  background-color: #220a8d;}
</style>