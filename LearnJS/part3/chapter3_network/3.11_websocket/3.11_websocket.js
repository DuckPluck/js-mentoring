// https://learn.javascript.ru/websocket

const WebSocket = require('ws');  // запросили установленный в npm модуль вебсокетов


// Websocket это протокол, позволяющий обмениваться данными между браузером и сервером через постоянное подключение
// Данные передаются по нему в обоих направлениях в виде пакетов

// Чтобы открыть веб-сокет соединение, нужно создать `new WebSocket`, передав в кач-ве аргумента url с протоколом 'ws://'
// (Ниже передаю url learnJS ws - сервера, который отправляет рандомные цифры через рандомное время)
const socket = new WebSocket('wss://javascript.info/article/websocket/chat/ws');

// Также существует протокол 'wss' - secured. То же самое, что и 'https' для 'http'. Шифрует данные во время транспортировки.


/*
 * Когда объект WebSocket создан, мы ожидаем от него 4 события:

 * `open`       - Соединение установлено
 * `message`    - Получены данные
 * `error`      - Ошибка
 * `close`      - Соединение закрыто
 */

// Для отправки чего-либо пользуемся `socket.send(data)`
// Чтобы прописать логику при наступлении каждого из событий, передаем функции в соответствующие методы (`.onopen`, `.onmessage`, `.onclose`, `.onerror`):

socket.onopen = function (e) {
  console.log(
      '[open] Connected!',
      'Sending data to server...',
  );
  socket.send('My name is John');       // Отправляем данные на сервер сразу при установлении соединения
};

socket.onmessage = function (event) {
  if (event.data >= 0) {
    console.log(`[message] Data received from server: ${event.data}`);
  } else {
    console.log(`[message] Data received from client: ${event.data}`);
  }
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Connection was cleanly closed, code: ${event.code}, reason: ${event.reason}`);
  } else {
    console.log(`[close] Connection was aborted`);
  }
};

socket.onerror = function (error) {
  console.log(`[error] Error type: ${error.title}`);
};



// Когда `new WebSocket` создан, он тут же посылает http запрос на сервер - есть ли поддержка WS - если все ок, то с сервера возвращается http запрос с ответом (код 101)
// далее они начинают работать по протоколу WS. Этот обмен http называется 'handshake'



// // Вместе с url, вторым аргументом в new WebSocket(url, [subprotocols]?) можно передать расширения и подпротоколы.
// // Подпротоколы нужны, чтобы предупредить сервер с каким дополнительным типом данных ему придется работать.
// // Перечень возможных подпротоколов - http://www.iana.org/assignments/websocket/websocket.xml
// //  Заголовок с расширениями отправляется браузером автоматически - там все возможные расширения.

let socket2 = new WebSocket('wss://javascript.info/article/websocket/chat/ws', ['soap', 'wamp']);



// Поток данных в ws состоит из 'фреймов' - фрагментов данных, которые могут быть отправлены любой стороной
/*
 * Виды фреймов:
 *
 * Текстовые фреймы             - Содержат текстовые данные
 * Бинарные фреймы              - Содержат бинарные данные  (blob(по умолчанию) или ArrayBuffer)
 * Пинг-понг фреймы             - Проверка соединения (браузер 'отбивает' их автоматически)
 * Фрейм закрытия соединения    - Закрывает соединения
 * +Некоторые другие служебные фреймы
 */

// Метод `WebSocket.sand()` может отправлять текстовые и бинарные фреймы



// Можно ограничить скорость передачи для сокета, чтобы не перегрузить буфер данных, если медленное соединение:
// Св-во `socket.bufferedAmount` хранит кол-во буферизованных байт.
setTimeout(() => {
  setInterval(() => {
    if (socket.bufferedAmount === 0) {          // 10 раз в сек опрашиваем сервер есть ли очередь, если нет, делаем новый запрос
      socket.send('more data');
    }
  }, 10000);
}, 100);



// // Для закрытия подключения любая из сторон должна отправить закрывающий фрейм `socket.close(code, reason)` (код закрытия и причина закрытия)

socket2.onclose = function (e) {
  console.log(e.code, e.reason, e.wasClean);                 // - код, причина, закрыто закрывающим фреймом(false, true)
}
setTimeout(() => socket2.close(), 1500);      // - Закрывающая сторона

// Все коды закрытия описаны тут - https://tools.ietf.org/html/rfc6455#section-7.4.1



// У сокетов есть СОСТОЯНИЕ СОЕДИНЕНИЯ (не путать с событиями). Его можно получить через `socket.readyState`
/*
 * Виды состояний соединения:
 *
 * 0 - CONNECTING   - Соединение еще не установлено
 * 1 - OPEN         - Обмен данными
 * 2 - CLOSING      - Соединение закрывается
 * 3 - CLOSED       - Соединение закрыто
 */
setTimeout(() => console.log(socket.readyState), 0);       // Output: 0
setTimeout(() => console.log(socket.readyState), 1000);    // Output: 1
setTimeout(() => console.log(socket2.readyState), 2000);   // Output: 3
