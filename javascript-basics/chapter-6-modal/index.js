'use strict';

const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

// 展示模态窗口
const displayModal = (e) => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  //   console.log(e.srcElement.innerText);
};

// 关闭模态窗口
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', displayModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 按esc退出模态窗口
document.addEventListener('keydown', function (e) {
  // 虽然重复添加一个class不会导致添加进去重复的值，但是判断一下更符合逻辑
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
