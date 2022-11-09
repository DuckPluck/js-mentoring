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

// При сравнении значений разных типов JavaScript приводит каждое из них к числу.

// NaN возвращает false при любых сравнениях
NaN === NaN         // Output: false

// null равен только undefined!
null == undefined   // Output: true
null === undefined  // Output: false
null == 0           // Output: false
// При исп. других операторов сравнения (`< > <= >=`)  -  null => 0, а undefined => NaN


// Task 1
5 > 4                 // Output: true
"ананас" > "яблоко"   // Output: false
"2" > "12"            // Output: true
undefined == null     // Output: true
undefined === null    // Output: false
null == "\n0\n"       // Output: false
null === +"\n0\n"     // Output: false
null === {}           // Output: false
'' == {}              // Output: false
0 == {};               // Output: false
({} == {})              // Output: false
false == 0            // Output: true
false == null         // Output: false
true > +"\n0\n"       // Output: true