const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
  renderTodo();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const taskText = todoInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const newTask = {
    text: taskText,
    completed: false
  };

  todos.push(newTask);
  todoInput.value = "";

  saveTodos();
  renderTodo();
}

function createTodoItem(todo, index) {
  const li = document.createElement("li");
  if (todo.completed) {
    li.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function () {
    toggleComplete(index);
  });

  const span = document.createElement("span");
  span.textContent = todo.text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", function () {
    editTodo(index);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    deleteTodo(index);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

function renderTodo() {
  todoList.innerHTML = "";

  todos.forEach(function (todo, index) {
    const todoItem = createTodoItem(todo, index);
    todoList.appendChild(todoItem);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodo();
}

function editTodo(index) {
  const newText = prompt("Edit task:", todos[index].text);

  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    saveTodos();
    renderTodo();
  }
}


function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodo();
}

addBtn.addEventListener("click", addTodo);

loadTodos();
