'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
function renderCountry(data) {
  const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
    1,
    0
  )} millions people</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

////////////// AJAX
// function getCountry(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send(); // 异步的，监听load事件来获取数据
//   request.addEventListener('load', function () {
//     const resp = JSON.parse(this.responseText);
//     resp.forEach((data) => {
//      renderCountry(data)
//   });
// })}
// getCountry('usa');
// getCountry('hk');

// //// 回调地狱，异步调用异步
// setTimeout(() => {
//   console.log('1 second passed away');
//   setTimeout(() => {
//     console.log('2 second passed away');
//     setTimeout(() => {
//       console.log('3 second passed away');
//       setTimeout(() => {
//         console.log('4 second passed away');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//////////////// Promise & Fetch
// 不要在回调函数里写回调函数
/*
const getJSON = function (url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('网络请求失败，响应码为：' + response.status);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // fetch的返回值就是一个Promise对象，未来数据的容器
  // const request = fetch(`https://restcountries.com/v2/name/${country}`);
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error('网络请求失败，响应码为：' + response.status);
  //   }
  //   return response.json();
  // })
  getJSON(`https://restcountries.com/v2/name/${country}`)
    .then((data) => {
      const country = data[0];
      renderCountry(country);
      // console.log(country);
      if (!country.borders) throw new Error('没有找到邻国');
      const border = country.borders[0];
      // 展示邻国
      return getJSON(`https://restcountries.com/v2/alpha/${border}`);
    })
    // // Promise可以让callback hell的异步嵌套扁平化
    // .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      renderCountry(data);
    })
    .catch((err) => {
      console.error(err);
    }) // 会处理整个执行链中的error
    .finally(() => {
      console.log('一定执行的方法');
    });
};

getCountryData('australia');
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const getLocation = function (...position) {
  const [longitude, latitude] = [...position]; // 布达佩斯
  const url = `https://geocode.xyz/${longitude},${latitude}?geoit=json`;
  const request = fetch(url);
  request
    .then((resp) => {
      if (!resp) {
        throw new Error('获取数据失败');
      }
      return resp.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city} ${data.country}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
// 访问限流处理
getLocation(52.508, 13.381);
setTimeout(() => {
  getLocation(19.037, 72.873);
}, 1000);
setTimeout(() => {
  getLocation(-33.933, 18.474);
}, 2000);
*/

////////////// 关于JS异步的测试
// 一般的异步在触发时被放入回调队列，Promise的异步在microtask队列，该队列优先级高于回调队列
// Eventloop将队列中的回调函数推入栈中执行
/*
console.log('test start');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);
Promise.resolve('Resolved promise').then((res) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('test end');
*/
// 执行结果
// 两个非异步的先执行
// test start
// test end
// 两个异步的会进入回调队列
// 本身timer应该在前面的， 但是因为promise属于microtask，而其优先级更高，
// 所以他先被调用，结果就是timer会被promise这个后来者堵住，导致延迟执行了
// Resolved promise
// 0 sec timer

//////////////// 原生Promise
// 接收一个函数作为参数，函数第一个参数是then对应的函数，第二个是catch对应的
/*
const promise = new Promise((resolve, reject) => {
  console.log('enter promise');
  if (Math.random() >= 0.5) {
    resolve('this is big');
  } else {
    reject('this is small');
  }
});
promise
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {
    console.error(res);
  });

const wait = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log('I waited 2 seconds');
});
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input.
 This function returns a promise which creates a new image 
 (use document.createElement('img')) and sets the .src attribute to 
 the provided image path. When the image is done loading, 
 append it to the DOM element with the 'images' class, 
 and resolve the promise. The fulfilled value should be the image 
 element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
const images = document.querySelector('.images');
let currentImg;
const wait = function (seconds) {
  return new Promise((reslove) => {
    setTimeout(reslove, seconds * 1000);
  });
};
const createImage = function (imgPath) {
  return new Promise((reslove, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      images.append(img);
      reslove(img);
    });
    img.addEventListener('error', function (e) {
      reject(new Error('图片加载失败'));
    });
  });
};

createImage('img/img-1.jpg')
  .then((img) => {
    currentImg = img;
    console.log('image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return new createImage('img/img-2.jpg');
  })
  .then((img) => {
    currentImg = img;
    console.log('image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch((e) => {
    console.log(e);
    console.log('image load failed');
  });
*/

/////////////////// async & await
// 定义一个异步函数
/*
const where = async (country) => {
  // 异步函数的异常处理
  try {
    const res = await fetch(`https://restcountri2es.com/v2/name/${country}`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.log(err.message);
  }
};
where('china'); // 异步执行，不会阻塞后面的代码
console.log('application start'); // 先输出
*/

// 同时执行多个异步调用
/*
const getJson = (country) => {
  return fetch(`https://restcountries.com/v2/name/${country}`).then((res) =>
    res.json()
  );
};

// 这张情况三个是顺序执行的
// const get3country = async (c1, c2, c3) => {
//   const data1 = await getJson(c1);
//   const data2 = await getJson(c2);
//   const data3 = await getJson(c3);
//   console.log(data1, data2, data3);
// };

/// all 全部完成，如果有一个出错，会短路结束 allsettled 全部完成，不会因某个失败而短路
// race一个完成，全部失败会短路  any：类似race，但不会短路
const get3country = async (c1, c2, c3) => {
  const data = await Promise.all([getJson(c1), getJson(c2), getJson(c3)]);
  console.log(data.map((c) => c[0].capital));
};

get3country('china', 'canada', 'usa');
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// PART 1
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    // 这个await的返回值就是异步函数里resolve的参数
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 1
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
loadNPause();
// PART 2
// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async (img) => await createImage(img));
//     const imgsEl = await Promise.all(imgs);
//     console.log(imgsEl);
//     imgsEl.forEach((img) => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
