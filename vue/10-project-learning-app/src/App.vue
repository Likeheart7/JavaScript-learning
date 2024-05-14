<template>
    <the-header title="My Learning APP"></the-header>
    <the-resource></the-resource>
</template>

<script>

import TheHeader from './components/layout/TheHeader.vue'
import TheResource from './components/layout/TheResource.vue'
export default {

    components: {
        TheHeader,
        TheResource
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap');

:root {
    --orange: #f0932b;
    --orange-light: #f5d5ae;
    --orange-light-2: #fff2e1;
    --gray: #cacaca;
    --gray-2: #a5a5a5;
    --gray-3: #8a8a8a;
    --color-light: white;
    --color-dark: black;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-family: 'Work Sans', sans-serif;
    /* font-size: 62.5%; */
    overflow-y: overlay;
}
</style>