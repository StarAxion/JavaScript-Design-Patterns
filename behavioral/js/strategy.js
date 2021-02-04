/* Стратегия - это поведенческий шаблон проектирования, который определяет группу схожих алгоритмов и помещает каждый из них в собственный класс,
после чего, в зависимости от условий, их можно динамически использовать, взаимозаменяя в процессе выполнения программы. */


console.log('Strategy:');


class Customer {
  useDiscount() {
    return this.discount;
  }
}

class NewCustomer extends Customer {
  constructor() {
    super();
    this.discount = 0;
  }
}

class RegularCustomer extends Customer {
  constructor() {
    super();
    this.discount = 10;
  }
}

class PremiumCustomer extends Customer {
  constructor() {
    super();
    this.discount = 15;
  }
}

class PizzaShop {
  buyPizza(price, customer) {
    return `${price - price * customer.useDiscount() / 100} hrn`;
  }
}

const pizzaShop = new PizzaShop();

console.log(pizzaShop.buyPizza(180, new NewCustomer())); // 180 hrn
console.log(pizzaShop.buyPizza(220, new RegularCustomer())); // 198 hrn
console.log(pizzaShop.buyPizza(200, new PremiumCustomer())); // 170 hrn


//////////////////////////////////////////////////////////////////////////////


console.log('Strategy:');


function Ride() {
  this.go = function (vehicle) {
    return vehicle.travel();
  }
}

function Transport() { }

Transport.prototype.travel = function () {
  return this.timeTaken + ' minutes';
}

function ByCar() {
  this.timeTaken = 30;
}

ByCar.prototype = Object.create(Transport.prototype);

function ByMetro() {
  this.timeTaken = 60;
}

ByMetro.prototype = Object.create(Transport.prototype);

let ride = new Ride();
let byCar = new ByCar();
let byMetro = new ByMetro();

console.log(ride.go(byCar)); // 30 minutes
console.log(ride.go(byMetro)); // 60 minutes