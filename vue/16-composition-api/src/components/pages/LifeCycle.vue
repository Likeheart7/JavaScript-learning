<template>
    <p>{{ param }}</p>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted, onBeforeUpdate, onUpdated, onBeforeUnmount } from 'vue';
import { ref } from 'vue'
export default {
    setup() {
        const param = ref('life cycle')
        setTimeout(() => {
            param.value = "life cycle change"
        }, 3000);
        // beforeMount、Mounted、beforeUpdate、updated等、privide、inject都变成了方法，导入使用
        // created()和beforeCreate()这两个生命周期钩子函数，而是通过setup实现了更灵活的生命周期钩子函数，
        // 直接书写在<script setup>模块中的全局代码，相当于这两个钩子函数中的代码
        onBeforeMount(() => {
            console.log('onBeforeMount');
        });
        onMounted(() => {
            console.log('onMounted');
        });
        onBeforeUpdate(() => {
            console.log('onBeforeUpdate');
        });
        onUpdated(() => {
            console.log('onUpdated');
        });
        onBeforeUnmount(() => {
            console.log('onBeforeUnmount');
        });
        onUnmounted(() => {
            console.log('onUpdated');
        });
        return {
            param
        }
    }
}
</script>

<style scoped></style>