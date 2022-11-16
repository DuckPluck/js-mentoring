// https://learn.javascript.ru/iterable

// Итерируемые объекты – это объекты, которые реализуют метод '[Symbol.iterator]' (пример строка)
// Псевдомассивы – это объекты, у которых есть индексы(0,1,2,3...) и свойство length, то есть, они выглядят как массивы (пр. строка)


// Сущности, которые можно использовать в for...of называются итерируемыми
  // Это объекты, массивы, строки со св-вом `[Symbol.iterator]`
    // проверить наличие можно - `Object.getOwnPropetySymbol()`

// В итерируемые объекты он встроен заранее (можно изменить логику), в неитерируемые мы можем добавить его логику:
  // Сначала for...of вызывает `[Symbol.iterator]`, потом обращается к тому, что он вернет, и циклично вызывает там `.next()`
    // `.next()` возвращает объект с done и value. Если вернется done: true, цикл завершится.
const obj = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {


    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return {done: false, value: this.current++};
        }
          return {done: true};
      }
    }


  }
};
for (key of obj) {
  console.log(key);   // Output: 1 2 3 4 5
}



// Для получения более чем одного итериратора, можно использовать `for...of` с деструктуризацией:
for ([key, value] of Object.entries(obj)) {
  console.log(key, value);                    // Output: from 1   to 5
}



// `for...of` в строке перебирает символы (встроен заранее в конструкторе-оболочке)
const str = '😀😂🤩😌😈😬😭🥴🤬🤠😡🤩🥺';
for (ch of str) {
  console.log(ch);  // Output: 😀 😂 🤩 😌 😈 😬 😭 🥴 🤬 🤠 😡 🤩 🥺
}



// Явный вызов итератора - мы можем пользоваться методом `.next()` вручную
const iterator = obj[Symbol.iterator]()
while (true) {
  let current = iterator.next();
  if (current.done) { break }
  console.log(current);
}



// Чтобы сделать из псевдомассива или итерируемого объекта массив (для доступа к методам массива) - 
  // `Array.from(obj[, mapFn, thisArg])` - `mapFn` позволяет трансформировать эл-ты колбэком, `thisArg` позволяет забиндить this для `mapFn`
    // Принцип работы метода:
    let from = '123';
    let result = [];
    for (let c of from) {
      result.push(c);
    }
    console.log(result);