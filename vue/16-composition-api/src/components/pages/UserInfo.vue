<template>
  <div>
    <p>{{ sample }}</p>
    <p>{{ username }}</p>
    <p>{{ user.name + " : " + user.age }}</p>
    <button @click="setAge(15)">setAge</button>
    <br>
    <input type="text" v-model="firstname" ref="firstNameInput" placeholder="input first name">
    <p>{{ fullname }}</p>
    <button @click="showInput">show Input</button>
  </div>
</template>

<script>
import { isRef, isReactive, reactive, ref, computed, watch } from 'vue'

// import { useRoute, useRouter, } from 'vue-router'
export default {
  props: ['sample'],
  // 组合式API写法，替代data、computed、watch、methods
  // props需要传入使用
  // context是默认传入的，包括emit、attrs、expose、slot对象
  setup(props, context) {
    console.log(context)
    const res = props.sample + 10;
    // context.emit()  // 等于 this.$emit
    console.log(res)
    // 通过ref创建的变量是响应式的
    const username = ref('likeheart')
    setTimeout(() => {
      // 修改时修改.value属性
      username.value = "chensheng"
    }, 2000);

    //  针对对象类型，一般使用reactive来代替ref，这样在修改对象属性的时候就无需obj.value.prop
    const userInfo = reactive({
      name: 'chenxing',
      age: 23
    })
    setTimeout(() => {
      userInfo.name = "liuxinru";
      userInfo.age = 24;
    }, 3000);

    // vue提供的用于查看数据是否是响应式的两个方法
    console.log(isReactive(userInfo))
    console.log(isRef(userInfo))
    console.log(isRef(username))



    // methods:{}
    const setAge = (age) => {
      userInfo.age = age;
    }

    // computed()
    const firstname = ref('')
    const fullname = computed(function () {
      return firstname.value + ' chen'
    })

    // watch
    // 第一个参数可以是一个数组，同时监视多个值；可以是箭头函数，用于监听对象指定属性
    // 可以传入第三个参数，配置immediate和deep
    watch(firstname, (newVal, oldVal) => {
      console.log('new: ', newVal, '  ', 'old: ', oldVal)
    })

    // ref vue会将ref和数据内同名的绑定到一起，前提是return出去，访问的第一个value指向dom元素
    const firstNameInput = ref(null)
    const showInput = function () {
      console.log(firstNameInput.value.value)
    }



    // this.$router、$route变成了方法useRouter useRoute的返回值
    // main.js中挂载router需要修改为
    // router.isReady().then(() => vueApp.mount('#app'))
    // 因为都是异步的了

    // const route = useRoute()
    // const router = useRouter()
    // console.log(route)
    // console.log(router)
    // 需要将数据return出去，视图中才能使用
    return {
      username,
      user: userInfo,
      setAge,
      firstname, fullname,
      showInput,
      firstNameInput
    };
  }

}
</script>

<style scoped>
div {
  margin: 0 auto;
  font-weight: bold;
  /* transform: translateY(50%); */
}
</style>