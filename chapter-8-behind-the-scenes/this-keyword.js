/*
普通函数的this指向调用该方法的对象。
箭头函数的this是父作用域的this关键字，箭头函数本身没有this。
在需要用到this关键字的一般情况下使用普通函数，内部函数使用箭头函数。
箭头函数没有arguments关键字，普通函数才有
*/

'use strict';
/*
console.log(this); // window对象

const calcAge = function (birthYear) {
  console.log(this); // 严格模式下是undefined，非严格模式下是window对象
  return 2049 - birthYear;
};

calcAge(2000);

const calcAgeArrow = (birthYear) => {
  console.log(this); // 箭头函数没有自己的this关键字，结果总是父作用域的this
  return 2049 - birthYear;
};

calcAgeArrow(2000);

const chens = {
  year: 25,
  calcAge: function () {
    console.log(this); // 调用这个方法的对象
  },
  calcName: () => {
    console.log(this); // 父作用域是global scope 所以是window
  },
};

chens.calcAge(); // {year: 25, cal|cAge: ƒ}
const f = chens.calcAge;
f(); // undefined

chens.calcName(); // window对象
*/

const chens = {
  firstName: 'chen',
  year: 2000,
  calcAge: function () {
    console.log(2049 - this.year);
    const isMillenial = function () {
      console.log(this); // 严格模式下是undefined, 因为调用它的对象
      if (this.year % 1000 == 0) {
        console.log('is millenail');
      }
    };
    isMillenial(); // 当函数作为独立函数调用时， this通常指向全局对象
  },
  calcAgeSolution1: function () {
    console.log(2049 - this.year);
    const that = this;
    const isMillenial = function () {
      console.log(that); // 严格模式下是undefined, 因为调用它的对象
      if (that.year % 1000 == 0) {
        console.log('is millenail');
      }
    };
    isMillenial(); // 当函数作为独立函数调用时， this通常指向全局对象
  },
  calcAgeSolution2: function () {
    console.log(2049 - this.year);
    const isMillenial = () => {
      console.log(this); // 严格模式下是undefined, 因为调用它的对象
      if (this.year % 1000 == 0) {
        console.log('is millenail');
      }
    };
    isMillenial(); // 当函数作为独立函数调用时， this通常指向全局对象
  },
};

chens.calcAgeSolution2();
