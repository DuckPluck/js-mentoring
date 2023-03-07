// https://learn.javascript.ru/string

// Строку можно записать через '', "", ``. У обратных кавычек есть преимущества - можно обращаться к переменным `${}` и писать в несколько строк

// Шаблонная функция - func`string`, это автоматически вызываемая функция, которая получает аргументом строку со всеми ее переменными - теговый шаблон

/* 
 * Спецсимволы для строк
 * 
 * `\n` -	Перевод строки
 * `\'`, `\"` -	Кавычки
 * `\\`	- Обратный слеш
 * `\t` -	Знак табуляции
*/

// У строки есть св-во length
console.log('hello'.length)

// Для доступа к символам используется [], как у массивов или метод charAt(index)
  // Разница в том, что при отсутствии символа, [] вернёт undefined, а charAt — пустую строку
console.log( 'hello'[1000] );         // Output: undefined
console.log( 'hello'.charAt(1000) );  // Output: '' (пустая строка)

// можно перебрать строку используя for..of
for (let char of "Hello") {
  console.log(char);          // Output: 'H','e','l','l','o'
}

// Содержимое строки в JavaScript нельзя переписать
let example = 'hello';
example[3] = '5';
console.log(example);         // Output: 'hello'

// Методы toLowerCase() и toUpperCase() меняют регистр символов
console.log( 'Interface'.toUpperCase() );   // Output: INTERFACE
console.log( 'Interface'.toLowerCase() );   // Output: interface


// === поиск/проверка индекса ===
// Можно искать индекс конкретного порядка символов в строке - `str.indexOf(substr, pos)` - substr - что искать, pos - начиная с какого индекса
  // Возвращает -1 если нет совпадений, либо индекс первой буквы найденной подстроки
  let str = 'Widget with id';
  console.log( str.indexOf('get') );     // Output: 3
  console.log( str.indexOf('jopa') );    // Output: -1
// str.lastIndexOf(substr, position) делает тоже самое, только с конца строки

// Трюк с побитовым НЕ - при использовании `~` для 32-разрядных целых чисел (до ~2e9 - млрд) значение ~n равно -(n+1)
console.log(~-2, ~-1, ~-0, ~0, ~1, ~2);  // Output: 1 0 -1 -1 -2 -3
// тк 0 выводится только при -1, это позволяет сократить проверку: с `if (str.indexOf("Widget") != -1) {}` => `if (~str.indexOf("Widget")) {}`
  // НО! это не работает для больших чисел (после ~2e9) !!!


// Можно проверять наличие подстроки - `str.includes(substr, pos)` - работает также, но возвращает логическое значение
console.log( 'My dick'.includes('big') );    // Output: false

// У этого метода есть младшие -  `str.startsWith()` и `str.endsWith()` - проверяют начинается/заканчивается ли строка конкретными символами (чувствительны к регистру)
console.log( 'My dick'.startsWith('My d') );
console.log( 'My dick'.endsWith('y dick') );



// === извлечение подстроки ===
// `str.slice(start [, end])` - возвращает часть строки от start до (не включая) end. (-1 считает с конца)
console.log('deep end'.slice(3, 7));  // Output: 'p en'
console.log('esketit'.slice(0, -1));  // Output: 'esketi'

// `str.substring(start [, end])` - клон предыдущей, различие в том, что нет разницы между start и end, и обнуляет минусовые значения
console.log('deep end'.substring(7, 3));  // Output: 'p en'
console.log('esketit'.substring(3, -1));  // Output: 'esk'

// `str.substr(start [, length])` - делает тоже, что и первый, но с длиной, (-1 считает с конца)
console.log('deep end'.substr(1, 5));  // Output: 'eep e'
console.log('esketit'.substr(-5, 5));  // Output: 'ketit'



// === сравнение строк ===
// Строки сравниваются посимвольно в порядке ascii (UTF-16)
  // Строчные больше заглавных
console.log('a' > 'A');                   // Output: true

  // Буквы с диакретичискими знаками идут не по порядку
console.log('Österreich' > 'Zealand');    // Output: false

// Можно получить код буквы - str.codePointAt(pos)   pos - позиция символа
console.log('Österreich'.codePointAt(0), 'Zealand'.codePointAt(0));     // Output: 214 90

// Можно получить букву из кода - String.fromCodePoint(code)
console.log(String.fromCodePoint(214));                                 // Output: 'Ö'

// Для наиболее точного сравнения - `str.localeCompare(str2, locale?, options)` - если str больше, возвращает 1, если равно - 0, иначе -1
  // locale позволяет выбрать алфавит для сравнения, options уточняет регистр и диакретичиские знаки
console.log('esketit' < 'flex');                  // Output: false 
console.log('esketit'.localeCompare('flex'));     // Output: -1

// ---------------------------------------------------------------------------------------------------------------------


// Task 1
// Сделать первый символ заглавным
const ucFirst = function(str) {
  return str[0].toUpperCase() + str.slice(1);
};
console.log(ucFirst('hola'));     // Output: 'Hola'


// Task 2
function checkSpam(str) {
  return (str.toLowerCase().includes('viagra') || str.toLowerCase().includes('xxx'))
}
console.log(checkSpam('xxxxxxX'), checkSpam('holviagra'), checkSpam('not spam'));    // Output: true true false


// Task 3
// Создайте функцию, которая проверяет длину строки str и, если она превосходит maxlength, заменяет конец str на "…"
const truncate = (str, maxlength) => {
  return str.length < maxlength
      ? str
      : str.slice(0, maxlength - 3) + '...'
};
console.log(truncate('hello its a long string', 10).length);    // Output: 10 ('hello i...')


// Task 4
// Создайте функцию, которая будет выделять числовое значение и возвращать его.
const extractCurrencyValue = function(str) {
  return str.replace(/\D/g, '');
};
console.log(extractCurrencyValue('$420'), extractCurrencyValue('it\'s ultra regExp fl3x 666'));   // Output: 420 3666