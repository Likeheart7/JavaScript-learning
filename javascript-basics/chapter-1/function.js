// function
/*
const func = () => {
    return "this is a demo function"
}
console.log(typeof func, " --- ", func())

const greet = (name) => {
    console.log("hello, " + name)
}

greet("chens")
*/

/*可变参数 */
/*
const changeableFunc = (name, ... hobby) => {
    console.log(name, hobby)
    console.log(typeof(hobby));  
}
changeableFunc("chenxing", "sleep", "play", "programming")
*/

let returnVal = () => {
    return 5
}


console.log(returnVal)  //() => {return 5}
console.log(returnVal())    // 5

returnVal = () => 10
console.log(returnVal)  //() => 10
console.log(returnVal())    // 10

