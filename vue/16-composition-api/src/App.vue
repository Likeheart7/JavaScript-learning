<template>
  <base-card>
    <life-cycle></life-cycle>
  </base-card>
  <base-card>
    <user-info sample="1234"></user-info>
  </base-card>
</template>

<script>
import UserInfo from './components/pages/UserInfo.vue'
import LifeCycle from './components/pages/LifeCycle.vue'
import BaseCard from './components/base/BaseCard.vue'

export default {
  // 默认组合式api中，components写法是不变的
  components: {
    UserInfo,
    BaseCard,
    LifeCycle
  },

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
}
</style>
