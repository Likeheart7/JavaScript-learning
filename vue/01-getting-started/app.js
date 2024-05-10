// 添加目标
// 1. 原生js实现
/* const listEl = document.querySelector('ul');
const inputEl = document.querySelector('#goal');
const submitBtnEl = document.querySelector('button');
inputEl.focus();

const submitGoal = () => {
  if (inputEl.value === '') return;
  const goal = inputEl.value;
  // 方式1
  //   const html = `<li>${goal}</li>`;
  //   listEl.insertAdjacentHTML('beforeend', html);
  // 方式2
  const liEl = document.createElement('li');
  liEl.innerText = goal;
  listEl.append(liEl);
  inputEl.value = '';
};

submitBtnEl.addEventListener('click', submitGoal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && inputEl.value !== '') {
    submitGoal();
  }
}); */

// vue实现
// 1.在html文件通过script标签引入vue
// 2. 创建vue
Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: '',
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
    },
  },
  //   mounted() {
  //     document.querySelector('input').focus();
  //   },
}).mount('#app'); // 挂载到这个元素
