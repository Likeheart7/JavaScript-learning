// 浅拷贝与深拷贝
'use strict';

const jessica = {
  firstName: 'jesscia',
  lastName: 'williams',
  age: 27,
  family: ['Bob', 'Alice', 'Shaun'],
};

// 浅拷贝
const marriedJessica = Object.assign({}, jessica);
marriedJessica.lastName = 'Davis';
marriedJessica.family.push('Mary');
console.log(jessica);
console.log(marriedJessica);

// 深拷贝
// 需要依靠第三方库来实现深拷贝
