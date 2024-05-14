<template>
    <base-dialog title="Invalid Input" @close="confirmError" v-if="inputsIsInvalid">
        <template #default>
            至少有一个输入是不符合规范的，请认真检查您的输入
        </template>
        <template #actions>
            <base-button @click="confirmError">Close</base-button>
        </template>
    </base-dialog>
    <base-card>
        <form @submit.prevent="submitData(resource)">
            <div class="form-controll">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="输入标题" v-model="resource.title">
            </div>
            <div class="form-controll">
                <label for="desc">Desc</label>
                <textarea id="desc" type="text" placeholder="输入描述" v-model="resource.desc"></textarea>
            </div>
            <div class="form-controll">
                <label for="link">Link</label>
                <input type="url" placeholder="输入链接" id="link" v-model="resource.link">
            </div>
            <div class="form-controll">
                <!-- 即使base-button没有type属性，这个type也会被内部的button标签获取 -->
                <base-button mode="selected" type="submit">Add
                    Resource</base-button>
            </div>
        </form>
    </base-card>
</template>
<script>
export default {
    data() {
        return {
            resource: {
                title: '',
                desc: '',
                link: '',
            },
            inputsIsInvalid: false
        }
    },
    inject: ['addResource'],
    methods: {
        submitData(resource) {
            if (resource.title.trim() && resource.desc.trim() && resource.link.trim()) {
                resource.id = new Date().toISOString().slice(-7)
                this.addResource(resource)
                // this.resource={}
            } else {
                this.inputsIsInvalid = true
            }
        },
        confirmError() {
            this.inputsIsInvalid = false
        }
    }
}
</script>

<style scoped>
label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    padding: 0.3rem 0.5rem;
    border: 0.15rem solid #ccc;
    border-radius: 5px;
    resize: none;
    height: 2.5rem;
    line-height: 1.6rem;
}
</style>