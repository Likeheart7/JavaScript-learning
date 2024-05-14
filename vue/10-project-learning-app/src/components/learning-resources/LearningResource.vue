<template>
    <li>
        <base-card>
            <header>
                <h3>{{ resource.title }}</h3>
                <base-button type="text" @click="removeResource(resource.id)">Delete</base-button>
            </header>
            <p>{{ resource.desc }}</p>
            <nav>
                <a :href="resource.link">View Resource</a>
            </nav>
        </base-card>
    </li>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'
export default {
    components: { BaseButton },
    props: ['resource'],
    inject: ['removeResource']
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

a {
    text-decoration: none;
    font-size: 1.25rem;
    color: #ce1788;
}

a:hover,
a:active {
    color: #c89300;
}


h3 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
}

p {
    margin: 0.5rem 0;
}
</style>