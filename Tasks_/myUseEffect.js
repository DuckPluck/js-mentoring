function myUseEffect(cb, current) {
    return function func(deps) {
        console.log('taking new state:', deps);
        console.log('previous state is:', current);
        let isChanged = false;

        for (let i of Object.keys(deps)) {
            if (deps[i] !== current[i]) {
                current[i] = deps[i];
                isChanged = true;
            }
        }

        if (deps.length < current.length || isChanged) {
            current.length = deps.length;
            cb();
            console.log('New state is:', current);
        }
        console.log('-------------------------------');
    };
}

const memo = myUseEffect(() => console.log('Noticed changes!'), [10, 12]);

memo([10, 12]);             // no changes
memo([10, 13]);             // changed
memo([10, 12, 15]);         // changed
memo([10, 'жопа']);         // changed
memo([15, 10, 15, 'жопа']); // changed
memo([15, 10, 15, 'жопа']); // no changes
memo([15, 10, 'жопа']);      // changed
memo([15, 10]);      // changed

// Можно оптимизировать этот код, если хранить не примитивы, а объекты. Тогда можно будет к каждому value объекта прицепить ключ и сравнивать объекты по ключам.
// Так делает React