<template>
    <button :class="mode" class="plain">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: ['mode'],

}
</script>

<style scoped>
.plain {
    border: 0;
    background-color: #fff;
    font-size: 1rem;
    color: rgb(13, 109, 225);
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0.5rem;
}

.selected {
    background-color: rgb(186, 72, 186);
    color: #fff;
}

button:hover,
button:active {
    background-color: pink;
    color: #d45516;
}
</style>