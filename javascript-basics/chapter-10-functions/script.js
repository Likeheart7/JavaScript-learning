'use strict';
/*
const bookStore = {
  name: 'aizhi',
  location: 'hefei',
  sale(bookName) {
    // console.log(this);
    console.log(`${this.location + ':' + this.name} sole ${bookName}`);
  },
};

const saleFunc = bookStore.sale;

// 注解调用会报错，因为这里this指向会是undefined
// console.log(saleFunc('在细雨中呼喊'));

const yuyingStore = {
  name: '育英',
  location: '淮南',
};
// 这种情况需要用call方法来调用，第一个参数指明this，后面的是方法执行需要的参数
saleFunc.call(yuyingStore, '在细雨中呼喊');

// 也可以通过bind方法将该方法绑定到一个对象来，来指明他的this指向
// bind会返回一个绑定了参数对象的方法，这个方法可以直接调用
const saleYuying = saleFunc.bind(yuyingStore);
saleYuying('失明症漫记');
// 也可以在bind中直接给出参数
const saleYY = saleFunc.bind(yuyingStore, '我们为什么要睡觉');
saleYY();

// 和eventListener结合使用
bookStore.area = 100;
bookStore.expansion = function () {
  this.area += 10;
  console.log(this.area);
};

// 在这种情况下会因为找不到this，而无法访问area属性
// document.querySelector('.buy').addEventListener('click', bookStore.expansion);
// 此时就可以用bind来绑定具体的对象
document
  .querySelector('.buy')
  .addEventListener('click', bookStore.expansion.bind(bookStore));

// 只执行一次的方法, IIFE Imediately Invoked Function Expression
(function () {
  console.log('this will be invoked only once');
})();
// or
(() => {
  console.log('this will be invoked only once too');
})();
*/

// 闭包
const func = () => {
  let passenger = 10;
  return () => {
    passenger++;
    console.log(passenger);
  };
};

const closure = func();

// 仍然可以访问已经结束的func方法内的passenger变量
closure();
closure();
closure();

// 示例2
let f;
const g = () => {
  const num = 100;
  f = () => {
    console.log(num * 2);
  };
};

g();
f();
