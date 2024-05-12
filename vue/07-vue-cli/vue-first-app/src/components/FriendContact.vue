<template>
  <li>
    <h2>{{ friend.name }}{{ friend.isFavorite ? '(Favorite)' : '' }}</h2>
    <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
    <span></span>
    <button @click="toggleFavorite">toggleFavorite</button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ friend.phone }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ friend.email }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {
      detailsAreVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleFavorite() {
      // 子组件通过$emit触发父组件在标签中定义的事件
      this.$emit('toggle-favorite', this.friend.id)
    },
    //  Unexpected mutation of "friend" prop
    // changeFriend() {
    //   this.friend.name = 'asdfbasf'
    // }
  },
  // 父组件传过来的数据
  // props数据传递是单向的，子组件不能修改props的内容，
  // 通知父组件更改(emit)或者将该值赋给子组件的某个值
  // props: ['friend'],
  props: {
    // friend: Object,
    friend: {
      type: Object,
      required: true
    },
    // name: {
    //   type: Object,
    //   required: true // Missing required prop: "name
    // },
    isFavorite: {
      type: String,
      required: false,
      default: "0",
      validator: function (value) {
        return value === '1' || value === '0'
      }
    }

  },

  // 显示写明有助于确认代码使用的emit，
  emits: ['toggle-favorite'],
  // 可以做一些校验，在被触发的事件对应的方法前执行
  // emits: {
  //   'toggle-favorite': function (id) {
  //     if (id) {
  //       console.log('true')
  //       return true;
  //     } else {
  //       console.warn('id is missing');
  //       return false;
  //     }
  //   }
  // },
};
</script>
