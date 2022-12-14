// Task 1
// Создать псевдомассив из объекта и итерировать его через `for...of`, после вывести все его св-ва типа string в строчку.

const pseudoArr = {
  0: 'hello',
  1: 1,
  2: 'it\'s',
  3: '3',
  4: 4,
  5: 'normal',
  6: 6,
  7: 'array',

  length: 8,

  [Symbol.iterator]() {
    const thisObj = this;
    return {
      current: 0,
      next() {
        return this.current <= thisObj.length - 1 
          ? { done: false, value: this.current++ }
          : { done: true };
      }
    }
  }
};

for (key of pseudoArr) {
  console.log(`key: ${key} value: ${pseudoArr[key]}`);   // Output: -all pseudoArr keys & values-
}


console.log(                                            // Output: [ 'hello', "it's", '3', 'normal', 'array' ]
  Array
      .from(pseudoArr, e => pseudoArr[e])
      .filter(e => typeof e === 'string')
      .join(' ')
);



// Task 2   [Symbol.iterator]
console.log('\n----- Task 2 -----');
// Написать итератор, чтобы выводил рандомные натуральные числа в диапазоне [0..500] и итерировал
// пока не найдет заданное рандомное число (заранее вычисленное по этому же алгоритму и имеющееся в свойстве объекта) и показано перед циклом.
//    Алгоритм вынести в отдельную функцию, чтобы можно было заюзать, как в итераторе, так и в объекте при инициализации.
//    Заюзать разные способы итерации по итератору.
const randomIterator = function () {
  const goal = Math.trunc(Math.random() * 501);
  console.log(`\n----------\n(!) iteration goal: ${goal}`);

  return {
    next() {
      const value = Math.trunc(Math.random() * 501);
      if (value === goal) {
        console.log(`(!) Finally: ${value}`);
        return {done: true};
      } else {
        return {done: false, value};
      }
    },
  };

};

const obj = {};
obj[Symbol.iterator] = randomIterator;


for (num of obj) {
  console.log(`for..of iteration: ${num}`);                 // Output: random numbers until reach goal number
}

const n = obj[Symbol.iterator]();
while (true) {
  const current = n.next();
  if (current.done) { break }
  console.log(`explicit iteration: ${current.value}`);      // Output: random numbers until reach goal number
}

