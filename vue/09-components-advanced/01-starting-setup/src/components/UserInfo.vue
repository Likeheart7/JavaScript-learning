<template>
	<base-card>
		<!-- <header>{{ fullName }}</header> -->
		<!-- <template v-slot:header> -->
		<!-- 可以简写为# -->
		<template #header>
			<h3>{{ fullName }}</h3>
		</template>
		<template v-slot:default>
			<base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
			<p>{{ infoText }}</p>
		</template>
	</base-card>
</template>

<script>
export default {
	props: ['fullName', 'infoText', 'role'],
};
</script>
