// Найдите квадратный корень положительного числа с помощью бинарного поиска.
// Если число не полный квадрат, то верните половину его квадратного корня.

const binarySqrt = (value) => {
    let min = 0;
    let max = Math.floor(value / 2);

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);

        if (mid * mid === value) {
            return mid;
        }

        if (mid * mid < value) {
            min = mid + 1;
        } else {
            max = mid - 1;
        }

        if (min > max) {
            return mid - 1;
        }

        if (min === max) {
            return max;
        }
    }
    return -1;
}

console.log(binarySqrt(12));
console.log(binarySqrt(16));