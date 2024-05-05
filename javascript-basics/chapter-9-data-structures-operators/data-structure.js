//////////////////// set ////////////////////////
/*
const staffs = ['watier', 'manager', 'waiter', 'manager', 'cook', 'cook'];
console.log(new Set(staffs));
console.log(new Set(staffs).size);
const staffUnique = new Set(staffs);

// 数组去重
const staffDistinct = [...new Set(staffs)];
console.log(staffDistinct);

// 可以使用for遍历
for (const staff of staffUnique) {
  console.log(staff);
}
*/

//////////////////// map ////////////////////////
/*
const rest = new Map();
rest.set('name', 'chens');
rest.set('age', 25).set('location', 'anhui');
console.log(rest);
console.log(rest.get('age'));
console.log(rest.has('name'));
console.log(rest.keys());
console.log(rest.values());
console.log(rest.entries());

// iteration
// 可以用一个二维数组来创建
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Python'],
]);

for (const [key, value] of question) {
  console.log(`${key}: ${value}`);
}

console.log(...question);
*/

//////////////////// string ////////////////////////
/*
const airline = 'China Eastern Airlines';
console.log(airline[0]); // C
console.log(airline.indexOf('i')); // 2
console.log(airline.lastIndexOf('i')); // 18
console.log(airline.slice(4)); // a Eastern Airlines
console.log(airline.slice(4, 7)); //a E
console.log(airline.slice(-2)); // es

const newAirline = airline.replace('i', 'I'); // 不会改变源字符串，并且只替换第一个
console.log(newAirline);
const newAirline2 = airline.replaceAll('i', 'I'); // 不会改变源字符串，并且替换全部
console.log(newAirline2);

console.log(airline.includes('China')); // 区分大小写
*/

const str = 'name:chens, age:25, birth:07';
const split = str.split(', '); // 根据指定字符拆分
console.log(split);
console.log(split.join('--')); // 根据给定字符连接
const message = 'hello ';
console.log(message.repeat(5));
