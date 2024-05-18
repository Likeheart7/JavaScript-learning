<template>
  <div class="container">
    <router-view v-slot='slotProps'>
      <!-- 路由动画需要将transition放在标签内部 -->
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <router-link :to="nextRoute">change router</router-link>
  </div>
  <div class="container">
    <user-list></user-list>
  </div>
  <div class="container">
    <div class="block" :class="{ animate: blockAnimated }"></div>
    <button @click="blockAnimate">Animate</button>
  </div>
  <base-model @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog</p>
    <button @click="hideDialog">Close it</button>
  </base-model>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>

  <div class="container">
    <!-- vue提供的用于处理动画的标签，只支持一个直接子节点的元素（有些自定义组件可能不止一个直接子节点） -->
    <!-- 如果transition包裹的元素因为v-if v-else所以同时只会有一个dom存在，那么也可以包裹不止一个子节点 -->
    <!-- transition组件提供了一系列的事件，允许用户在动画过程中执行一些操作，不止以下六种，可以通过事件对应的方法来通过js实现动画 -->
    <transition name="para" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
      @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
      <p v-if="showParagraph">But Times change, so must I</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
  <!-- 按钮切换 -->
  <div class="container">
    <transition name="btn" mode="out-in">
      <button v-if='btnShow' @click="toggleBtn">Show View</button>
      <button v-else @click="toggleBtn">Hide View</button>
    </transition>
  </div>
  <transition name="div">
    <div class="div-change" v-if="showDiv"></div>
  </transition>
  <button @click="showDiv = !showDiv">Show DIV</button>
</template>

<script>
import UserList from './components/UserList.vue';

export default {
  data() {
    return {
      dialogIsVisible: false,
      blockAnimated: false,
      showParagraph: false,
      btnShow: true,
      showDiv: false
    }
  },
  computed: {
    nextRoute() {
      if (this.$route.name === 'user-info') {
        return { name: 'course-goal' }
      } else {
        return { name: 'user-info' }
      }
    }
  },
  methods: {
    // 所有transition组件标签的事件都可以接收两个个参数，参数是产生该事件的dom元素和事件完成的回调方法
    beforeEnter(el) {
      console.log(el)
      console.log('before enter')
    },
    enter() {
      console.log('enter')
    },
    // 动画加载完成之后调用，根据动画的定义可能有一个延迟
    afterEnter() {
      console.log('after enter')
    },
    beforeLeave() {
      console.log('before leave')
    },
    leave() {
      console.log('leave')
    },
    // 动画卸载完成之后调用，根据动画的定义可能有一个延迟
    afterLeave() {
      console.log('after leave')
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    blockAnimate() {
      this.blockAnimated = true
    },
    toggleParagraph() {
      this.showParagraph = !this.showParagraph
    },
    toggleBtn() {
      this.btnShow = !this.btnShow
    }
  },
  components: {
    UserList,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}

a {
  text-decoration: none;
  border: 1px solid #e486fc;
  padding: 0.3rem;
  background-color: pink;
  border-radius: 10%;
}

.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* 变化的样式 事件 行为 */
  /* transition: transform 0.3s ease-out; */
}

.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}

.animate {
  /* 移动效果 */
  /* transform: translateX(-150%); */
  /* keyframes名称、过渡时间、过度行为、forwards表示保留最终结果，否则会回到初始样式 */
  animation: block-fade 0.4s ease-out forwards
}

/* vue提供的transition标签使用的样式，默认使用下面六个名称，自定义名称在transition标签的属性配置   */
/* .v-enter-from {
  opacity: 0;
  transform: translateX(-100%);
  color: yellow;
}

.v-enter-active {
  transition: all 2s ease-in;
}

.v-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.v-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.v-leave-active {
  transition: all 2s ease-out;
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-50%);
  color: red
} */
/* 自定义名称及另一种写法，需要在标签通过name属性指定 */
.para-enter-active {
  animation: para 0.5s ease-in;
}

.para-leave-active {
  /* reverse表示将from to反转 */
  animation: para 0.5s ease-out reverse;
}

@keyframes para {
  from {
    opacity: 0;
    transform: translateY(-150%);
    color: #dd8ff0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-enter-active {
  animation: btn-fade 0.5s ease-in;
}

.btn-leave-active {
  animation: btn-fade 0.5s ease-in reverse;
}

@keyframes btn-fade {
  from {
    opacity: 0;
    background-color: green;
    scale: 0.3;
  }

  to {
    opacity: 1;
    scale: 1;
  }
}


.div-change {
  width: 50%;
  height: 10rem;
  /* background-image: linear-gradient(to top left, #6acf30 0%, #bf2e34 100%); */
  background-color: black;
  margin: 0 25%;
}

.div-enter-active {
  animation: div-change 2s ease-in;
}

.div-leave-active {
  animation: div-change 2s ease-in reverse
}

@keyframes div-change {
  from {
    /* background-image 不支持 CSS3 transition 过渡 */
    /* background-image: linear-gradient(to top left, #9730cf 0%, #e6d052 100%); */
    background-color: green;
    opacity: 0;
    scale: 0.1;
  }

  to {
    /* background-image: linear-gradient(to top left, #6acf30 0%, #bf2e34 100%); */
    background-color: red;
    opacity: 1;
  }
}

/* keyframes */
@keyframes block-fade {
  0% {
    /* scale表示大小比例 */
    transform: translateX(0) scale(1)
  }

  50% {
    transform: translateX(-120%) scale(3);
  }

  100% {
    transform: translateX(-150%) scale(1);
  }
}

.route-enter-active {
  animation: route-in 1s ease-in;
}

.route-leave-active {
  animation: route-in 1s ease-out reverse;
}

@keyframes route-in {
  from {
    opacity: 0;
    padding: 1rem;
    background-color: #290033
  }

  to {
    opacity: 1;
    background-color: #fff
  }
}
</style>