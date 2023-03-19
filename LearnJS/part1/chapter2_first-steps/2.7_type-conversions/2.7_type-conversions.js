// https://learn.javascript.ru/type-conversions

// Примитивное преобразование типов происходит с помощью методов приведения

// Строковое преобразование
let example = true;
String(example);         // Output: "true"



// Численное преобразование
let example2 = '123';
Number(example2);        // Output: 123
+example2                // Output: 123 - унарный оператор `+` перед значением выполняет функцию приведения
example2 = example2 - 0; // Output: 123 - Также неявное преобразование происходит при мат. операциях
// Если значение невозможно привести к цифре, выдаст NaN

// проверить NaN ли значение после преобразования в число, позволяет метод isNaN()

// У `Number` есть проверка `Number.isNaN()`, которая не преобразовывает аргумент в число перед проверкой, то есть просто проверяет NaN ли значение
console.log(Number.isNaN('example'), isNaN('example'));   // Output: false true (при преобразования строки с буквами в число выдается NaN)
console.log(Number.isNaN(NaN), isNaN(NaN));               // Output: true true

// Та же логика у метода `.isFinite()` и `Number.isFinite()`



// Логическое преобразование
let example3 = '';
console.log(Boolean(example3));       // Output: false - возвращает true если нет 'falsy' значений
console.log(!!example3);              // То же самое


/*
 * falsy значения (все остальные, которых здесь нет - truthy)
 *
 * false          (Bool)
 * 0              (Number)
 * -0             (Number)
 * NaN            (Number)
 * 0n (0x0n)      (BigInt)
 * '' ("" ``)     (String)
 * null           (null)
 * undefined      (undefined)
 * document.all   (object)
*/