// https://learn.javascript.ru/date

// Лучше использовать api - day.js, moment.js
// Intl.dateTimeFormat() - интернациональный конструктор для форматирования даты (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)



// Date(year, month, date?, hours?, minutes?, seconds?, ms?) создает структуру данных для работы с датой и временем
const now = new Date();
console.log(now);       // Output: 2022-11-24T18:02:58.406Z


// Если передать в Date число (timestamp), он воспримет его как миллисекунды с 1 января 1970 года UTC+0
let date1 = new Date(100000000000000);
console.log(date1);                        // Output: 5138-11-16T09:46:40.000Z  (16.11.5138, 12:46:40)
date1 = new Date(24 * 3600 * 1000);
console.log(date1);                        // Output: 1970-01-02T00:00:00.000Z  (02.01.1970, 03:00:00)
date1 = new Date(-100000000000000);
console.log(date1);                        // Output: -001199-02-15T14:13:20.000Z  (15.02.1200, 16:43:37)

// Метод `date.getTime()` вернет timestamp из любой даты. То же самое сделает преобразование в число
console.log(now.getTime());       // Output: 1669338770345
console.log(+now);                // Output: 1669338770345

// Метод `Date.now()` быстро вернет timestamp текущего времени, не создавая отдельный объект Date (используется для замера времени)
console.log(Date.now());          // Output: 1669338770352


/*
 * Формат строки даты `YYYY-MM-DDTHH:mm:ss.sssZ` (возможно использовать неполную)
 *
 * YYYY-MM-DD – это дата: год-месяц-день.
 *   Символ "T" используется в качестве разделителя.
 *   HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
 *   Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.
*/
// Если передать в Date строку формата, то она разберется на дату, если не формат, то отдаст `Invalid Date`
let stringDate = new Date('15-11-2022');
console.log(stringDate);                   // Output: Invalid Date  (тип: object)
stringDate = new Date('2022-11-15');
console.log(stringDate);                   // Output: 2022-11-15T00:00:00.000Z (15.11.2022, 03:00:00)
// тк время не указано - берется полночь по Гринвичу и меняется в зависимости от часового пояса системы

// Метод `Date.parse(strDate)` преобразует строку (!) формата в число timestamp
const parsedDate = Date.parse(stringDate);
console.log(parsedDate);      // Output: 1668470400000



// Если дата выходит за временной диапазон месяца, суток, часа и тп. js автоматически перебрасывает 'лишние' единицы на след диапазон
const date2 = new Date(2016, 1, 1);
console.log(date2.toLocaleString());      // Output: 01.02.2016, 00:00:00
date2.setDate(date2.getDate() - 3);
console.log(date2.toLocaleString());      // Output: 29.01.2016, 00:00:00


// ---------------------------------------------------------------------------------------------------------------------
/*
* Методы выдергивания компонентов даты (зависят от часового пояса системы)
*
* `date.getFullYear()` - Возвращает год (date.getYear не используется, тк возвращает не полный год)
* `date.getMonth()` - Возвращает месяц, от 0 до 11.
* `date.getDate()` - Возвращает день месяца, от 1 до 31
* `date.getDay()` - Возвращает день недели от 0 (воскресенье) до 6 (суббота)
* `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()` - Возвращают часы, минуты, секунды или миллисекунды
*/
/*
* Методы выдергивания компонентов даты (НЕ зависящие от часового пояса системы)
*
* `date.getUTCFullYear()` - Возвращает год для временной зоны, UTC+0 (Лондон летнее время)
* `date.getUTCMonth()` - Возвращает месяц, от 0 до 11, UTC+0
* `date.getUTCDate()` - Возвращает день месяца, от 1 до 31, UTC+0
* `date.getUTCDay()` - Возвращает день недели от 0 (воскресенье) до 6 (суббота), UTC+0
* `getUTCHours()`, `getUTCMinutes()`, `getUTCSeconds()`, `getUTCMilliseconds()` - Возвращают часы, минуты, секунды или миллисекунды, UTC+0
*/
// Метод `date.getTimeOffset()` вернет разницу в минутах между UTC+0 и текущим часовым поясом
console.log(now.getTimezoneOffset());      // Output: -180 (UTC-3)


