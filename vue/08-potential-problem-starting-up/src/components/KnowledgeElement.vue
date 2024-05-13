<template>
	<li>
		<h3>{{ topicName }}</h3>
		<p>{{ description }}</p>
		<button @click="selectTopic(id)">Learn More</button>
	</li>
</template>

<script>
export default {
	// 接收祖先组件通过provide提供的数据
	// 如果是data，约等于跨层级的props
	// 如果是方法，约等于跨层级的emits
	inject: ['selectTopic'],
	props: ['id', 'topicName', 'description'],
};
</script>