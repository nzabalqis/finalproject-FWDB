
var todoForm = document.querySelector('.todo-form');

var todoInput = document.querySelector('.todo-input');

var todoItemsList = document.querySelector('.todo-items');


var todos = [];


todoForm.addEventListener('submit', function(event) {
 
  event.preventDefault();
  addTodo(todoInput.value); 
});


function addTodo(item) {
  
  if (item !== '') {
    
    var todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    
    todos.push(todo);
    addToLocalStorage(todos); 

    todoInput.value = '';
  }
}


function renderTodos(todos) {
  
  todoItemsList.innerHTML = '';

  
  todos.forEach(function(item) {
    
    var checked = item.completed ? 'checked': null;

    
    var li = document.createElement('li');
    
    li.setAttribute('class', 'item');
    
    li.setAttribute('data-key', item.id);
    
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button btn btn-danger btn-sm">X</button>
    `;
    
    todoItemsList.append(li);
  });

}


function addToLocalStorage(todos) {
  
  localStorage.setItem('todos', JSON.stringify(todos));
  
  renderTodos(todos);
}


function getFromLocalStorage() {
  var reference = localStorage.getItem('todos');
  
  if (reference) {
    
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


function toggle(id) {
  todos.forEach(function(item) {
    
    if (item.id == id) {
      
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}


function deleteTodo(id) {
  
  todos = todos.filter(function(item) {
    
    return item.id != id;
  });

  
  addToLocalStorage(todos);
}


getFromLocalStorage();


todoItemsList.addEventListener('click', function(event) {
  
  if (event.target.type === 'checkbox') {
    
    toggle(event.target.parentElement.getAttribute('data-key'));
  }


  if (event.target.classList.contains('delete-button')) {
    
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});
