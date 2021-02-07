/* Model-View-ViewModel is a design pattern, based on the MVC and MVP patterns.
It is used to further separate the working of the user interface from the business logic in the application.
It has 3 components:
1. Model - stores all the data and information required by the application, and does not interfere with how this data will be manipulated or displayed.
2. View - is the presentation of the data, responsible for controlling their appearance.
3. ViewModel - acts as the connection between the model and the view, converting information from the model format into the view format for display.
ViewModel updates the model when a user action on the view occurs, by passing commands from view to the model.
And it is also used to maintain the view’s state and trigger events on it. */


// MODEL
class Model {
  constructor() {
    this.model = { name: "" };
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyObservers(attrName, newVal) {
    let i, observersSize = this.observers.length;
    for (i = 0; i < observersSize; i += 1) {
      this.observers[i](attrName, newVal);
    }
  }

  getCurrentName(nameKey) {
    return this.model[nameKey];
  }

  setNameValue(nameKey, value) {
    this.model[nameKey] = value;
    this.notifyObservers(nameKey, value);
  }
}

// VIEWMODEL  
class ViewModel {
  constructor(model) {
    this.bind = (viewElement, modelElement) => {
      viewElement.value = model.getCurrentName(modelElement);

      model.subscribe((attrName, newValue) => {
        document.getElementsByName(attrName).forEach(elem => {
          elem.value = newValue;
        });
      });

      viewElement.addEventListener("input", () => {
        model.setNameValue(viewElement.name, viewElement.value);
      });
    }
  }
}

// VIEW
const nameInput = document.getElementById("name");
const nameCopyInput = document.getElementById("nameCopy");
const model = new Model()
const viewModel = new ViewModel(model);
viewModel.bind(nameInput, "name");
viewModel.bind(nameCopyInput, "name");