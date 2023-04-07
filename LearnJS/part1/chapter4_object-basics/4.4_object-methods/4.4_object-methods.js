// https://learn.javascript.ru/object-methods
'use strict'

// У объекта есть методы типа `Object.getPropertyValue()` а есть типа `.toString()` - первых нет в прототипе объекта, они вызываются заимствованием у конструктора объекта

// Функцию, которая является свойством объекта, называют методом этого объекта.
  const example = {
    method() {console.log('hello world')}
  };
  example.method()


// `this` - динамическая ссылка на родительский объект метода. (работает только с синтаксисом через . и [])
  const example2 = {
    a: 1,
    b: 2,
    thisExample() { console.log(this.a + this.b)},
  };
  example2.thisExample()


// `this` на стрелочных функциях выдает родительский эл-т функции выше:
  const example3arr = {
    thisExampleArr() { 
      const arrow = () => {console.log(this)};  // Ссылается на 23 строку
      arrow();
    },
  };
  example3arr.thisExampleArr();

  const example3 = {
    key: 'test',
    thisExample() { 
      function func() {console.log(this)}  // Ссылается на undefined (или global obj)
      func();
    },
  };
  example3.thisExample();

// ---------------------------------------------------------------------------------------------------------------------


// // Task 1
// function makeUser() {
//   return {
//     name: "John",
//     ref: this
//   };
// }
// let user = makeUser();
// console.log( user.ref.name );   // Output: Error (ref не объявлен как метод. В user.ref лежит undefined, тк это значение принимает this в функции)


// // Task 2
// const calculator = {
//   read(a, b) {
//     this.a = a;
//     this.b = b;
//   },

//   sum() {
//     return this.a + this.b
//   },
  
//   mul() {
//     return this.a * this.b}
//     ,
// };
// calculator.read(2, 3);
// console.log(calculator.sum(), calculator.mul());


// Task 3
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // показывает текущую ступеньку
    console.log( this.step );
    return this;
  }
};
ladder.up().up().down().showStep().down().showStep();

