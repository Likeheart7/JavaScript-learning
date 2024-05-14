<template>
    <ul>
        <learning-resource v-for="resource in resources" :key="resource.id" :resource="resource">
        </learning-resource>

    </ul>
</template>

<script>
import LearningResource from './LearningResource.vue'
export default {
    inject: ['resources'],
    components: {
        LearningResource
    },
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
</style>