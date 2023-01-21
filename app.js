const form = document.querySelector(".form");
const userInput = document.querySelector(".todo");
const todoSection = document.querySelector(".list-section");
const checkbox = document.querySelector(".done");
const taskList = document.querySelector(".todo-list");
const list = document.querySelector(".todo");
const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

//Loading back from localStorage
for (let i = 0; i < storedTodos.length; i++) {
  console.log(storedTodos[i]);
  let newTodo = document.createElement("li");
  newTodo.setAttribute("class", "todo");
  newTodo.innerHTML = storedTodos[i].tasks;
  newTodo.isCompleted = storedTodos[i].isCompleted ? true : false;
  console.log(newTodo.isCompleted);
  if (newTodo.isCompleted) {
    newTodo.classList.toggle("finished");
    console.log(newTodo);
  }
  todoSection.append(newTodo);
}

//Create tasks and add it to UI and localStorage
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const todo = userInput.value;
  const element = document.createElement("li");
  element.setAttribute("class", "todo");
  element.innerText = todo;
  todoSection.append(element);

  element.isCompleted = false;
  form.reset();

  storedTodos.push({ tasks: element.innerText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(storedTodos));
});

//Completed Tasks
todoSection.addEventListener("click", function (e) {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("finished");
  }

  let clickedItem = e.target;

  if (!clickedItem.isCompleted) {
    clickedItem.isCompleted = true;
  } else {
    clickedItem.isCompleted = false;
  }

  for (let i = 0; i < storedTodos.length; i++) {
    if (storedTodos[i].tasks === clickedItem.innerText) {
      storedTodos[i].isCompleted = clickedItem.isCompleted;

      localStorage.setItem("todos", JSON.stringify(storedTodos));
      console.log(JSON.parse(localStorage.getItem("tasks")));
    }
  }
});
