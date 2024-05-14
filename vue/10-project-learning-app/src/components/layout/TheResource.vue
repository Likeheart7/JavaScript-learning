<template>
    <base-card>
        <base-button type="text" :mode="storedBtnSelected" @click="changeResource('stored-resource')">Current
            Learning</base-button>
        <base-button type="text" :mode="addBtnSelected" @click="changeResource('add-resource')">Add
            Learning</base-button>
    </base-card>
    <component :is="selectedTab"></component>
</template>

<script>
import StoredResource from '../learning-resources/StoredResource.vue'
import AddResource from '../learning-resources/AddResource.vue'
export default {
    data() {
        return {
            selectedTab: 'stored-resource',
            // selectedTab: 'add-resource',
            storedResources: [
                {
                    id: 'official-guide',
                    title: '官方指导文档',
                    desc: 'Vue.js的官方文档',
                    link: 'https://vuejs.org'
                },
                {
                    id: 'chatgpt',
                    title: '大语言模型',
                    desc: '当下最领先的大语言模型',
                    link: 'https://chatgpt.openai.com'
                },
            ]
        }
    },
    computed: {
        storedBtnSelected() {
            return this.selectedTab === 'stored-resource' ? 'selected' : null;
        },
        addBtnSelected() {
            return this.selectedTab === 'add-resource' ? 'selected' : null;
        }
    },
    methods: {
        changeResource(target) {
            this.selectedTab = target;
        },
        addResource(newResource) {
            this.storedResources.unshift(newResource)
            this.selectedTab = 'stored-resource'
        },
        removeResource(id) {
            const idx = this.storedResources.findIndex(res => res.id === id)
            this.storedResources.splice(idx, 1)
        }
    },
    components: {
        StoredResource,
        AddResource
    },
    provide() {
        return {
            resources: this.storedResources,
            addResource: this.addResource,
            removeResource: this.removeResource
        }
    }
}
</script>

<style scoped></style>