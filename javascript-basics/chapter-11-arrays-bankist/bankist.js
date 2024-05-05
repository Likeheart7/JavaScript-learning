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

const displayMovements = function (movements, sorted = false) {
  movements = sorted ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = (mov) => {
  currentAccount.balance = mov.reduce((acc, cur) => acc + cur, 0);
  labelBalance.innerText = currentAccount.balance + '€';
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((e) => e > 0)
    .reduce((acc, cur) => acc + cur);
  labelSumIn.innerText = `${income}€`;
  const out = acc.movements
    .filter((e) => e < 0)
    .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = Math.abs(out) + '€';
  const interest = acc.movements
    .filter((e) => e > 0)
    .map((e) => (e * acc.interestRate) / 100)
    .filter((e) => e > 1)
    .reduce((arr, cur) => arr + cur, 0);
  labelSumInterest.innerText = interest + '€';
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc.movements);
  calcDisplaySummary(acc);
};

let currentAccount;
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
});

// 贷款 允许贷款历史最大income的10倍
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some((e) => e > amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
