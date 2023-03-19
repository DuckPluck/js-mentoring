// https://learn.javascript.ru/while-for

// Циклы используются для многократного повторения блока кода


// `While(condition) {code}`            - Проверяет условие - если истинно, выполняет код
// `do{code} while(condition)`          - Выполняет код, потом проверяет условие - если истинно, выполняет код
// `for(start; condition; step) {code}` - Проверяет условие - если истинно, выполняет код, после делает шаг


// Во время выполнения условие цикла преобразуется в булево значение


// `break` - инструкция - выйти из цикла
// `continue` - инструкция - перейти к след. итерации (не работает с тернарным условием `? :`)

// `break labelName` и `continue labelName` - можно передавать управление на ранее установленную метку `labelName: {}`


jopa:
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {

      if (i > 2 || j > 2) {
        continue jopa;
      }
      console.log(i);                 // Output: 1 1 2 2

    }
  }


// ---------------------------------------------------------------------------------------------------------------------


// // Task 1
// let a = 3;
// while (a) {
//   console.log(a--);   // Output: 3; 2; 1
// }
//
//
// // Task 2
// let b = 0;
// while (++b < 5) {
//   console.log(b);
// }   // Output: 1; 2; 3; 4
//
// let c = 0;
// while (c++ < 5) {
//   console.log(c);
// }   // Output: 1; 2; 3; 4; 5
// console.log(c);                   // Output: 6
//
//
// // Task 3
// for (let i = 0; i < 5; ++i) {
//   console.log(i);
// }   // Output: 0; 1; 2; 3; 4
//
// for (let i = 0; i < 5; i++) {
//   console.log(i);
// }   // Output: 0; 1; 2; 3; 4
//
//
// // Task 4
// for (let i = 2; i <= 10; i++) {
//   if (i % 2 === 0) {
//     console.log(i);
//   }
// }
//    // Output: 2; 4; 6; 8; 10
//
//
// // Task 5
// for (let f = 0; f < 3; f++) {
//   console.log(`number ${f}!`);
// }
//
// let w = 0;
// while (w < 3) {
//   console.log(`number ${w}!`);    // Аналогичный результат
//   w++;
// }



// Task 6
// let num = null;
// do {
//   num = prompt('input num...', '');
// } while (num < 100 && num);
//
//
// // Task 7
// // Выведите все простые числа из интервала от 2 до n
// const n = prompt('input n...', '');
// start:
//     for (let i = 2; i <= n; i++) {
//       for (let j = 2; j < i; j++) {
//         if (i % j === 0) {
//           continue start;
//         }
//       }
//       alert(i)
//     }