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
  console.log(`key: ${key} value: ${pseudoArr[key]}`)   // Output: -all pseudoArr keys & values-
}


console.log(                                            // Output: [ 'hello', "it's", '3', 'normal', 'array' ]
  Array
      .from(pseudoArr, e => pseudoArr[e])
      .filter(e => typeof e === 'string')
);