<template>
    <!-- <ul> -->

    <!-- 针对迭代集合的动画需要使用transition-group组件标签，tag指明父标签，声明为ul就不需要外部的ul标签了 -->
    <transition-group name="user-list" tag="ul">
        <li v-for="user in users" :key="user" @click="removeUser(user)">{{ user }}</li>
    </transition-group>
    <!-- </ul> -->
    <div>
        <input type="text" ref="inputValue" />
        <button @click="addUser">Add User</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: ['陈星', '洋弟', 'Osica', 'likexin'],

        }
    },
    methods: {
        addUser() {
            const user = this.$refs.inputValue.value;
            this.users.unshift(user)
        },
        removeUser(target) {
            this.users = this.users.filter(user => user !== target)
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    padding: 1rem;
    border: 1px solid #ccc;
    text-align: center;
}

button {
    scale: 0.8;
}

/*
    删除之后其他元素顶上的动画
    需要在leave-active加上position的样式
*/
.user-list-move {
    transition: transform 800ms ease;
}

.user-list-enter-active {
    animation: user-list-in 0.5s ease-in;
}

.user-list-leave-active {
    animation: user-list-out 0.5s ease-out;
    /* 加上这个才能使删除元素的顶上动画生效 */
    position: absolute;
}

@keyframes user-list-in {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes user-list-out {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(100%);
    }
}
</style>