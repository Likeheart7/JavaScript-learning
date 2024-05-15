<template>
	<section>
		<base-card>
			<h2>Submitted Experiences</h2>
			<div>
				<base-button @click="loadExperience">Load Submitted Experiences</base-button>
			</div>
			<h4 v-if="isLoading">Loading...</h4>
			<h4 v-else-if="!isLoading && error">{{ error }}</h4>
			<h4 v-else-if="!isLoading && results?.length === 0">
				No stored experiences found. Start adding some survey results
				first.
			</h4>
			<ul v-else>
				<survey-result v-for="result in results" :key="result.id" :name="result.name"
					:rating="result.rating"></survey-result>
			</ul>
		</base-card>
	</section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';
import axios from 'axios'

export default {
	components: {
		SurveyResult,
	},
	data() {
		return {
			isLoading: true,
			error: null,
			results: []
		};
	},
	methods: {
		// async loadExperience() {
		// 	this.isLoading = true;
		// 	const res = await fetch('https://vue-request-demo-9d-default-rtdb.firebaseio.com/survey.json')
		// 	const data = await res.json()
		// 	console.log(res)
		// 	if (res.status != 200) {
		// 		this.isLoading = false;
		// 		this.error = `${res.status} ${res.statusText}`;
		// 		return;
		// 	}
		// 	const results = [];
		// 	for (const id in data) {
		// 		results.push({
		// 			id: id,
		// 			name: data[id].name,
		// 			rating: data[id].rating
		// 		})
		// 	}
		// 	this.results = results;
		// 	console.log(this.results)
		// 	this.isLoading = false;
		// }

		async loadExperience() {
			axios.get('https://vue-request-demo-9d-default-rtdb.firebaseio.com/survey.json')
				.then(({ data }) => {
					this.isLoading = false;
					const results = [];
					for (const id in data) {
						results.push({
							id: id,
							name: data[id].name,
							rating: data[id].rating
						})
					}
					this.results = results;
					// console.log(this.results)
				})
				.catch(err => {
					console.log(err)
					this.isLoading = false;
					this.error = `Fail to fetch data - please try later again!`
				})
		}
	},
	mounted() {
		this.loadExperience()
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>