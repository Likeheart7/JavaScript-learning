'use strict';

let score = 20;
let highscore = 0;
let secretNum = Math.ceil(Math.random() * 20);
let guessFlag = false;

const info = document.querySelector('.message');
const numberBox = document.querySelector('.number');
const scoreTag = document.querySelector('.score');
const highScoreTag = document.querySelector('.highscore');

// extract duplicate code

const checkNumber = () => {
  if (score <= 0) {
    info.textContent = '💥 you lost this game!';
    return;
  }
  if (guessFlag) {
    return;
  }
  const inputNum = document.querySelector('.guess').value;
  if (!inputNum) {
    info.textContent = '⚠️ please enter your answer!';
  } else if (Number(inputNum) != secretNum) {
    info.textContent = inputNum > secretNum ? '😥 too high!' : '😟 too low!';
    scoreTag.textContent = --score;
  } else {
    info.textContent = '🥳 correct number !!!';
    guessFlag = true;
    if (score > highscore) {
      highscore = score;
      highScoreTag.textContent = highscore;
    }
    numberBox.innerText = secretNum;
    // 可以通过js设置渐变
    document.querySelector('body').style.background =
      'linear-gradient(to left top, #7800f9, rgb(25, 41, 188))';
  }
};

const reset = () => {
  guessFlag = false;
  // 重置secretNum
  secretNum = Math.ceil(Math.random() * 20);
  // 将secretNum隐藏
  numberBox.textContent = '?';
  // 重置score为20
  score = 20;
  // 重置界面的score
  scoreTag.textContent = score;
  // 重置info
  info.textContent = 'Start guessing...';
  //重置背景色
  document.querySelector('body').style.background = '#333';
  //清空输入框
  document.querySelector('.guess').value = '';
};

// 将check绑定到回车键
document.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    checkNumber();
  }
});
// 给Again button添加事件
document.querySelector('.again').addEventListener('click', reset);
// 给 check button添加点击事件
document.querySelector('.check').addEventListener('click', checkNumber);

alert(secretNum);
