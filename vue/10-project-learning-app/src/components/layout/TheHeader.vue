<template>
    <div>
        <header>{{ title }}</header>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style scoped>
div {
    height: 10rem;
    margin: 0 auto;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to top left, #a12cb9 0%, #bf2e34 100%);
    color: rgb(211, 227, 118);
}

header {
    font-size: 3rem;

}
</style>