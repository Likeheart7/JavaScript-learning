<template>
  <base-container title="Vuex" v-if="isLogin">
    <!-- <h3>{{ $store.state.counter }}</h3> -->
    <h3>{{ counter }}</h3>
    <change-counter></change-counter>
    <favorite-value></favorite-value>
    <button @click="addCounter">add 1</button>
  </base-container>
  <base-container>
    <user-auth></user-auth>
  </base-container>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseContainer from './components/BaseContainer.vue'
import ChangeCounter from './components/ChangeCounter.vue'
import FavoriteValue from './components/FavoriteValue.vue'
import UserAuth from './components/UserAuth.vue'
export default {
  components: {
    BaseContainer,
    ChangeCounter,
    FavoriteValue,
    UserAuth
  },
  computed: {
    counter() {
      return this.$store.state.counter.counter
    },
    ...mapGetters(['isLogin'])
  },
  methods: {
    addCounter() {
      // this.$store.state.counter++;
      this.$store.commit('counter/addOne')
    }
  }
}
</script>

<style scoped></style>