// https://learn.javascript.ru/types

/* 
 * Есть восемь основных типов данных в JavaScript (object не примитивный)
 * 1. number
 * 2. bigint
 * 3. string
 * 4. bool
 * 5. null
 * 6. undefined
 * 7. symbol
 * 
 * 8. object
 */ 

// js «динамически типизирован». Это значит, что в переменную может быть записан любой тип данных
// Оператор `typeof` возвращает тип(с оговорками) аргумента

typeof 123.456;                 // number. Также сюда относятся «специальные числовые значения»: `Infinity`, `-Infinity` и `NaN`
typeof 9007199254740992n;       // bigint Для чисел за пределами ±(253-1, 9e15 9 квадриллионов), всегда `n` в конце
typeof `example ${1 + 2}`;      // string. В примере строка с динамической вставкой переменной
typeof 4 > 1;                   // bool. `true` или `false`
typeof null;                    // null. Специальный тип 'ничего' (`typeof` врет что это object(!))
typeof undefined;               // undefined. Специальный тип 'значение не было присвоено'
typeof Symbol("id");   // symbol. Для уникальных идентификаторов.
typeof Math;                    // object. Создается из примитивных типов
typeof function lel(){return 0} // function
// ---------------------------------------------------------------------------------------------------------------------


// Task 1
let name = "Ilya";
// alert( `hello ${1}` );      // Output: hello 1
// alert( `hello ${"name"}` ); // Output: hello name
// alert( `hello ${name}` );   // Output: hello Ilya