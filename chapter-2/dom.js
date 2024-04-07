// 获取单个元素
/*
console.log(document.URL);
console.log(document);  // 和控制台element里面的差不多
*/
/*
const firstP = document.querySelector('p')
firstP.innerText = "I change the content in first p tag"
console.log(firstP);


const firstError = document.querySelector(".error")
firstError.innerText = "change the first"

const divError  = document.querySelector("div.error")
console.log(divError.innerHTML)
*/

// 获取多个元素
/*
const all = document.querySelectorAll('p')
console.log(all); // NodeList(3) [p, p, p.error]
all.forEach(item => {
    console.log(item);
})
console.log(all[2].innerText);
// 获取class是error的所有标签
const allError = document.querySelectorAll('.error')
console.log(allError[1]);
*/

// 根据id获取指定的某个标签
/*
const tag = document.getElementById('page-title')
const classTag = document.getElementsByClassName('page-title')
const tags = document.getElementsByTagName('p')
console.log(tags);
// 不能使用forEach
// tags.forEach(item => {
//     item.innerText = "I change all the p tags"
// })
// 可以用for
for (let i = 0; i<tags.length; i++) {   
    tags[i].innerHTML += "<h2>I change all the p tags</h2>"
} 
*/

// 获取标签属性
/*
const link = document.querySelector('a')
console.log(link.getAttribute('href')); // 获取指定属性
console.log(link.getAttributeNames());  // 获取所有属性名称
// 更改属性
link.setAttribute('href', "https://www.bilibili.com")
link.innerText = '转到bilibili'

const errors = document.getElementsByClassName('error')
for (let i = 0; i<errors.length; i++) {
    // 添加style属性
    errors[i].setAttribute("style", "color: red")
    // 追加style
    errors[i].style.margin = '50px'
    errors[i].style.fontSize = '50px'

}
*/

// 添加class
const tag = document.querySelector('p')
// console.log(tag.classList);
// tag.classList.add('addClass')
console.log(tag.classList.toggle("test"));  // 如果没有这个class，就添加上并返回ture
console.log(tag.classList.toggle("test"));  // 如果有这个class，就删除并返回false
