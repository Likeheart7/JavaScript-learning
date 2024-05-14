<template>
    <h3>Active Goal</h3>
    <!-- teleport，通过属性to指定将元素渲染到哪个标签下面 -->
    <!-- vue3不需要必须只有一个根节点了 -->
    <teleport to='body'>
        <dialog open>
            this is a dialog info
        </dialog>
    </teleport>
</template>

<script>
</script>

<style scoped></style>