// https://learn.javascript.ru/promise-chaining

// Вызов `promise.then()` тоже возвращает промис с результатом выполнения, поэтому мы можем вызывать цепочку `.then()` и модифицировать результат в каждом звене.
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
}).then((result) => {
  console.log(result * 2);
  return result * 2;
}).then((result) => {
  console.log(result * 2);
  return result * 2;
});                         // Output: 2    4    (after 1 sec)


// Результатом `.then()` может стать новый промис. В таком случае промис задержит цепочку результатов, до тех пор пока не выполнится.
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
}).then((result) => {
  console.log(result * 2);
  return new Promise(resolve => {
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then((result) => {
  console.log(result * 2);
  return result * 2;
});                         // Output: 2 (after 1 sec)    4 (after 2 sec)



// (!) тут бы пример
// Правильно вызывать `.then()` так, чтобы цепочка не росла вправо.
// Исключение - когда нам нужно использовать переменные из предыдущих звеньев.
// Тогда мы можем вызывать `promise.then()` внутри предыдущего `.then()`   =>   `.then(() => { promise.then() })`


// Главная причина, почему промисы лучше колбэков, это возможность `.then()` всегда возвращать не-промисный результат, при этом чейнить вызовы.
// Так происходит из-за того, что метод `.then()` ничего не возвращает лично через return.
// В него передаются аргументы resolve и reject от ближайшего промиса, которые он запускает, передавая туда результат
Promise.resolve('test')
    .then((data) => {
      console.log(data);                         // Output: 'test'
      return 'жопа';
    })
    .then((data) => {
      console.log(data, typeof data);            // Output: 'жопа' 'string'
    })
    .then(() => {
      return {
        then(resolve) {
          resolve('кек');
        }
      };
    })
    .then((data) => {
      console.log(data, typeof data);            // Output: 'кек' 'string'
    });



// Существуют 'thenable' объекты. Это объекты с методом `then(resolve, reject) {}`.
// Их можно использовать вместо нового промиса, когда мы возвращаем его внутри `.then(() => {...})`
class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    setTimeout(() => {
      resolve(this.num * 2);
    }, 1000);
  }
}

new Promise(resolve => {
  resolve(1);
}).then(result => {
  return new Thenable(result);
}).then(console.log);             // Output: 2 (after 1 sec)



// ---------------------------------------------------------------------------------------------------------------------
// Task 1
// Являются ли фрагменты кода ниже эквивалентными? Другими словами, ведут ли они себя одинаково во всех обстоятельствах, для всех переданных им обработчиков?

// promise.then(f1).catch(f2);

// promise.then(f1, f2);

// Нет, фрагменты не эквивалентны. В первом мы передадим ошибку в catch(), а во втором обрабатываем ошибку в then()