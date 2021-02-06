/* Легковес (Приспособленец или Кэш) - это структурный шаблон проектирования, который используется в целях эффективности передачи и работы с данными, и сохранения памяти.
Применяется в случае, когда один экземпляр класса предоставляет множество "виртуальных экземпляров".
То есть, вместо создания большого количества объектов определенного типа, можно создать один объект, который будет хранить состояние всех этих объектов. */


console.log('Flyweight:');


class MobilePhone {
  constructor(model) {
    this.model = model;
  }
}

class SamsungFactory {
  constructor() {
    this.models = {};
  }

  createMobilePhone(name) {
    let model = this.models[name];
    if (!model) {
      model = new MobilePhone(name);
      this.models[name] = model;
    }
    return model;
  }

  getModels() {
    return this.models;
  }
}

const samsungFactory = new SamsungFactory();

const m21 = samsungFactory.createMobilePhone('Samsung Galaxy M21');
const m51 = samsungFactory.createMobilePhone('Samsung Galaxy M51');
const m31 = samsungFactory.createMobilePhone('Samsung Galaxy M31');
const s10 = samsungFactory.createMobilePhone('Samsung Galaxy S10');
const a71 = samsungFactory.createMobilePhone('Samsung Galaxy A71');
const a71New = samsungFactory.createMobilePhone('Samsung Galaxy A71');

console.log(samsungFactory.getModels());
// {Samsung Galaxy M21: MobilePhone, Samsung Galaxy M51: MobilePhone, Samsung Galaxy M31: MobilePhone, Samsung Galaxy S10: MobilePhone, Samsung Galaxy A71: MobilePhone}

console.log(a71 === a71New); // true


//////////////////////////////////////////////////////////////////////////////


console.log('Flyweight:');


// Flyweight класс:

function WashingPowder(brand, price) {
  this.brand = brand;
  this.price = price;
}

// Фабрика flyweight объектов (создает и управляет flyweight объектами):

function WashingPowderFactory() {
  this.washingPowders = [];

  this.getWashingPowder = function (brand) {
    return this.washingPowders.find(washingPowder => washingPowder.brand === brand);
  }

  this.createWashingPowder = function (brand, price) {
    var washingPowder = this.getWashingPowder(brand);
    if (washingPowder) {
      return washingPowder;
    } else {
      washingPowder = new WashingPowder(brand, price);
      this.washingPowders.push(washingPowder);
      return washingPowder;
    }
  }

  this.changeWashingPowderPrice = function (brand, price) {
    return this.getWashingPowder(brand).price = price;
  }
}

var washingPowderFactory = new WashingPowderFactory();

// Использование flyweight фабрики:

var persil = washingPowderFactory.createWashingPowder('Persil', 500);
var persilPlus = washingPowderFactory.createWashingPowder('Persil', 550);

console.log(persil === persilPlus); // true

washingPowderFactory.changeWashingPowderPrice('Persil', 512); // WashingPowder {brand: "Persil", price: 512}

console.log(persil);

washingPowderFactory.createWashingPowder('Tide', 370);
washingPowderFactory.createWashingPowder('Ariel', 495);

console.log(washingPowderFactory.getWashingPowder('Ariel'), washingPowderFactory.getWashingPowder('Tide'));
// WashingPowder {brand: "Ariel", price: 495} WashingPowder {brand: "Tide", price: 370}