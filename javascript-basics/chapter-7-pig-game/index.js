'use strict';

let current, scores, activePlayer, playing;

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const init = () => {
  current = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  console.log(`current--${activePlayer}`);
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const roll = () => {
  if (!playing) return;
  let number = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `./img/dice-${number}.png`;
  if (number != 1) {
    current += number;
    if (activePlayer == 0) {
      current0El.textContent = current;
    } else {
      current1El.textContent = current;
    }
  } else {
    switchPlayer();
  }
};

// 快捷键r绑定roll按钮
document.addEventListener('keypress', (e) => {
  if (e.key === 'r') {
    roll();
  }
});

const hold = () => {
  if (!playing) return;
  scores[activePlayer] += current;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // 游戏结束
  if (scores[activePlayer] >= 100) {
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    playing = false;
  } else {
    switchPlayer();
  }
};
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);
btnRoll.addEventListener('click', roll);
init();
