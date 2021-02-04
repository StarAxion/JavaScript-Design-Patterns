/* Шаблонный метод - это поведенческий шаблон проектирования, основанный на определении каркаса алгоритма, 
но делегирующий реализацию некоторых его шагов дочерним классам.
Это позволяет подклассам переопределять определенные этапы алгоритма без изменения его общей структуры. */


console.log('Template method:');


function RestaurantWorker(salary) {
  this.salary = salary;
}

RestaurantWorker.prototype.work = function () {
  return `${this.position} salary is ${this.salary} dollars per month for ${this.duties()}.`;
}

function Cook() {
  RestaurantWorker.apply(this, arguments);
  this.position = 'Cook';
}

Cook.prototype = Object.create(RestaurantWorker.prototype);
Cook.prototype.constructor = Cook;

Cook.prototype.duties = function () {
  return 'cooking food';
}

function Waiter() {
  RestaurantWorker.apply(this, arguments);
  this.position = 'Waiter';
}

Waiter.prototype = Object.create(RestaurantWorker.prototype);
Waiter.prototype.constructor = Waiter;

Waiter.prototype.duties = function () {
  return 'customer service';
}

function Cleaner() {
  RestaurantWorker.apply(this, arguments);
  this.position = 'Cleaner';
}

Cleaner.prototype = Object.create(RestaurantWorker.prototype);
Cleaner.prototype.constructor = Cleaner;

Cleaner.prototype.duties = function () {
  return 'indoor cleaning';
}

let cook = new Cook(430);
console.log(cook.work()); // Cook salary is 430 dollars per month for cooking food.

let waiter = new Waiter(535);
console.log(waiter.work()); // Waiter salary is 535 dollars per month for customer service.

let cleaner = new Cleaner(260);
console.log(cleaner.work()); // Cleaner salary is 260 dollars per month for indoor cleaning.