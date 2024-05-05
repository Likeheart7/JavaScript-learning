'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

// slice
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(0, 2));
console.log(arr.slice(-2));
*/

// splice 会改变原数组
/*
console.log(arr.splice(-2));
console.log([...arr]);
*/

// reverse
/*
console.log(arr.reverse());
// concat 不会改变原数组
console.log(arr.concat([1, 2, 3]));
// 可以用
console.log([...arr, 1, 2, 3]);

//join
console.log(arr.join(', '));

// es2022
console.log(arr.at(0));
console.log(arr.at(-1));
console.log('chens'.at(-1));


// 遍历数组
for (let num of arr) {
  console.log(num);
}

for (let [index, item] of arr.entries()) {
  console.log(index, item);
}

arr.forEach((item) => console.log(item));
*/
/*
const list = [15, 40, 20, 94, 97, -56, 55, 28, -94, 37];

// 将数组的每个元素+10并返回一个新数组
const result = list.map((item) => item + 10);
console.log(result);

// 将数组所有满足条件的元素放入一个新数组并返回
const filterArr = list.filter((item) => item > 90);
console.log(filterArr);

//reduce acc: 累加器 cur：当前元素 i：当前索引 arr：整个数组, 0:acc的初始值
const balance = list.reduce((acc, cur, i, arr) => {
  console.log(acc, cur, i, arr);
  return acc + cur;
}, 0);
console.log(balance);
// 使用reduce获取最大值
const max = list.reduce((acc, cur) => {
  if (acc > cur) return acc;
  return cur;
}, list[0]);

console.log(max);

// 链式调用
const chainRes = list.filter((e) => e > 0).map((e) => e * 7);
console.log(chainRes);

// find 返回第一个满足条件的元素，不存在则返回undefined
// 如果是对象数组，返回的变量和数组内元素指向同一个对象，修改会互相影响
console.log(list.find((e) => e > 90));

const objs = [
  { name: 'chen', age: 20 },
  { name: 'xing', age: 28 },
];
const obj = objs.find((e) => {
  return e.name === 'chen';
});
obj.name = 'likeheart';
console.log(objs);
*/

// includes some
/*
const mov = [200, -200, 10, 100];
console.log(mov.includes(200));
console.log(mov.some((item) => item > 50)); // 有一个符合
console.log(mov.every((item) => item > 0)); // 所有都符合
*/
// flat flatMap
// 多维数组扁平化,默认只作用一层，参数调整层级
/*
const list = [[1, 2, 3], [4, 5], 6];
console.log(list.flat());

const list2 = [[1, [9, 10], 2, 3], [4, 5], 6];
console.log(list2.flat(2));

const mov = [
  {
    username: 'chen',
    number: [20, 88, -100, 111, [232]],
  },
  {
    username: 'xing',
    number: [220, 188, -223, 11],
  },
];
// 实际就是先map，再flat,只能一层
console.log(mov.flatMap((e) => e.number));

// fill
const x = new Array(7);
console.log(x);
x.fill(1);
console.log(x);
x.fill(23, 2, 5);
console.log(x);

// from
const eles = document.querySelectorAll('.movements__value');
console.log(eles);
// 转成数组
const eleArr = Array.from(eles);
console.log(eleArr.map((el) => el.textContent.replace('€', '')));
const eleArr2 = [...eleArr];
console.log(eleArr2);
*/

/////// code challenge
const arr = accounts.map((e) => e.movements).flat();
console.log(arr);
console.log(arr.reduce((sum, cur) => sum + cur, 0));

// at least 1000
console.log(accounts.flatMap((e) => e.movements).filter((e) => e > 1000));

// 统计输出和支出笔数
console.log(
  accounts
    .map((e) => e.movements)
    .flat()
    .reduce(
      (sums, cur) => {
        // cur > 0 ? sums.income++ : sums.withdrawals++;
        sums[cur > 0 ? 'income' : 'withdrawals']++;
        return sums;
      },
      { income: 0, withdrawals: 0 }
    )
);

// 转首字母大小
// this is a nice title ==> This Is a Nice Title
// this is a LONG title but not too long ==> This Is a Long Title but Not Too Long
const str = 'this is a nice title';
const str2 = 'this is a LONG title but not too long';
const str3 = 'and this is a ExCePtion title';
const convert2Upper = function (str) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'and', 'on', 'with', 'in'];
  const titleCase = str
    .toLowerCase()
    .split(' ')
    .map((e) => {
      return exceptions.includes(e) ? e : capitalize(e);
    })
    .join(' ');
  return capitalize(titleCase); // 处理首字母是and、or等的情况
};
console.log(convert2Upper(str));
console.log(convert2Upper(str2));
console.log(convert2Upper(str3));
