<template>
    <section class="container">
        <slot></slot>
    </section>
</template>

<script>
</script>

<style scoped>
.container {
    /* height: 5rem; */
    background-color: white;
    text-align: center;
    margin: 3rem 35%;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem 0.5rem;
}
</style>