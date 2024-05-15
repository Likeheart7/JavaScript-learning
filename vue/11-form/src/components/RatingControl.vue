<template>
    <ul>
        <li :class="{ active: this.modelValue === 'poor' }">
            <button type="button" @click="activate('poor')">poor</button>
        </li>
        <li :class="{ active: this.modelValue === 'average' }">
            <button type="button" @click="activate('average')">average</button>
        </li>
        <li :class="{ active: this.modelValue === 'great' }">
            <button type="button" @click="activate('great')">great</button>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['modelValue'],
    // 绑定在自定义组件上的v-model对应属性的默认事件
    // 通过这种方式，可以实现自定义组件的响应式更新
    emits: ['update:modelValue'],
    methods: {
        activate(option) {
            this.$emit('update:modelValue', option);
        }
    }
}
</script>

<style scoped>
ul {
    display: flex;
    list-style: none
}

li {
    margin: 0.25rem 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border: 0.1rem solid #ccc;
    border-radius: 5px
}

button {
    border: 0;
    cursor: pointer;
    background-color: #fff
}

.active {
    background-color: rgb(214, 102, 121)
}

.active button {
    background-color: rgb(214, 102, 121)
}
</style>