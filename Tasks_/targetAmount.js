// Подсчитайте дубликаты элементов в массиве
const arr = Array.from({length: 100000}).map(() => Math.floor(Math.random() * 100) + 1);
arr.sort((a, b) => a - b);
console.log(`input array is ${arr}`);



// O(n)
const targetAmount = (arr, target) => {
    return `Target ${target} occurs ${arr.filter((num) => num === target).length} times`;
};


// O(log(n))
// const targetAmountOpt = (arr, target) => {
//     let amount = 0;
//     for (let i = arr.indexOf(target); i < arr.length; i++) {
//         if (arr[i] === target) {
//             amount++
//         } else {
//             return amount;
//         }
//     }
// }

// O(log(n))
// const targetAmountOpt = (arr, target) => {
//     return  -arr.indexOf(target) + (arr.length - arr.reverse().indexOf(target));
// }

// O(log(n))
const targetAmountOpt = (arr, target) => {
    let min = 0;
    let max = arr.length - 1;


    while (min <= max) {
        const mid = Math.floor((min + max) / 2);

        if (arr[mid] === target) {
            let amount = 0;

            for (let i = mid; arr[i] === target; i++) {
                amount++;
            }
            for (let i = mid - 1; arr[i] === target; i--) {
                amount++;
            }
            return amount;
        }

        if (arr[mid] < target) {
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }
    return 0;
};

console.time('timer');
// console.log(targetAmount(arr, 5));
// console.log(targetAmountOpt(arr, 5));
console.timeEnd('timer');
