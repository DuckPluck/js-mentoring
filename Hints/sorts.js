function heapSort(arr) {
    // Построение кучи
    function buildHeap(arr, i, n) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let max = i;
        if (left < n && arr[left] > arr[max]) {
            max = left;
        }
        if (right < n && arr[right] > arr[max]) {
            max = right;
        }
        if (max !== i) {
            swap(arr, i, max);
            buildHeap(arr, max, n);
        }
    }

    // Обмен элементов
    function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Сортировка кучей
    function heapSort(arr) {
        var n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            buildHeap(arr, i, n);
        }
        for (let j = n - 1; j > 0; j--) {
            swap(arr, 0, j);
            buildHeap(arr, 0, j);
        }
        return arr;
    }

    return heapSort(arr);
}

const arr = [5, 2, 6, 1, 3, 8, 4, 7];
console.log(heapSort(arr)); // [1, 2, 3, 4, 5, 6, 7, 8]



function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

const arr2 = [5, 2, 6, 1, 3, 8, 4, 7];
console.log(bubbleSort(arr2)); // [1, 2, 3, 4, 5, 6, 7, 8]