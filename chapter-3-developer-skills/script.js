// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// 摄氏度转开尔文
/*
const measureKelvin = () => {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    value: Number(prompt('Degrees celsius')), // prompt always return a string
  };
  //   console.table(measurement);   //用表格打印对象属性
  const kelvin = measurement.value + 273.15;
  return kelvin;
};

console.log(measureKelvin());
*/

// ==== printForecast
// const data = [17, 21, 23];
const data = [12, 5, -5, 0, 4];
let result = '';
for (let i = 0; i < data.length; i++) {
  result += `${data[i]}℃ in ${i} days ... `;
}
console.log('... ' + result);
