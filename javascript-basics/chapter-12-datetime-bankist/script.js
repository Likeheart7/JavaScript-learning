'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2024-04-29T23:36:17.929Z',
    '2024-04-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

// 登录逻辑
const createUsername = function (accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

createUsername(accounts);

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (24 * 60 * 60 * 1000));
  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed <= 1) return 'today';
  if (daysPassed === 2) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

const displayMovements = function (acc, sorted = false) {
  // console.log(acc);
  const movements = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const date = new Date(acc.movementsDates[i]);
    const movDay = formatMovementDate(date);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__date">${movDay}</div>
          <div class="movements__value">${mov.toFixed(2)}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = (acc) => {
  currentAccount.balance = acc.movements
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  labelBalance.innerText = currentAccount.balance + '€';
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((e) => e > 0)
    .reduce((acc, cur) => acc + cur)
    .toFixed(2);
  labelSumIn.innerText = `${income}€`;
  const out = acc.movements
    .filter((e) => e < 0)
    .reduce((acc, cur) => acc + cur)
    .toFixed(2);
  labelSumOut.textContent = -out + '€';
  const interest = acc.movements
    .filter((e) => e > 0)
    .map((e) => (e * acc.interestRate) / 100)
    .filter((e) => e > 1)
    .reduce((arr, cur) => arr + cur, 0)
    .toFixed(2);
  labelSumInterest.innerText = interest + '€';
};

const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  if (timer) clearInterval(timer);
  const logout = () => {
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
    clearInterval(timer);
  };
  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      logout();
    }
    time--;
  };
  let time = 600;
  tick();
  timer = setInterval(tick, 1000);
};
let currentAccount, timer;
btnLogin.addEventListener('click', (e) => {
  // 组织按钮默认提交表单的行为
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  // 清除输入框数据
  inputLoginUsername.value = inputLoginPin.value = '';
  // 处理光标
  inputLoginPin.blur();
  currentAccount = accounts.find((account) => account.username === username);
  if (currentAccount?.pin === pin) {
    // welcome修改
    labelWelcome.textContent = 'welcome,' + currentAccount.owner;
    containerApp.style.opacity = 100;
    startLogoutTimer();
    updateUI(currentAccount);
  }
});

// 登录键绑定回车
// document.addEventListener('keydown', (e) => {
//   if (e.key == 'Enter') {
//     btnLogin.click();
//   }
// });

// 转账
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  const transferUser = accounts.find((acc) => acc.username === transferTo);
  // 如果用户不存在,数目为负数,数目大于余额，清空，结束
  if (
    !transferUser ||
    transferAmount <= 0 ||
    transferAmount > currentAccount.balance ||
    transferUser.username === currentAccount.username
  ) {
    inputTransferTo.value = inputTransferAmount.value = '';
    return;
  }
  // 不能转给自己
  currentAccount.movements.push(-transferAmount);
  transferUser.movements.push(transferAmount);
  currentAccount.movementsDates.push(new Date().toISOString());
  transferUser.movementsDates.push(new Date().toISOString());
  startLogoutTimer();
  updateUI(currentAccount);
});

// 注销账户
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  if (
    closeUsername === currentAccount.username &&
    closePin === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === closeUsername && acc.pin === closePin
    );
    // 两个参数表示从index开始删除n个元素
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  clearInterval(timer);
});

// 贷款 允许贷款历史最大income的10倍
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some((e) => e > amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
  startLogoutTimer();
});

let sorted = false;
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = now.getHours();
const minute = now.getMinutes();

labelDate.textContent = `${year}/${month}/${day} ${hour}:${minute}`;
// 伪造登录显示
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// chapter 12
/* Number & BigInt
console.log(20 === 20.0); // trued
console.log(Number(23) == +'23'); // true +产生一个 强制转换
console.log(Number.parseInt('123px')); // 123 只对数字开头有效
console.log(parseInt('123px')); // 123 和上面相同
console.log(20 / 0); // Infinity
console.log(Number.isFinite(20 / 0));

// 获取两个数区间的随机数
const max = 50;
const min = 30;
console.log(Math.trunc(Math.random() * (max - min) + 1) + min);

// 尾数
console.log((2.7).toFixed(3));

// js的超大整数 Bigint
console.log(521341234123412342123412343423); // 5.2134123412341234e+29
console.log(521341234123412342123412343423n); // 521341234123412342123412343423n
// BigInt不能跟普通数运算, Math也不能用
// console.log(1234213n * 10); // : Cannot mix BigInt and other types, use explicit conversions
// 可以比较大小
console.log(234234234234n > 12341234213421342); // false
*/

// date & time
// console.log(new Date());
// console.log(new Date('Dec 12 2024 19:05:23'));
// console.log(new Date(2024, 7, 12, 12, 11, 23));

// const future = new Date(2025, 2, 9, 9, 0, 27);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth()); // month 从0 开始
// console.log(future.getDate());
// console.log(future.getDay()); //星期 0表示周日
// console.log(future.getSeconds());
// console.log(future.getTime()); // 时间戳
// console.log(+future); // 时间戳

// setTimeout
// const timeouter = setTimeout(() => {
//   console.log('this is a timeout');
// }, 3000);
// clearTimeout(timeouter); // 清除

// setInterval
// const secondInterval = setInterval(() => {
//   console.log(`每秒执行一次`);
// }, 1000);
// setTimeout(() => {
//   // 清除
//   console.log('清除');
//   clearInterval(secondInterval);
// }, 5000);
