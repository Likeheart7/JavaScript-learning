<template>
	<user-alert v-if="alertIsVisible" title="Add a User?" @close="hideAlert">
		<p>Do you want to continue with adding a user?</p>
	</user-alert>
	<section>
		<h2>Add a User</h2>
		<button @click="showAlert">Add User</button>
	</section>
</template>

<script setup>
import UserAlert from './UserAlert.vue';
// import { ref } from 'vue';
// 通过mixin简化代码
import { alertMixin } from '@/mixins/alert';
const { alertIsVisible, showAlert, hideAlert } = alertMixin();
// let alertIsVisible = ref(false);
// const showAlert = () => {
// 	alertIsVisible.value = true;
// }
// const hideAlert = () => {
// 	alertIsVisible.value = false
// }
</script>