<template>
  <main>
    <add-user></add-user>
    <delete-user alertTitle="Delete User" ref="deleteComp"></delete-user>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddUser from './components/AddUser.vue';
import DeleteUser from './components/DeleteUser.vue';

const deleteComp = ref(null)
onMounted(() => {
  console.log(deleteComp.value.alertIsVisible)
})
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

main {
  width: 40rem;
  margin: 3rem auto;
}

section {
  margin: 2rem auto;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

button {
  font: inherit;
  background-color: #310131;
  border: 1px solid #310131;
  border-radius: 8px;
  color: white;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #770e77;
  border-color: #770e77;
}
</style>