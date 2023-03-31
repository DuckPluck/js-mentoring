// Найдите квадратный корень положительного числа с помощью бинарного поиска.
// Если число не полный квадрат, то верните половину его квадратного корня.

const binarySqrt = (value) => {
    let min = 0;
    let max = value;

    while (min <= max) {
        const mid = Math.floor((max + min) / 2 );

        if (mid * mid === value) {
            return mid;
        }

        if (min === max) {
            return mid * mid > value ? min - 1 : min;
        }

        if (mid * mid < value) {
            min = mid + 1;
        } else {
            max = mid - 1;
        }

        if (min > max) {
            return mid - 1;
        }


    }
    return -1;
}


console.log(binarySqrt(12));    // Output: 3
console.log(binarySqrt(11));    // Output: 3
console.log(binarySqrt(10));    // Output: 3
console.log(binarySqrt(19));    // Output: 4
console.log(binarySqrt(16));    // Output: 4
console.log(binarySqrt(20));    // Output: 4
console.log(binarySqrt(21));    // Output: 4
console.log(binarySqrt(624));    // Output: 24


