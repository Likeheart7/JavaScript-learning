<template>
    <teleport to='body'>
        <dialog open @click="$emit('close')">
            <header>
                <slot name="header">
                    <h2>{{ title }}</h2>
                </slot>
            </header>
            <section>
                <slot></slot>
            </section>
            <menu>
                <slot name="actions">
                    <base-button @click="$emit('close')"></base-button>
                </slot>
            </menu>
        </dialog>
    </teleport>
</template>

<script>
export default {
    props: ['title'],
    emits: ['close']
}
</script>

<style scoped>
div {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(5px);
    z-index: 99;
}

dialog {
    position: fixed;
    top: 20vh;
    left: 50%;
    width: 80%;
    z-index: 100;
    transform: translateX(-50%);
    border: none;
    border: 0.1rem solid var(--color-dark);
    /* box-shadow: 1rem 1rem 0 rgba(0, 0, 0); */
    overflow: hidden;
    z-index: 99;
    max-width: 55rem;
}

header {
    background-color: var(--orange-light);
    color: var(--color-dark);
    width: 100%;
    padding: 2rem;
}

header h2 {
    font-size: 2rem;
}

section {
    padding: 2rem;
    font-size: 1.25rem;
}

menu {
    padding: 2rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
}
</style>