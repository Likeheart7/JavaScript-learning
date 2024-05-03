'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', () => {
  // 平滑滚动到指定元素
  section1.scrollIntoView({ behavior: 'smooth' });
});

// 导航栏滚动
// 如果对每个标签绑定事件监听器会影响性能，所以对其共有父类元素绑定即可
// （事件会沿着dom树传播，捕获阶段向下、冒泡阶段向上，默认冒泡阶段）
navLinks.addEventListener(
  'click',
  (e) => {
    const originTag = e.target;
    // 判断是否是导航标签
    if (!originTag.classList.contains('nav__link')) return;
    e.preventDefault(); // 默认会跳到href属性指定的标签上
    const href = originTag.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    // e.stopPropagation(); // 组织事件继续传播，这里不需要
  },
  true
); // true表示捕获阶段绑定，默认false

////// 标签选择
const tabContainer = document.querySelector('.operations__tab-container');
const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsContents = document.querySelectorAll('.operations__content');
tabContainer.addEventListener(
  'click',
  (e) => {
    const originTag = e.target;
    const btn = originTag.closest('.operations__tab'); // 拿到最近的按钮
    if (!btn) return; // 如果不是按钮，就不执行操作
    operationsTabs.forEach((tab) => {
      tab.classList.remove('operations__tab--active');
    });
    btn.classList.add('operations__tab--active');
    operationsContents.forEach((content) => {
      content.classList.remove('operations__content--active');
    });
    document
      .querySelector(`.operations__content--${btn.dataset.tab}`)
      .classList.add('operations__content--active');
  },
  true
);
// 导航栏悬浮突出显示
// 鼠标悬停，其他菜单透明度改变
navLinks.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    link
      .closest('.nav__links')
      .querySelectorAll('.nav__link')
      .forEach((el) => {
        if (el !== link) el.style.opacity = 0.5;
      });
  }
});
// 悬停离开，所有
navLinks.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('nav__link')) {
    navLinks.querySelectorAll('.nav__link').forEach((el) => {
      el.style.opacity = 1;
    });
  }
});

// 顶部菜单栏粘性导航
// 滚动事件属于窗口
// 下面这个方式效率很低，因为监听滚轮事件触发次数非常多
// const initCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/// 通过交叉观察者对象实现
const header = document.querySelector('.header');
const stickyCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyCallback, {
  root: null, //表示整个视口
  threshold: 0, // 相交阈值，表示指定元素和指定root之间相交的百分比阈值，达到则调用回调函数
  rootMargin: -nav.getBoundingClientRect().height + 'px', // 负值，让回调函数在距离目标元素还有正好整个header的距离时提前触发
});
headerObserver.observe(header); // 指定观察元素

// section渐入效果（css和translateY有关）
sections.forEach((el) => {
  el.classList.add('section--hidden');
});
const secObserverCallback = function (entries, observe) {
  const entry = entries[0];
  const target = entry.target;
  if (entry.isIntersecting) {
    target.classList.remove('section--hidden');
    // 只需要观察一次就可以
    observe.unobserve(target);
  }
};
const sectionObsever = new IntersectionObserver(secObserverCallback, {
  root: null,
  threshold: 0.1,
});
sections.forEach((sec) => {
  sectionObsever.observe(sec);
});

// 懒加载图片处理
const imgCallback = function (entries, observer) {
  const [entry] = entries;
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img'); // 直接调用在网络缓慢的情况下会展示压缩后的图片
  // 使用监听load事件，元素加载完
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target); // 触发一次就可以删除了
};
const imgObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0,
});
const imgs = document.querySelectorAll('img[data-src]');
imgs.forEach((img) => {
  imgObserver.observe(img);
});

// 处理滚动消息
let slideCount = 0;
const slides = document.querySelectorAll('.slide');
const maxSlideCount = slides.length;
const preBtn = document.querySelector('.slider__btn--left');
const nextBtn = document.querySelector('.slider__btn--right');
const go2Slide = (curSlide) => {
  slides.forEach((slide, i) => {
    slide.style.transform = `TranslateX(${(i - curSlide) * 100}%)`;
  });
};
go2Slide(slideCount);
preBtn.addEventListener('click', (e) => {
  if (slideCount > 0) {
    slideCount--;
  } else {
    slideCount = 0;
  }
  console.log(slideCount);
  go2Slide(slideCount);
});
nextBtn.addEventListener('click', (e) => {
  if (slideCount < maxSlideCount - 1) {
    slideCount++;
  } else {
    slideCount = 0;
  }
  go2Slide(slideCount);
});
///////////////////////   选择元素

/*
// 整个页面
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// allBtn是一个HTMLCollection，HTMLCollection变量会在页面改变的时候，更新自己的值（live collection)
const allBtn = document.getElementsByTagName('button');
console.log(allBtn);
// 返回一个nodelist，nodelist不是实时更新的
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// 创建元素
const header = document.querySelector('header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  "I use cookied for improved functionality <button class = 'btn btn--close-cookie'>Fantasy</button>";
// 后一个的生效，因为创建的这个dom元素是唯一的，在dom树中只能存在一个
header.prepend(message);
header.append(message);
// 如果想要生效多个,true表示深拷贝
// header.prepend(message.cloneNode(true));
console.log(header);

// 删除元素
const btn = document.querySelector('.btn--close-cookie');
btn.addEventListener('click', () => {
  // message.remove();
  // btn.remove();
  // message.parentElement.removeChild(message);
  message.removeChild(btn);
});

// styles
message.style.backgroundColor = '#37383d';
// 只对行内样式生效，所以fontSize是空
console.log(message.style.fontSize);
console.log(message.style.backgroundColor);
// 其他样式访问
console.log(getComputedStyle(message).fontSize);
// 改变自定义的样式
// document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log(document.documentElement.style);
*/

///////  一些其他的event,绑定多个事件都会执行
/*
document.addEventListener('copy', (e) => {
  const data = document.getSelection();
  console.log('你在从网页复制内容: ', data.toString());
  e.clipboardData.setData('text/plain', '不给复制');
  e.preventDefault(); // 禁止默认行为，就是不给执行原先的复制操作
});
// 另一种写法
document.oncopy = (e) => {
  const data = document.getSelection();
  console.log('从网页复制内容: ', data.toString());
  e.clipboardData.setData('text/plain', '不给复制');
  e.preventDefault(); // 禁止默认行为，就是不给执行原先的复制操作
};
const h1 = document.querySelector('h1');
const h1Event = (e) => {
  console.log('进来了');
  h1.removeEventListener('mouseenter', h1Event); //执行一次就移除监听
};
h1.addEventListener('mouseenter', h1Event);
// h1.addEventListener('mouseout', (e) => {
//   console.log('出去了');
// });
*/
