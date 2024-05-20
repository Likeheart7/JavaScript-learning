<template>
    <h3>{{ readCounter }}</h3>
    <button @click="add10({ value: 10 })">Add 10</button>
    <!-- <button @click="increase({ value: 10 })">Add 10</button> -->
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    computed: {
        readCounter() {
            return this.$store.getters['counter/normalizeCounter']
        }
        // 通过computed使用vuex中的getters数据时，可以简写为以下格式
        // ...mapGetters(['normalizeCounter'])
    },
    methods: {
        // add10() {
        // this.$store.commit('add', { value: 10 })
        // this.$store.dispatch('increase', { value: 10 })
        // }
        // dispatch可以简写为
        // ...mapActions(['increase'])
        // 如果需要自定义方法名
        ...mapActions({
            add10: 'counter/increase'
        })
    }
}
</script>

<style scoped></style>