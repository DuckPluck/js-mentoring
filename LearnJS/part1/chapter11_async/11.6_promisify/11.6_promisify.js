// https://learn.javascript.ru/promisify

// Промисификация нужна если нам нужно подождать пока функция выполнится, затем выполнить что-то еще после нее

// Промисификация может быть использована на функциях, которые вызывают колбэк только 1 раз.

// Промисификация - преобразование функции, которая принимает колбэк `(err, script) => {...}`, чтобы она возвращала промис.
// Делается так - оборачиваем Функцию в новую функцию, которая возвращает новый промис с исходной Функцией и логикой резолв-реджект
// На примере подгрузки скрипта:
function loadScript(src, callback) {                              // Исходная функция ( loadScript('path/script.js', (err, script) => {...}) )
  const script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error('can\'t load script'));

  document.head.append(script);
}

const loadScriptPromise = function (src) {                        // Промисифицировали ( loadScriptPromise('path/script.js').then(...) )
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      resolve(script);
    })
  });
};



// Чтобы совсем чилить, можно написать функцию, которая будет оборачивать функции во все это дело.
const promisify = function (f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          resolve(manyArgs ? results : results[0]);
        }
      }
      args.push(callback);

      f.call(this, ...args);
    });
  }
}
// loadScript = promisify(loadScript, true);
// loadScript(...).then(arrayOfResults => ..., err => ...);