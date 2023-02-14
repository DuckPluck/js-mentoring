// TODO Решить задачу
// Task 1
// [Главы 9, 11]
// 1. реализовать Promise.myAny
// 2. реализовать метод Promise.myAll
// 3. реализовать Promise.anyResolved - реждектимся, только если все зареджектились, а ресолвимся, если любой заресолвился.

// anyResolved будет отличаться от any тем, что принимает доп. аргумент - количество промисов, после которых ресолвится.
// Например, если кинуть ему 3, то будет ждать 3 заресолвивишихся и потом сразу сам заресолвит, а если 3 не получится - реджектит.
// Нужно сделать оптимально, чтоб когда уже 100% не хватит оставшихся промисов для ресолва, не ждать их, а сразу реджектить.


const promiseMaker = function (msg, ms = 1000, switcher = true) {
  if (switcher) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(msg);
      }, ms);
    });
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(msg));
    }, ms);
  });

};


Promise.myAny = async function ([...args]) {
  return args;
};

const promise1 = promiseMaker('resolved1', 1001);
const promise2 = promiseMaker('resolved2', 1000);
const promise3 = promiseMaker('resolved3', 1002);

Promise.myAny([promise1, promise2, promise3]);