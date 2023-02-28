// Task 1
// Покурить разницу между `.then(f1, f2)` и `.then(f1).catch(f2)`

const promiseMaker = function (switcher = 1) {
  if (switcher) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('rejected'));
    }, 1000);
  });

};


// promiseMaker(0).then(() => {
//   console.log('.then(f1, f2) => resolved');
// }, () => {
//   console.log('.then(f1, f2) => rejected');
// }).then(() => {
//   console.log('.then(f1, f2) => resolved');
// }, () => {
//   console.log('.then(f1, f2) => rejected');
// });
//
//
// promiseMaker(0).then(() => {
//   console.log('.then(f1).catch(f2) => resolved');
// }).catch(() => {
//   console.log('.then(f1).catch(f2) => rejected');
// }).then(() => {
//   console.log('.then(f1).catch(f2) => resolved');
// }).catch(() => {
//   console.log('.then(f1).catch(f2) => rejected');
// });

/**
 * Output:
 * .then(f1, f2) => rejected
 * .then(f1, f2) => resolved
 * .then(f1).catch(f2) => rejected
 * .then(f1).catch(f2) => resolved
 */
// Фрагменты не эквивалентны. В первом мы передадим ошибку в `then()`, а во втором обрабатываем ошибку в `catch()`, в остальном работают идентично



// Task 2
// Покурить отличия вложенных промисов и чейнящихся
// promiseMaker().then(() => {
//   console.log('1 resolved');
//   promiseMaker().then(() => {
//     console.log('2 resolved');
//     promiseMaker().then(() => {
//       console.log('3 resolved');
//     });
//   });
// });
//
// promiseMaker().then(() => {
//   console.log('1 resolved!');
//   return 'ъ'
// }).then(() => {
//   console.log('2 resolved!');
//   return promiseMaker();
// }).then(() => {
//   console.log('3 resolved!');
// })



// Task 3
// Что будет в консоли? Почему?
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('Rejected!');
//     reject('rejected!!!!!');
//     console.log('rejected again');
//   }, 10);
// });
//
// setTimeout(() => {
//   console.log('timeout 0');
// }, 0);
// promise.then(
//     () => console.log('1 resolved'),
//     () => console.log('1 rejected'),
// ).then(
//     () => console.log('2 resolved'),
//     () => console.log('2 rejected'),
// ).then(
//     () => console.log('3 resolved'),
//     () => console.log('3 rejected'),
// );
//
// promise.then(
//     () => console.log('4 resolved'),
//     () => console.log('4 rejected'),
// ).then(
//     () => console.log('5 resolved'),
//     () => console.log('5 rejected'),
// );
//
// promise.then(
//     () => console.log('6 resolved'),
//     () => console.log('6 rejected'),
// );                                    // Синхронщина вложена, так что сначала выводится первая асинхронщина - таймаут 0
                                      // Далее выводятся синхронные логи в промисе,
                                      // Затем реджектятся сверху-вниз все первые в цепочках `.then()`, тк по истечению таймаута вызывается `reject()`
                                      // После чего ресолвятся все вторые в цепочках `.then()`, тк реджектов больше нет, затем третий `.then()`
/*
 * Output:
 *
 * 'timeout 0'
 * 'Rejected!'
 * 'rejected again'
 * '1 rejected'
 * '4 rejected'
 * '6 rejected'
 * '2 resolved'
 * '5 resolved'
 * '3 resolved'
 */



// Task 4
// Что будет в консоли? Почему?
setTimeout(() => console.log('Timeout 1'), 0);
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => setTimeout(() => console.log('Timeout 2'), 0));
Promise.resolve().then(() => console.log('Promise 2'));
setTimeout(() => console.log('Timeout 3'), 0);
console.log('Aboba');
                                                // Сначала выполнится асинхронщина, затем промисы, тк это микротаски
                                                // После выполнятся таймауты, тк на этом уровне вложенности больше нет микротаск
                                                // В конце выполнится вложенный таймаут

/*
 * Output:
 *
 * 'Aboba'
 * 'Promise 1'
 * 'Promise 2'
 * 'Timeout 1'
 * 'Timeout 3'
 * 'Timeout 2'
 */