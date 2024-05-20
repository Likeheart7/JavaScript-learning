<template>
	<user-alert v-if="alertIsVisible" :title="alertTitle" @close="hideAlert">
		<p>Do you want to continue with deleting a user?</p>
	</user-alert>
	<section>
		<h2>Delete a User</h2>
		<button @click="showAlert">Delete User</button>
	</section>
</template>

<script setup>
import { defineProps, defineExpose } from 'vue'
import UserAlert from './UserAlert.vue';
import { alertMixin } from '@/mixins/alert';
const { alertIsVisible, showAlert, hideAlert } = alertMixin();
defineProps(['alertTitle'])

defineExpose({ alertIsVisible })
</script>