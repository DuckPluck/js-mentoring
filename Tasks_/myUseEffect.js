function myUseEffect(cb, current) {
  return function func(deps) {
    console.log('taking new state:', deps);
    console.log('previous state is:', current);
    let changes = [];

    for (let i of Object.keys(deps)) {
      if (deps[i] !== current[i]) {
        changes.push([i, deps[i]]);
        current[i] = deps[i];
      }
    }

    if (deps.length < current.length) {
      current.length = deps.length;
    }

    if (changes.length) {
      console.log('New state is:', current);
      cb(changes);
    } else {
      console.log('no changes');
    }
    console.log('-------------------------------');
  };
}

const memo = myUseEffect((changes) => console.log('Noticed change at [[index, value]]:', changes), [10, 12]);

memo([10, 12]);             // no changes
memo([10, 13]);             // changed
memo([10, 12, 15]);         // changed
memo([10, 'жопа']);         // changed
memo([15, 10, 15, 'жопа']); // changed
memo([15, 10, 15, 'жопа']); // no changes
memo([15, 1, 'жопа']);      // changed

// Можно оптимизировать этот код, если хранить не примитивы, а объекты. Тогда можно будет к каждому value объекта прицепить ключ и сравнивать объекты по ключам.
// Так делает React