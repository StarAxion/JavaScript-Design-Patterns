/* Model-View-Presenter is a design pattern which separates the code for a specific widget functionality to three sections:
1. Model - in which the data model for the widget is defined.
2. View - in which the logic behind the UI is handled, with UI events, data visualization and other UI centric logic.
3. Presenter - carries the logic behind the functionality of the widget, requires the corresponding view and a model.
When the presenter gets the model, it updates the view with different handlers, and the view will then update the UI.
The presenter will register handlers in the view for any UI events that require some logic. */


class TodoPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.onSubmit = this.onSubmit.bind(this);
    this.view.onRemove = this.onRemove.bind(this);
    this.updateList();
  }

  onSubmit(text) {
    this.model.addTask(text);
    this.updateList();
  }

  onRemove(index) {
    this.model.removeTask(index);
    this.updateList();
  }

  updateList() {
    this.view.emptyList();
    this.model.getTasks().forEach((text, index) => {
      this.view.renderTask(text, index);
    })
  }
}

class TodoModel {
  addTask(text) {
    let list = this.getTasks();
    list.push(text);
    localStorage.todo = JSON.stringify(list);
  }

  removeTask(index) {
    let list = this.getTasks().filter((task, i) => {
      return i != index;
    });
    localStorage.todo = JSON.stringify(list);
  }

  getTasks() {
    return JSON.parse(localStorage.todo || "[]");
  }
}

class TodoView {
  constructor() {
    this.form = document.querySelector(".todo-form");
    this.input = this.form.querySelector(".todo-form__input");
    this.list = document.querySelector(".todo-list");
    this.onSubmit = function () { };
    this.onRemove = function () { };

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit(this.input.value);
      this.input.value = "";
      this.input.focus();
    });
  }

  emptyList() {
    this.list.innerHTML = "";
  }

  renderTask(text, index) {
    let taskView = new TaskView(text, index);
    taskView.removeTask = this.onRemove;
    this.list.appendChild(taskView.render());
  }
}

class TaskView {
  constructor(text, index) {
    this.text = text;
    this.index = index;
    this.removeTask = function () { };
  }

  render() {
    let el = document.createElement("li");
    el.innerText = this.text;
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-index", this.index);
    deleteBtn.setAttribute("title", "remove task");
    deleteBtn.textContent = "X";
    el.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", (event) => {
      this.removeTask(event.target.dataset.index);
    });

    return el;
  }
}

const todo = new TodoPresenter(new TodoModel(), new TodoView());