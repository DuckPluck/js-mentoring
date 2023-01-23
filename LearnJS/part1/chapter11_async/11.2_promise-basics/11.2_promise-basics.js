// https://learn.javascript.ru/promise-basics

// promise это объект, на который можно подписаться для получения результатов, когда они станут доступны.
// `resolve` и `reject` это колбэки промиса, которые js выдает сам. По завершению выполнения промиса вызовется `resolve` (всё ок) или `reject` (ошибка)
// код внутри промиса, выдающий результат (executor). Запускается при создании промиса.
const promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('whoops')), 1000);
});


// У промиса есть состояния: `pending` - ожидание результа (result: undefined);   `fulfilled` - успешное выполнение;    `rejected` - ошибка выполнения
// Промис может изменить состояние только 1 раз. Все последующие ресолвы и реджекты будут проигнорированы.



// Методы `.then()` и `.catch()` используются для подписки на промисы.

// `.then(result, error)` - result это функция, которая выполнится когда промис ресолвнится. error - функция, которая выполнится когда промис реджектнится
promise.then(
    result => console.log(result),
    error => console.log(error),        // Output: -Error: whoops- (after 1 sec)
);

// `.catch(errorHandler)` - выполнит errorHandler, передав в него ошибку, когда промис реджектнится.
promise.catch(console.log);



// `.finally(() => handler)` - выполнит handler в любом случае, когда промис поменяет состояние. Не принимает аргументов (ошибку или успех).
// если finally() возвращает что-то, то это игнорируется.
// promise.finally(() => console.log('finally'));    // Output: 'finally' (after 1 sec)



// У промисов нет концепции 'отмены'

// Промисы существуют после окончания синхронного кода, благодаря тому, что хранятся в контексте, где созданы, даже если на них нет ссылок



// Промисы это микрозадачи, то есть они выполняются раньше макрозадач (setTimeout, setInterval, XHR) при синхронном вызове



// Для того чтобы возвращаемое значение из обработчика попало в обработчик другого промиса
// метод then(func) добавляет к себе в обработчики не просто переданную нами функцию, а обёртку которая вызывает нашу функцию,
// и как функция отработала, то обёртка резольвит возвращенный then'ом ПРОМИС и ставит ему в value возвращенное нашей оригинальной функцией значение.
// Ну а тот промис, как зарезольвился, вызывает свой обработчик(обёртка переданной нами функции),
// тот вытягивает из this.value значение и вызывает нашу функцию, передавая туда это значение.



// ---------------------------------------------------------------------------------------------------------------------
// Task 1
// Что выведет код ниже?
const promise1 = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise1.then(console.log);       // Output: 1



// Task 2
// Встроенная функция setTimeout использует колбэк-функции. Создайте альтернативу, использующую промисы.
// Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен» через ms миллисекунд, так чтобы мы могли добавить к нему .then:
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

delay(3000).then(() => console.log('выполнилось через 3 секунды'));     // Output: 'выполнилось через 3 секунды' (after 3 sec)