/*
* Методы вставки (установки) компонентов даты (зависят от часового пояса системы)
*
* `setFullYear(year, month?, date?)` -
* `setMonth(month, date?)`
* `setDate(date)`
* `setHours(hour, min?, sec?, ms?)`
* `setMinutes(min, sec?, ms?)`
* `setSeconds(sec, ms?)`
* `setMilliseconds(ms)`
* `setTime(milliseconds)` (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)
*/

// По аналогии с `.getDate...()` методами у этих есть UTC-аналоги, например setUTCHours()


// ---------------------------------------------------------------------------------------------------------------------
// Task 1
// Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.
const dadatata = new Date('2012-02-20T03:12:00');
console.log(dadatata.toLocaleString());   // Output: 20.02.2012, 03:12:00


// Task 2
// Напишите функцию getWeekDay(date), показывающую день недели в коротком формате: «ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».
const getWeekDay = function (date) {
  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  return days[date.getDay()];
};
console.log(getWeekDay(dadatata));       // Output: ПН
console.log(getWeekDay(date2));          // Output: ПТ


// Task 3
// В Европейских странах неделя начинается с понедельника (день номер 0), затем идёт вторник (номер 1) и так до воскресенья (номер 6).
// Напишите функцию getLocalDay(date), которая возвращает «европейский» день недели для даты date.
const date = new Date(2012, 0, 3);  // 3 января 2012 года
const getLocalDay = function (date) {
  date.setDate(+3);
  return date.getDay();
};
console.log(getLocalDay(date));       // Output: 2


// Task 4
// Создайте функцию getDateAgo(date, days), возвращающую число, которое было days дней назад от даты date.
// P.S. Функция не должна изменять переданный ей объект date.
console.log(date.toLocaleString());        // Output: 03.01.2012, 00:00:00
const getDateAgo = function (date, days) {
  const pastDate = new Date(date);
  pastDate.setDate(date.getDate() - days);
  return pastDate.getDate();
};
console.log(getDateAgo(date, 1));   // Output: 2
console.log(getDateAgo(date, 2));   // Output: 1
console.log(getDateAgo(date, 365)); // Output: 3
console.log(date.toLocaleString());        // Output: 03.01.2012, 00:00:00


// Task 5
// Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца. Иногда это 30, 31 или даже февральские 28/29.
//    year – год из четырёх цифр, например, 2012.
//    month – месяц от 0 до 11.
const getLastDayOfMonth = function (year, month) {
  const monthDays = new Date(year, month + 1, 0);
  return monthDays.getDate();
};
console.log(getLastDayOfMonth(2013, 6)); // 31 (Май)
console.log(getLastDayOfMonth(2012, 1)); // 29 (високосный год, февраль).


// Task 6
// Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.
const getSecondsToday = function () {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
};
console.log(getSecondsToday());   // секунды с 00:00:00 сегодняшнего дня


// Task 7
// Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.
const getSecondsToTomorrow = function () {
  const now = new Date();
  return -1 * (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() - 86400);
};
console.log(getSecondsToTomorrow());  // секунды до 00:00:00 завтрашнего дня

// Task 8
// Напишите функцию formatDate(date), форматирующую date по следующему принципу:
//     Если спустя date прошло менее 1 секунды, вывести "прямо сейчас".
//     В противном случае, если с date прошло меньше 1 минуты, вывести "n сек. назад".
//     В противном случае, если меньше часа, вывести "m мин. назад".
//     В противном случае, полная дата в формате "DD.MM.YY HH:mm". А именно: "день.месяц.год часы:минуты", всё в виде двух цифр, т.е. 31.12.16 10:00.
const formatDate = function (date) {
  const offset = new Date() - date;
  switch (true) {
    case (offset <= 1):
      return `прямо сейчас`;
    case (offset <= 60000):
      return `${offset / 1000} сек. назад`;
    case (offset <= 3600000):
      return `${offset / 1000 / 60} мин. назад`;
    default:
      return ['0' + date.getDate(), '.', '0' + date.getMonth(), '.', '0' + date.getFullYear(), ', ', '0' + date.getHours(), ':', '0' + date.getMinutes()]
          .map(el => el.slice(-2))
          .join('');
  }
};

console.log(formatDate(new Date(new Date - 1)));              // "прямо сейчас"
console.log(formatDate(new Date(new Date - 30 * 1000)));      // "30 сек. назад"
console.log(formatDate(new Date(new Date - 5 * 60 * 1000)));  // "5 мин. назад"
console.log(formatDate(new Date(new Date - 86400 * 1000)));   // дата в формате 31.12.2016, 20:00
