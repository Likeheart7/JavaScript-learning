<template>
    <!-- <slot name="goals"></slot> -->
    <div>
        <ul>
            <li v-for="goal in goals" :key="goal">
                <!-- 
                通过这种方式将插槽组件的数据，传递给使用插槽的组件，
                可以实现更灵活的配置
            -->
                <slot :goal="goal" another-data="......."></slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goals: ['finish the course', 'have a good sleep']
        }
    }
}
</script>

<style scoped>
div {
    margin: 2rem auto;
    max-width: 30rem;
    border-radius: 10px;
    border: 1px solid orangered;
}
</style>