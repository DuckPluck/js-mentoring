// https://learn.javascript.ru/promise-api

// У `Promise` есть 6 статических методов:
/**
 * `Promise.all([iterable])`              - Принимает массив(итерируемый obj) промисов и возвращает новый промис, резолвящийся, когда они все выполнятся.
 *                                          Его результат - массив результатов
 * `Promise.allSettled([iterable])`       - Принимает массив(итерируемый obj) промисов и возвращает новый промис, резолвящийся, когда они все выполнятся.
 *                                          Его результат - массив объектов - пар статус-значение(ошибка) {status: 'blabla', value: 'blabla'}
 * `Promise.race([iterable])`             - Принимает массив(итерируемый obj) промисов и возвращает новый промис, резолвящийся, когда первый из них выполнится.
 *                                          Его результат - результат или ошибка первого промиса
 * `Promise.any([iterable])`              - Принимает массив(итерируемый obj) промисов и возвращает новый промис, резолвящийся, когда первый из них УСПЕШНО выполнится.
 *                                          Его результат - результат или ошибка первого УСПЕШНОГО промиса
 * `Promise.resolve/reject(value/err)`    - Создает уже выполненный/отклоненный промис с результатом `value`. Можно использовать для реализации кеширования.
 */



// === `Promise.all()` ===:
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  new Promise(resolve => setTimeout(() => resolve(2), 1000)),
  3,
]).then(console.log);     // Output: [1, 2, 3] (after 1 sec)

// - Если любой промис в `Promise.all()` завершится ошибкой, то Promise.all() немедленно завершится с этой ошибкой. (не забываем ловить в .catch(err))
// - Очередность результатов в массиве определяется порядком объявления промисов
// - Если добавить в массив не промис, то значение вернется 'как есть'



// === `Promise.allSettled()` ===:
Promise.allSettled([
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('whoops!'), 2000));
    }),
    new Promise(resolve => {
      setTimeout(() => resolve('good'), 2000);
    }),
    'non-promise',
]).then(console.log);     // Output: { status: 'rejected', reason: Error: 'whoops!' }, { status: 'fulfilled', value: 'good' }, { status: 'fulfilled', value: 'non-promise' }

// - Даже если есть ошибки, доделывает до конца.
// - Очередность результатов в массиве определяется порядком объявления промисов
// - Если добавить в массив не промис, то значение вернется в виде пары статус(исполнено)-значение('как есть')



// === `Promise.race()` ===:
Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('second'), 3001);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('third'), 3002);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('first')), 3000);
  }),
]).then(console.log).catch(console.log);     // Output: Error: 'first' (after 3 sec)



// === `Promise.any()` ===:
Promise.any([
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('first')), 4000);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('second'), 4001);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('third'), 4002);
  }),
]).then(console.log);     // Output: 'second' (after 4 sec)

// - Если все промисы будут отклонены, `.catch()` вернет объект AggregateError, содержащий в св-ве `errors` массив всех ошибок



// === Promise.resolve(value) ===:
Promise.resolve('resolved!').then(console.log);         // Output: 'resolved'


// === Promise.reject(error) ===:
Promise.reject(new Error('rejected!')).catch(console.log)     // Output: Error: 'rejected!'