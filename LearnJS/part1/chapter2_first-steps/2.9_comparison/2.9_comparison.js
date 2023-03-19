// https://learn.javascript.ru/comparison

/*
 * Операторы сравнения js
 * 
 * `>`, `<` - Больше/меньше
 * `>=`, `<=` - Больше/меньше или равно
 * `==` - Равно
 * `===` - Строго равно (типы не приводятся)
 * `!=` - Не равно
 * `!==` - Строго не равно (типы не приводятся)
*/

// При сравнении (`==`) значений разных типов JavaScript приводит каждое из них к числу. Это не относится к строгому сравнению ('===')
console.log(
    '1' == true,     // Output: true
    '2' >= true,     // Output: true
);

// При сравнении строк сравниваются ascii коды их букв слева-направо
console.log(
    'abcd' > 'Abcd',   // Output: true   (заглавные в ascii стоят раньше, чем строчные)
    'abcd' < 'acde'    // Output: true
);

// При сравнении объектов возвращается true только если ссылка переменных на значение одинакова (ведет на один и тот же объект)
const a = {};
const b = a;
console.log(
    {} == {},         // Output: false
    a == b,           // Output: true
);

// NaN возвращает false при любых сравнениях ( исключение Object.is() )
console.log(
    NaN === NaN,        // Output: false
    NaN >= NaN,         // Output: false
);

// null нестрого равен только undefined и null!
console.log(
    null == undefined,   // Output: true
    null === undefined,  // Output: false
    null == 0,           // Output: false
    null == null         // Output: true
);

// При исп. других операторов сравнения (`< > <= >=`)  -  null -> 0, а undefined -> NaN
console.log(
    null >= 0,          // Output: true
    null <= 0,          // Output: true
    undefined >= 0,     // Output: false
    undefined <= 0,     // Output: false
);

// ---------------------------------------------------------------------------------------------------------------------


// Task 1
console.log(
    5 > 4,                 // Output: true
    "ананас" > "яблоко",   // Output: false
    "2" > "12",            // Output: true
    undefined == null,     // Output: true
    undefined === null,    // Output: false
    null == "\n0\n",       // Output: false
    null === +"\n0\n",     // Output: false
    null === {},           // Output: false
    '' == {},              // Output: false
    0 == {},               // Output: false
    ({} == {}),            // Output: false
    false == 0,            // Output: true
    false == null,         // Output: false
    true > +"\n0\n",       // Output: true
);
