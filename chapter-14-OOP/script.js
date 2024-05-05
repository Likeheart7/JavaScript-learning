'use strict';

/*
// 创建一个自定义对象
// 1. 声明构造器，这里不能使用箭头函数，因为箭头函数没有自己的this
const Person = function (username, password) {
  // 实例变量
  this.username = username;
  this.password = window.btoa(password);
};
// 2. 通过new关键字创建对象，new将这个实例链接到Person的原型
const user = new Person('likeheart', '123456');
// 3. 在原型上绑定方法供对象调用，同样不用箭头函数
Person.prototype.getUsername = function () {
  return this.username;
};
Person.prototype.getPassword = function () {
  return `编码后的密码是：${this.password}`;
};
// 4. 打印对象信息，可以理解成对象实例委托原型执行方法，多级原型形成原型链，对象实例在链上遍历寻找目标属性/方法
console.log(user.getUsername());
console.log(user.getPassword());
// 5. 关于原型
console.log(Person.prototype);
console.log(user.__proto__);
console.log(user.__proto__ === Person.prototype); // true，这两个是同一个原型
console.log(Person.prototype.isPrototypeOf(user)); // true， 是同一个
console.log(Person.prototype.isPrototypeOf(Person)); // false, Person不属于这个原型
// 6. 绑定原型变量
Person.prototype.desc = '这是一个Person类型';
console.log(Person.desc); // undefined   无法通过类名. 来访问
console.log(Person.prototype.desc); // 可以
console.log(user.desc); // 实例可以直接访问原型变量
console.log(Person.hasOwnProperty('desc')); // false
console.log(Person.prototype.hasOwnProperty('desc')); //true
console.log(user.hasOwnProperty('desc')); // false

console.log(Object.prototype.isPrototypeOf(Person)); // true，Person类型也属于Object的原型
*/

///////////////////////////////////////////////
// Coding Chanllenge
/*
1. 通过构造器实现一个Car类型，包括make和speed属性，speed属性km/h单位
2. 实现一个accelerate方法，将汽车的速度提升10，打印新的速度
3.实现brake方法将速度减少5，打印新的速度
4. 创建两个Car实例，调用accelerate和brake方法试试
DATA CAR: 'BMW' going at 120km/h
DATA CAR: 'Mercedes' going at 95km/h
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.name} going at ${this.speed}`);
};
Car.prototype.broke = function () {
  this.speed -= 5;
  console.log(`${this.name} going at ${this.speed}`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.broke();
bmw.broke();
bmw.broke();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.broke();
mercedes.broke();
*/

/////////////////////////////////////
////////   ES6 classes
/*
class Person {
  constructor(name, age) {
    this._name = name;
    this._age = age;
    this._hobby = ['sleep', 'run', 'walk'];
  }
  // 构造器外定义的方法都是属于原型的，实例对象调用时委托给原型执行
  get name() {
    return 'this name is ' + this._name;
  }
  // getter & setter 一般在需要额外的验证等逻辑时，才会使用getter / setter
  get age() {
    return this.name + "'s age is " + this._age;
  }
  set hobby(hobby) {
    this._hobby.push(hobby);
  }
  get hobby() {
    return this._hobby;
  }

  // 静态方法，只能在类上调用，对象和原型都不可以
  static hey() {
    console.log('向你打招呼');
  }
}
console.dir(Person);
const person = new Person('like', 25);
console.log(person.name); // get修饰的方法可以直接像属性一样调用
console.log(person.age);
person.add = 'call';
console.log(person.hobby);
console.log(person);
Person.hey();
 */

///////////////////////
/*
/// Object.create创建对象
// 1. 创建一个原型
const PersonProto = {
  desc() {
    console.log(`${this.name} is ${this.age} years old.`);
  },
  // 创建初始化方法
  init(name, age) {
    this.name = name;
    this.age = age;
  },
};
// 2.通过原型作为参数创建对象实例，返回的对象时连接到作为参数的这个原型的
const person = Object.create(PersonProto);
// 通过初始哈方法设置对象属性值
person.init('like', 26);
person.desc();
*/

////////////////////
//// Coding Chanllenge 2
// 使用es6的class完成Coding Chanllenge 1
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    this._printCar();
  }
  brake() {
    this.speed -= 5;
    this._printCar();
  }
  _printCar() {
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
}

const byd = new Car('BYD', 120);
const mercedes = new Car('Mercedes', 95);
byd.accelerate();
byd.accelerate();
byd.accelerate();
byd.brake();
mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
*/

//////////////////////////
//////////// 继承
/// es6之前的语法，也是es6语法的底层实现
/*
const Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.introduce = function () {
  console.log(`${this.name} is ${this.age} years old;`);
};

const Student = function (name, age, course) {
  // 1. 在构造器里通过父类.call调用父类构造器
  Person.call(this, name, age); // 类似super()
  this.course = course;
};
// console.dir(Person);
// 2. 将Student的原型绑定为Person的原型的对象实例
Student.prototype = new Person();

const student = new Student('like', 26, 'cs'); // 可以调用Person的方法
student.introduce();
console.dir(Student); // 可以看到Student的prototype是Person，实现了继承

// 3. 默认情况下，这会导致Student.prototype.constructor指向Person类型的构造器
console.log(Student.prototype.constructor);
// fix it
Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);
*/

//////////////////////////////////////
///// Coding Chanllenge #2
/*
1. 使用构造器实现一个Electric Car 叫EV做Car的子类，除了make和speed属性外，加一个battery charge 以%为单位
2. 实现chargeBattery方法，接收chargeTo参数，设置电池电量到chargeTo
3. 实现accelerate方法，将speed提升20，将电量减少1% 打印信息，格式为'Tesla going at 140km/h, with a charge of 22%'
4. 创建一个对象实例，调用accelerate、brake、chargeBattery方法
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.name} going at ${this.speed}`);
};
Car.prototype.broke = function () {
  this.speed -= 5;
  console.log(`${this.name} going at ${this.speed}`);
};

// ①构造器调用父类
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// ②设置子类原型
EV.prototype = Object.create(Car.prototype);
// ③修改构造器指向
EV.prototype.constructor = EV;
// 2.
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const tesla = new EV('Tesla', 140, 23);

console.log(tesla);
tesla.chargeBattery(99);
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.broke();
*/
//////// 基于es6的实现
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
}

class EV extends Car {
  constructor(make, speed, charge) {
    super(make, speed);
    this.charge = charge;
  }
  accelerate() {
    this.speed += 20;
    this.charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h with a charge of ${this.charge}%`
    );
  }
  chargeBattery(chargeTo) {
    this.charge = chargeTo;
  }
}

const tesla = new EV('Tesla', 120, 33);
tesla.chargeBattery(40);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.brake();
*/

/////////////// 类的私有内容
class Person {
  // 私有属性：#开头
  #age;
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
  introduce() {
    this.#desc();
  }
  // 私有方法：#开头
  #desc() {
    console.log(`${this.name} is ${this.#age} years old`);
  }
}

const like = new Person('like', 27);
like.introduce();
// console.log(like.#age); //  Private field '#age' must be declared in an enclosing class
// like.#desc(); //  Private field '#desc' must be declared in an enclosing class
console.dir(Person);
