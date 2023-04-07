// Кеш, методы массивов, Map
// Добавить возможность логировать историю вызовов
// (натянуть на любую ООП сущность, которую реализовывали - например на конструктор заказов в магазине, но не обязательно)
// В чем суть: Все публичные мутирующие методы должны запоминать с чем они были вызваны -
// отдельно по каждому методу должна быть информация по каждому вызову и с какими аргументами был каждый вызов.
// Потом можно будет благодаря этой фиче "посмотреть логи" - когда и какой метод был вызван раз. Нужно получить +- след результат по формату (зависит от вашей задачи):
//
// "08:46:10 Добавлено "Пиво" (id #10) 4 шт."
// "08:46:10 Удалено "Молоко" (id #6) 1 шт."
// "08:46:09 Добавлено "Молоко" (id #6) 2 шт."
// Добавить метод в вашу сущность getLog() который будет выводить полный лог (сначала последние вызовы - ниже более старые).


// --- Конструктор айтемов и 4 созданных айтема - milk, bread, potatoes, cheese ---
function Item(name, price) {
  this.name = name;
  this.price = price;
  this.count = 1;
}

const milk = new Item('Milk 1L', 0.7);
const bread = new Item('Bread', 1.6);
const potatoes = new Item('Potatoes 1Kg', 1.1);
const cheese = new Item('Cheese 200gr', 2.2);


// --- Конструктор чека ---
function Check() {
  this.items = [];
  this.lock = false;
  this.log = new Map();

  // .lockOrder() - Блокирует изменения предметов в чеке
  this.lockOrder = () => {
    this.lock = true;
    console.log('Check is locked now...');
    return this;
  };

  // .unlockOrder() - Разблокирует изменения предметов в чеке
  this.unlockOrder = () => {
    this.lock = false;
    console.log('Check is unlocked now...');
    return this;
  };

  // .addItem(item) - Добавляет предмет, созданный в конструкторе предметов - milk, bread, potatoes, cheese
  this.addItem = (item) => {

    if (this.lock) {
      console.log('Can\'t do that - check is locked');
      return this;
    }

    if (this.items.find((foundItem) => foundItem.name === item.name)) {
      const foundIndex = this.items.findIndex((i) => i.name === item.name);
      this.log.set(this.log.size + 1, `${new Date().toLocaleTimeString()} Added "${item.name}" (x${item.count}) in position ${foundIndex + 1}`);
      this.items[foundIndex].count += 1;
    } else {
      this.items.push(Object.create(item));
      this.log.set(this.log.size + 1, `${new Date().toLocaleTimeString()} Created "${item.name}" for ${item.price.toFixed(2)}$ (x${item.count}) in position ${this.items.length}`);
    }

    return this;
  };

  // .deleteItem(itemPosition, count) - Удаляет count предметов по itemPosition в чеке
  this.deleteItem = (itemPosition = this.items.length, count = 1) => {
    if (this.lock) {
      console.log('Can\'t delete - check is locked');
      return this;
    }

    const itemCount = this.items.at(itemPosition - 1).count;

    if (itemPosition < 1 || this.items.length < itemPosition) {
      console.log(`Can\'t delete - there is no ${itemPosition} position`);
      return this;
    }
    if (count < 1 || this.items.at(itemPosition - 1).count < count) {
      console.log(`Can\'t delete ${count} items - item count is ${itemCount}`);
      return this;
    }

    this.log.set(this.log.size + 1, `${new Date().toLocaleTimeString()} Removed "${this.items.at(itemPosition - 1).name}" (x${count}) in position ${itemPosition}`);
    this.items.splice(itemPosition - 1, 1);
    return this;
  };

  // .getCheck(code) - Формирует чек. Если есть промокод, передавайте его как аргумент при вызове
  this.getCheck = (code) => {
    const totalPrice = this.items.map(item => item.price * item.count).reduce((sum, e) => sum + e);
    let discount = 0;

    if (code === 'WINTER20') {
      discount = 20;
    }
    if (code === 'EMPLOYEE50') {
      discount = 50;
    }
    if (code === '6SENIORS99') {
      discount = 99;
    }

    for (let i = 0; i < this.items.length; i++) {
      console.log(`${i + 1}. ${(this.items[i].price * this.items[i].count).toFixed(2)}$ - ${this.items[i].name} (${this.items[i].count})`);
    }
    console.log(`Discount: ${discount}%`);
    if (discount) {
      console.log(`Total price: ${totalPrice.toFixed(2)}$ => ${(totalPrice - totalPrice / 100 * discount).toFixed(2)}$`);
    } else {
      console.log(`Total price: ${totalPrice.toFixed(2)}$`);
    }
    this.log.set(this.log.size + 1, `${new Date().toLocaleTimeString()} Check formed with discount code "${code}"`);
    return this;
  };

  // Формирует лог
  this.getLog = () => {
    console.log('\nLog: ');
    this.log.forEach(event => console.log(` ${event}`));
    return this;
  };
}

/*
 * Output:
 * {
 *  1. 0.70$ - Milk 1L (1)
 *  2. 1.60$ - Bread (1)
 *  3. 1.10$ - Potatoes 1Kg (2)
 *  4. 2.20$ - Cheese 200gr (3)
 *  Discount: 20%
 *  Total price: ̶5̶.̶6̶0̶$̶  1.12$
 * }
*/

const check = new Check();
check.addItem(milk)
    .addItem(bread)
    .addItem(potatoes)
    .addItem(cheese)
    .deleteItem(2)
    .addItem(potatoes)
    .addItem(potatoes)
    .addItem(potatoes)
    .getCheck('WINTER20')
    .getLog();