// https://learn.javascript.ru/var

// var лучше не использовать.


// В отличие от let и const, var имеет особую область видимости - ее ограничивают только тела функции. (даже `if (false) {var}` не спрячет этого психа)
if (true) {
  const localeNum = 1;
  var globalNum = 2;
}
// console.log(localeNum);     // ReferenceError: localeNum is not defined
console.log(globalNum);        // Output: 2



// в отличие от let и const, var можно повторно объявлять (синтаксис 'var' будет игнорироваться)
let singleNum = 1;
// let singleNum = 2;          // SyntaxError: Identifier 'singleNum' has already been declared
var repeatedNum = 1;
var repeatedNum = 2;
var repeatedNum;
console.log(repeatedNum);      // Output: 2



// в отличие от let и const, var объявляется в самом начале объявления функции (Function Declaration в мире переменных)
// явление называется «hoisting» (всплытие, поднятие)
function sayHi() {
  phrase = "Привет";
  console.log(phrase);
  if (false) {
    var phrase;
  }
}
sayHi();                  // Output: 'Привет'


// Затрагивая var необходимо держать в голове временную мертвую зону - ВМЗ (Temporal Dead Zone - tdz)
// var всплывает, но только ее объявление. Не присваивание значения. (То есть всплывшая var, до того как исполнение дойдет до строчки присваивания, равна undefined)
(function immediate() {
  if (count === 0) {                 // Не выполнится, тк сейчас count === undefined
    var count = 1;
    console.log(count);
  }
  console.log(count);                // Тк строчка присваивания (42 стрк) недостижима, tdz растянулось на всю функцию (count так и осталась undefined)
})();