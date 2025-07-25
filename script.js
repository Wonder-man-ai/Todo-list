
const inputBox = document.querySelector('.input-field');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todoList');

let editTodo = null;

// function to add Todo
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your ToDo list");
  }

  else if (addBtn.value === "Edit") {
    const originalText = editTodo.target.previousElementSibling.innerHTML;
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(originalText);
    addBtn.value = "Add";
    inputBox.value = "";
  }

  else {

    // creating li tag
    const li = document.createElement("li");

    // creating p tag
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // creating edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn")
    editBtn.innerHTML = "Edit";
    li.appendChild(editBtn);

    // creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "delBtn")
    deleteBtn.innerHTML = "Remove";
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodo(inputText);

  }
}


//function for updating ToDo buttons (edit and remove)
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  else if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit"
    editTodo = e;
  }
}


//function to add todos to the local storage
const saveLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


//function to get the todos from the local storage
const getLocalTodo = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {

      // creating li tag
      const li = document.createElement("li");

      // creating p tag
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // creating edit button
      const editBtn = document.createElement("button");
      editBtn.classList.add("btn", "editBtn")
      editBtn.innerHTML = "Edit";
      li.appendChild(editBtn);

      // creating delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "delBtn")
      deleteBtn.innerHTML = "Remove";
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
}

// function to delete the local storage todos
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);

  // Array function to delete from the local storage slice / splice
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// function to edit the local storge todos
const editLocalTodos = (todo) =>{
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
}


// function calling
document.addEventListener('DOMContentLoaded', getLocalTodo);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);