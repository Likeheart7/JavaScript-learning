<template>
    <form>
        <div>
            <label>ID</label>
            <input type="text" v-model="friend.id"><br />
        </div>
        <div>
            <label>Name</label>
            <input type="text" v-model="friend.name"><br />
        </div>
        <div>
            <label>Phone</label>
            <input type="text" v-model="friend.phone"><br />
        </div>
        <div>
            <label>Email</label>
            <input type="text" v-model="friend.email"><br />
        </div>
        <div>
            <label>Favorite</label>
            <input type="text" v-model="friend.isFavorite"><br />
        </div>
        <button @click.prevent="addFriend">Add Friend</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            friend: {}
        }
    },
    methods: {
        addFriend() {
            // console.log(this.friend)
            this.$emit('add-friend', this.friend)
        }
    },
    emits: ['add-friend']
}
</script>

<style scoped>
input {
    font: inherit;
    padding: 0.15rem;
}

label {
    font-weight: bold;
    margin-right: 1rem;
    width: 7rem;
    /* 对齐 */
    display: inline-block;
}

div {
    margin: 1rem 0;
}
</style>