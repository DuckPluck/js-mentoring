// Задачи - https://webdevblog.ru/7-voprosov-dlya-sobesedovaniya-o-zamykanie-v-javascript-smozhete-li-vy-na-nih-otvetit/
// Задачи - https://habr.com/ru/company/ruvds/blog/340194/
// Задачи (для разогрева) - https://youtu.be/evBCOVv8lUI?t=2434


// =========== Теория ===========
let x = 10;
function foo() {
  console.log(x);
}
function bar() {
  let x = 20;
  foo();           // Output: 10 (тк область видимости где создана, а не где вызвана функция)
}
bar();
// Замыкание - функция, которая может получить доступ к тому контексту(переменным), где она создана.

// (!) При каждом выполнении функции создается новое лексическое окружение, ссылающееся на родительский эл-т
// Лексическое окружение (LexicalEnvironment) - недоступный объект, который содержит информацию о конкретной функции\блоке\скрипте, состоит из:
// 1. Environment Record - объект, в котором хранятся локальные переменные и некоторая информация типа this
// 2. [[Environment]] - Когда создается функция, она получает ссылку на внешнее лексическое окружение.
// [[Environment]] не меняется (в отличие от this) и обеспечивает достижимость родительского эл-та, пока внутренняя функция жива.


// Лексическое окружение цикла for работает уникально и отличается от других циклов:
// каждую итерацию лексическое окр. новое, то есть пересоздается в новом окружении со след. значением - уникальна каждый шаг
const arr10 = [];
for (let i = 0; i < 10; i++) {

  const foo = function () {
    console.log(`for: ${i}`);
  };

  arr10.push(foo);
}
arr10[5]();       // Output: for: 5
arr10[9]();       // Output: for: 9


// то же самое, только с циклом while:
const arr11 = [];
let i = 0;
while (i < 10) {

  const foo = function () {
    console.log(`while: ${i}`);
  };

  arr11.push(foo);
  i++;
}
arr11[5]();       // Output: while: 10
arr11[9]();       // Output: while: 10


// Конструктор через замыкание - используется для тех же целей, что и функция конструктор (создает объект с вложенной логикой),
// но обеспечивает инкапсуляцию переменных (то есть доступ к ним есть только у созданной функции)
// обычный конструктор через this, new:
function Constructor() {
  this.name = 'pupa';
  this.getName = function () {
    return this.name;
  };
}
const foo5 = new Constructor();
console.log(
    foo5.getName(),    // Output: 'pupa'
    foo5.name,         // Output: 'pupa'
);

// конструктор через замыкание:
function closureConstructor() {
  const name = 'lupa';
  return {
    getName() {return name}
  };
}
const foo6 = closureConstructor();
console.log(
    foo6.getName(),     // Output: 'lupa'
    foo6.name,          // Output: 'undefined'
);

// Обычный конструктор функции имеет динамическую ссылку this, которая позволяет созданным экземплярам ссылаться на себя.
// У конструктора через замыкания нет this, зато можно создать динамическую ссылку на функцию с помощью синтаксиса Named Function Expression (NFE)

// `Named Function Expression (NFE)` - синтаксис для динамического 'ссылания' функции на себя (this в мире функций).
let foo7 = function (name) {
  return name ? `name is: ${name}` : foo7('guest');
}
const foo8 = foo7;
foo7 = null;
// console.log(foo8());      // TypeError: foo7 is not a function

let foo77 = function func(name) {
  return name ? `name is: ${name}` : func('guest');
}
const foo88 = foo77;
foo77 = null;
console.log(foo88());      // Output: 'name is: guest'
//                                                            Не работает с Function Declaration.


// =========== Задачи ===========
// (не надо говорить ответы, надо 'давайте разбираться' чтобы все сами додумались, а потом резюмировать)

// Вот эту можно двумя частями преподнести:
// // 1. Что будет в консоли?
// let jopa = 1;
// function foo1() {
//   console.log(jopa);
// }
// function foo2() {
//   let jopa = 2;
//   foo1();
// }
// foo2();
// // Ответ: 1, тк функция замыкается на том, что окружает ее во время ее рождения (объявления).


// // 2. Что будет в консоли?    (вариация 2: перенести объявление foo22 внутрь foo11 Ответ: 1 2 2 - замыкание теперь на локальной a)
// function foo22() {
//   console.log(a);
// }
// function foo11() {
//   var a = 2;
//   console.log(a);
//   foo22();
// }
// var a = 1;
// console.log(a);
// foo11();
// // Ответ: 1 2 1 - log в начале => локальная a => замыкание на а


// // 3. Какая из этих трех функций является замыканием и использует переменные из внешней области видимости?
// // 1)
// let countClicks = 0;
// (function clickHandler() {
//   countClicks++;
// })()
//
// // 2)
// const result = (function immediate(number) {
//   const message = `number is: ${number}`;
//   return message;
// })(100);
//
// // 3)
// setTimeout(function delayedReload() {
//   globalThis.reload();
// }, 1000);
// // Ответ: 1 - создает замыкание с переменной countClicks из внешней области;
// // 2 - не является замыканием, тк не имеет доступа ни к каким внешним переменным;
// // 3 - создает замыкание глобальным св-вом


// // 4. Что будет в консоли? Будет ли работать замыкание на переменных стрелочной функции?
// let arrowCounter = 0;
// const arrowFoo = () => {
//   let arrowCounter = 10;
//
//   (function foo8 () {
//     console.log('arrow: ' + arrowCounter++);
//   })();
//
// };
// arrowFoo();
// // Ответ: 11. Да, будет, у стрелочной функции, как и у всех других есть лексическое окружение


// // 5. Что будет в консоли?
// (function fooA(a) {
//   return (function fooB(b) {
//     console.log(a);
//   })(1);
// })(0);
// // Ответ: 0 - цель задачи запутать, b нигде не используется


// // 6. Что будет в консоли?
// let count = 0;
// (function immediate() {
//   if (count === 0) {
//     let count = 1;
//     console.log(count);
//   }
//   console.log(count);
// })();
// // Ответ: 1 0 - чему принадлежит локальная count? какая область видимости у let? -
// // в области видимости if создается локальная переменная count, далее в функции вызывается замыкание на глобальную count


// // 7. Что будет в консоли?
// const arr = ['🥑', '☎️', '🎨', '🐴'];
// for (var i = 0; i < arr.length; i++) {
//   setTimeout(function() {
//     console.log('Index: ' + i + ', element: ' + arr[i]);
//   }, 3000);
// }
// // Ответ: 'Index: 4, element: undefined'; 'Index: 4, element: undefined'; 'Index: 4, element: undefined'; 'Index: 4, element: undefined';
// // setTimeout выполняется после всех итераций цикла и создает замыкание с переменной i, которая равна 4.
// // каждую итерацию мы получаем новое лексическое окружение, но из-за того, что var имеет функциональную область видимости,
// // каждую итерацию мы получаем ссылку на одну и ту же переменную var


// // 8. Что будет в консоли?
// function createIncrement() {
//   let count = 0;
//
//   function increment() {
//     count++;
//   }
//
//   let message = `Count is ${count}`;
//   function log() {
//     console.log(message);
//   }
//
//   return [increment, log];
// }
// const [increment, log] = createIncrement();
// increment();
// increment();
// increment();
// log();
// // Ответ: 0 - тк message присваивается нулевой count, далее count повышается, но message уже объявлена
