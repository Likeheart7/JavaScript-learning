<template>
  <header>
    <nav>
      <ul>
        <li>
          <!-- 5.按钮切换路径渲染对应组件 -->
          <!-- 通过name指定对应的route可以防止点击只是单纯续接路径出现的问题 -->
          <router-link :to="{ name: 'teams' }">Teams</router-link>
          <!-- <button @click="setActivePage('teams-list')">Teams</button> -->
        </li>
        <li>
          <router-link :to="{ name: 'users' }">Users</router-link>
          <!-- <button @click="setActivePage('users-list')">Users</button> -->
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  font: inherit;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}

.active {
  background-color: rgb(76, 187, 187);
  color: black;
  border-radius: 10px;
}
</style>