<!-- 用作样式包装器的组件 -->
<template>
    <div>
        <slot></slot>
    </div>
</template>


<style scoped>
div {
    margin: 2rem auto;
    max-width: 30rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1.5rem;
    border-radius: 15px;
    /* text-align: center; */
}
</style>