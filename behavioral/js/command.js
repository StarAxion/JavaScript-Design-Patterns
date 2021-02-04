/* Команда - это поведенческий шаблон проектирования, целью которого является инкапсуляция действий или операций как объектов, 
позволяя передавать их как аргументы при вызове методов, ставить запросы в очередь, логировать их, а также поддерживать отмену операций. */


console.log('Command:');


function Fridge() {
  this.openDoor = function () {
    console.log('Fridge is opened')
  };

  this.closeDoor = function () {
    console.log('Fridge is closed')
  };
}

function Command(fridge) {
  this.fridge = fridge;
}

Command.prototype = {
  execute: function () {
    this.fridge.openDoor();
  },

  undo: function () {
    this.fridge.closeDoor();
  },

  redo: function () {
    this.execute();
  }
};

function DoorControl() {
  this.open = function (command) {
    command.execute();
  };

  this.close = function (command) {
    command.undo();
  };
}

let fridge = new Fridge();
let command = new Command(fridge);
let door = new DoorControl();

door.open(command); // Fridge is opened
door.close(command); // Fridge is closed