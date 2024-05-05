'use strict';

// 解构赋值
/*
const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a, b, c);

const locations = ['Italian', 'America', 'Russia', 'Japan'];
const [first, , third] = locations;
console.log(first, third);
*/

// 交换变量值
/*
let [x, y] = [10, 20];
console.log(x, y);
[x, y] = [y, x]; // 通过解构赋值实现变量交换
console.log(x, y);
*/

// 解构嵌套数组
/*
const nested = [2, 3, [4, 8]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

const arrObj = [2, 3, { name: 'chens', age: 25 }];
const [, , o] = arrObj;
console.log(o);
*/

// 解构对象
/*
const obj = {
  name: 'chens',
  age: 25,
  hobby: 'sleep',
};

const { name: username, age, hobby } = obj;
console.log(username, age, hobby);
*/

// spread operator  展开运算符
/*
const origin = [1, 2, 3];
const newArr = [20, 30, ...origin];
console.log(newArr); // [20, 30, 1, 2, 3]

const str = 'chens';
const charArr = [...str];
console.log(charArr); // ['c', 'h', 'e', 'n', 's']

// rest pattern
const [one, two, ...others] = [1, 2, 3, 4, 5, 6];
console.log(one, two, others); // 1, 2, [3, 4, 5, 6]

const add = function (...numbers) {
  console.log(numbers);
};

add(1, 2, 3, 4);

*/
// || 和 &&
/*
console.log(0 || false); // 返回第一个为true的，如果没有就返回最后一个。可以用于简化三目运算符
console.log('a' && false && 'nihao'); // 返回第一个为false的，如果没有就返回最后一个

// ?? es2020
console.log(0 ?? true); // 返回第一个值不为为undefined、null的或最后一个值
*/

// es2021
/*
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'Hilton',
  owner: 'me',
};

// rest1.numGuests ||= 20;
// rest1.numGuests ??= 20;
rest2.numGuests ??= 20;
rest2.owner &&= 'Conrad Hilton';

console.log(rest1);
console.log(rest2);
*/

// for of
/*
const locations = ['Italian', 'America', 'Russia', 'Japan'];
for (const location of locations) {
  console.log(location);
}
for (const [index, item] of locations.entries()) {
  console.log(index, item); //  0 'Italian'
}
*/

// 对象成员
/*
const flavour = ['salt', 'sugar', 'aginomoto'];
const dish = {
  name: 'braised eggplant',
  flavour, // 等价于 flavour: flavour,
  eat(target) {
    console.log(target + ' eat the dish');
  },
};
console.log(dish);
*/
// es2020 optional chaining
/*
console.log(dish.main?.name);
console.log(dish.main.name);
*/

// Looping Object
const dish = {
  name: 'braised eggplant',
  flavour: ['salt', 'sugar', 'aginomoto'], // 等价于 flavour: flavour,
  eat(target) {
    console.log(target + ' eat the dish');
  },
};

for (const key of Object.keys(dish)) {
  console.log(key);
}

for (const value of Object.values(dish)) {
  console.log(value);
}
console.log(Object.entries(dish));
