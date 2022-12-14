// https://learn.javascript.ru/optional-chaining
const user = {};

// Опциональная цепочка `?.` и `?[]` останавливает вычисление и возвращает undefined, если значение перед `?` равно undefined или null.
// Это необходимо, если при обращении к эл-ту какие-либо св-ва в цепочке могут отсутствовать

// НО! если переменная user вообще не объявлена, то `user?.anything` приведёт к ошибке
// example?.anything     // ReferenceError: example is not defined

// Cинтаксис можно использовать при вызове функций, которые могут не существовать 
// Если вместо функции попадется другой тип данных, НЕ отфильтрует его
user.admin.method?.()

// При удалении
delete user?.name;    // (удалить имя, если существует)

// НО! Перезаписывать с таким синтаксисом нельзя
// user?.name = 'error'  // err - Invalid left-hand side in assignment

