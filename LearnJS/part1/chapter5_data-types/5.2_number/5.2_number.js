// https://learn.javascript.ru/number

// Обычные числа в JavaScript хранятся в 64-битном формате IEEE-754 (граница (2^53-1), иначе infinity)
  // их также называют «числа с плавающей точкой двойной точности» (double precision floating point numbers)
console.log(1e500);    // Output: infinity

// тип данных infinity и NaN - число, есть методы для проверки является ли число infinity или NaN - isFinite() и isNaN()
console.log(isFinite(Infinity));    // Output: false   (Finite - (рус. 'исчисляемое'))
console.log(isNaN(NaN));            // Output: true
// Методы `Number.isNaN()` и `Number.isFinite()` - выполняют ту же функцию, но не преобразуют значение в число перед этим.


// Потеря точности - в js дробные числа имеют погрешность, из-за того, что их трудно записать формате IEEE-754(в двоичной системе).
console.log(0.2 + 0.1 === 0.3);          // Output: false
console.log((0.2 + 0.1).toFixed(20));   // Output: 0.30000000000000004441

// формат IEEE-754 - это 64 бита на число - 11 бит хранят позицию десятичной точки и 1 бит – знак, остальные 52 бита - цифра.
  // из-за этого, если цифре не хватает бит, она ворует их у десятичной точки
console.log(9999999999999999);          // Output: 10000000000000000
  // также из-за такой записи в js два нуля - `0` и `-0`
console.log(0 === -0);                  // Output: true

// В JS можно использовать букву "e", чтобы заменить нули числом
console.log(1000000 === 1e6, 1028000 === 1.028e6, 0.000001 === 1e-6);    // Output: true  true  true

// Шестнадцатеричные числа используются для представления цветов, кодировки символов и др. - `0x...` (регистр не имеет значения)
const xnumber = 0xff;
console.log(xnumber);    // Output: 255

// восьмеричные числа также поддерживаются - `0o...`
// двоичные числа также поддерживаются - `0b...`
// Для других систем счисления - функция parseInt()
let a = 0b11111111;
let b = 0o377; 
console.log( a, b );   // Output: 255  255

// Метод `num.toString(base)` возвращает строку числа num в системе счисления base (от 2 до 36). Без переменный особый синтаксис.
let num = 255;
console.log(num.toString(16), num.toString(2));      // Output: ff  11111111
console.log(123..toString(16), (123).toString(2));   // Output: 7b  1111011

/* Округление - 4 метода:
 * 
 * `Math.floor()` - в меньшую сторону
 * `Math.ceil()` - в большую сторону
 * `Math.round()` - до ближайшего целого
 * `Math.trunc()` - удаление дробной части без округления
 * `toFixed(n)` - *округляет* до n знаков после запятой и возвращает строку 
*/

// Метод `Object.is()` - сравнивает два числа более строго, отличается от `===` следующими примерами:
console.log(Object.is(NaN, NaN));   // Output: true
console.log(Object.is(0, -0));      // Output: false

// Метод parseInt(str, с.счисления) и parseFloat(str) - возвращают из строки все числа, что смогли перевести до встречи символа с ошибкой
  // если нет ни одной цифры - вернут NaN
console.log(parseInt('100px', 16));     // Output: 256  (100 в шеснадцатеричной)
console.log(parseFloat('12.5em'));      // Output: 12.5
console.log(parseInt('12.3'));          // Output: 12
console.log(parseFloat('12.3.4'));      // Output: 12.3

// В Js встроен объект Math, который содержит различные математические функции и константы
console.log(Math.pow(5, 2));             // Output: 25
console.log(Math.random());              // Output: 0.927230064996803
console.log(Math.max(1, 2, 3, 4, 5));    // Output: 5

// ---------------------------------------------------------------------------------------------------------------------


// Task 1
// Создайте скрипт, который запрашивает ввод двух чисел (используйте prompt) и после показывает их сумму.
const num1 = '5';
const num2 = '6';
console.log(+num1 + +num2);

// Task 2
// Почему 6.35.toFixed(1) == 6.3? - потому, что 6.35 хранится как 6.34999999999999964473 и округляется вниз
// Как правильно округлить 6.35 - домножить его на 10 для нивелирования чисел после запятой, округлить и разделить на 10
console.log(1.35.toFixed(1));   // Output: 1.4, тк 
console.log(1.35.toFixed(1));   // Output: 1.4, тк

// Task 3
function readNumber() {
  let num = prompt('enter number', '');
  do {
    num = prompt('enter number', '');
    if (num === null && num === '') {
      return null;
    }
  } while (isFinite(+num) && !isNaN(+num)) 
  return +num;
}

// Task 4
// let i = 0;
// while (i != 10) {
//   i += 0.2;
// }                       // цикл никогда не завершится, потому что 0.2 это 0.20000000000000001110

// Task 5
// Напишите функцию random(min, max), которая генерирует случайное число с плавающей точкой от min до max (но не включая max).
function random(min, max) {
  return Math.random() * (max - min) + min;
}
console.log(random(10, 20));

// Task 6
// Напишите функцию randomInteger(min, max), которая генерирует случайное целое (integer) число от min до max (включительно).
function randomInteger(min, max) {
  return Math.trunc(Math.random() * (max + 0.5 - min + 0.5) + min - 0.5);
}
console.log(randomInteger(1, 3));

