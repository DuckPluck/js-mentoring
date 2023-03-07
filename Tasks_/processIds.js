const processIds = [1, '2-two', 3, '4-banana', 5];

const delay = (wait) => new Promise((resolve) => setTimeout(resolve, wait));

const getRandom = () => Math.random() * 1000;

const runProcessById = async (id) => {
  const wait = getRandom();
  await delay(wait);
  console.log(id);
};

/* ============================================================
Есть вышестоящий код, который менять нельзя.
Должно вывести:
 *  --Start--
 *  1
 *  '2-two'
 *  3
 *  '4-banana'
 *  5
 * '--Finish--'
====================================================================*/

(async () => {
  for (let id in processIds) {
    await runProcessById(processIds[id]);
  }
})();

// Код не выводит в нужном порядке. Почему ? Напишите свое решение этой задачи