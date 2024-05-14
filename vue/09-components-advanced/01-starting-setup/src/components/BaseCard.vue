<template>
    <div>
        <!-- slot用于在组件标签内嵌套其他组件，确定了其他组件的位置 -->
        <!--
            如果有多个slot插槽，通过name属性区分，name属性的slot默认是default，
            只能有一个default插槽，调用该组件的地方通过v-slot:xxx指定插槽 
        -->
        <!-- 
            该header标签，在插槽没有被传入的元素占用且没有默认内容内容时也会显示
            可以判断$slots属性的对应插槽内容是否存在来决定是否显示
         -->
        <header v-if="$slots.header">
            <slot name="header">
                <!-- 
                    slot可以填入默认值，当调用没有传递该插槽的内容时，
                    会显示插槽内的默认值 -->
                <!-- <h1>this is default content</h1> -->
            </slot>
        </header>

        <slot></slot>
    </div>
</template>

<script setup>
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
}

div {
    margin: 2rem auto;
    max-width: 30rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
}
</style>