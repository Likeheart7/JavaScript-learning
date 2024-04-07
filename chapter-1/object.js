// simple object
let user = {
    name: 'crystal',
    age: 25,
    toString() {
        return `this user is ${this.name}, age is ${this.age}`
    }
}

console.log(user);
console.log(user.toString());

const tag = document.querySelector("#main")
console.log(tag.innerHTML);
tag.innerHTML = user