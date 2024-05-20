<template>
    <button @click="login(true)" v-if="!isLogin">login</button>
    <button @click="logout(false)" v-else>logout</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isLogin'])
    },
    methods: {
        ...mapActions(['login', 'logout'])
    }
}
</script>

<style scoped></style>
