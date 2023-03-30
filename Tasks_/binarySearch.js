// Бинарный поиск находит индекс значения, путем многократного деления массива на 2 половины

const arr = Array.from({length: 1000}).map((_, index) => index * 3);


const binarySearchRecursion = (arr, value) => {

    function process(min, max) {
        if (min > max) {
            return -1;
        }
        const mid = Math.floor((min + max) / 2);
        if (arr[mid] === value) {
            return mid;
        }
        if (arr[mid] < value) {
            return process(mid + 1, max);
        } else {
            return process(min, mid - 1);
        }
    }

    return process(0, arr.length - 1);
};

console.log('recursion -', binarySearchRecursion(arr, 15));    // Output: 'recursion -' 5
console.log('recursion -', binarySearchRecursion(arr, 18));    // Output: 'recursion -' 6
console.log('recursion -', binarySearchRecursion(arr, 20));    // Output: 'recursion -' -1
console.log('recursion -', binarySearchRecursion(arr, 21));    // Output: 'recursion -' 7



const binarySearchCycle = (arr, value) => {
    let min = 0;
    let max = arr.length - 1;

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);

        if (arr[mid] === value) {
            return mid;
        }

        if (arr[mid] < value) {
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }
        return -1;
};

console.log('cycle -', binarySearchCycle(arr, 15));    // Output: 'cycle -', 5
console.log('cycle -', binarySearchCycle(arr, 18));    // Output: 'cycle -', 6
console.log('cycle -', binarySearchCycle(arr, 20));    // Output: 'cycle -', -1
console.log('cycle -', binarySearchCycle(arr, 21));    // Output: 'cycle -', 7