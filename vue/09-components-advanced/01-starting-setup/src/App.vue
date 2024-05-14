<template>
	<div>
		<the-header></the-header>
		<badge-list></badge-list>
		<user-info :full-name="activeUser.name" :info-text="activeUser.description" :role="activeUser.role" />
		<!-- 对于只有一个插槽、使用传递数据的情况，
			可以直接将其挪到组件属性来里 -->
		<course-goals #default="slotProps">
			<!-- 
				通过插槽名获取插槽传递过来的数据，
				实现在调用插槽的地方定义插槽的样式等
			-->
			<!-- <template #default="slotProps">
				<h2>{{ slotProps.goal }}</h2>
			</template> -->
			<h2>{{ slotProps.goal }}</h2>
			<!-- 默认被转成驼峰格式 -->
			<h3>{{ slotProps.anotherData }}</h3>
		</course-goals>

		<!-- 关于动态组件 dynamic component -->
		<div class="dynamic">
			<button @click="selectComponent('active-goal')">activeGoal</button>
			<button @click="selectComponent('manage-goal')">manageGoal</button>
			<!-- <active-goal v-if="curComponent === 'active-goal'"></active-goal>
			<manage-goal v-if="curComponent === 'manage-goal'"></manage-goal> -->
			<!-- 
				可以替换为vue提供的component标签，
				is属性填入要显示的组件的名称
			-->
			<!-- 默认dynamic component切换时上一个组件被删除，内容也被清空
				可以使用keep-alive标签防止删除行为
			-->
			<keep-alive>
				<component :is="curComponent"></component>
			</keep-alive>

		</div>
	</div>
</template>

<script>
// 本地导入，在该组件加载时加载
import UserInfo from './components/UserInfo.vue';
import TheHeader from './components/TheHeader.vue';
import BadgeList from './components/BadgeList.vue';
import CourseGoals from './components/CourseGoals.vue';
import ActiveGoal from './components/ActiveGoal.vue'
import ManageGoal from './components/ManageGoal.vue'
export default {
	data() {
		return {
			curComponent: 'active-goal',
			activeUser: {
				name: 'Likeheart Chan',
				description: 'Site owner and admin',
				role: 'admin',
			},
		};
	},
	components: {
		UserInfo,
		TheHeader,
		BadgeList,
		CourseGoals,
		ActiveGoal,
		ManageGoal
	},
	methods: {
		selectComponent(component) {
			this.curComponent = component;
		}
	}
};
</script>

<style scoped>
html {
	font-family: sans-serif;
}

body {
	margin: 0;
}

.dynamic {
	margin: 2rem auto;
	max-width: 30rem;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
}
</style>