// Load the to-do list from localStorage
function loadToDoList() {
    const savedList = localStorage.getItem('todoList');
    return savedList ? JSON.parse(savedList) : [];
  }
  
  // Save the to-do list to localStorage
  function saveToDoList(list) {
    localStorage.setItem('todoList', JSON.stringify(list));
  }
  
  // Render the to-do list
  function renderToDoList() {
    const todoList = loadToDoList();
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.innerHTML = ''; 
  
    todoList.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      if (task.completed) {
        taskItem.classList.add('completed'); // Mark as completed
      }
  
      taskItem.innerHTML = `${task.text} <button class="remove-btn" onclick="removeTask(${index})">Remove</button>`;
      taskItem.addEventListener('click', () => toggleCompletion(index)); // Mark as completed
      taskListContainer.appendChild(taskItem);
    });
  }
  
  // Add a task to the list
  function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
  
    // Prevent adding empty tasks
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }
  
    const todoList = loadToDoList();
    // Add new task with 'completed' state set to false
    todoList.push({ text: taskText, completed: false });
    saveToDoList(todoList);
  
    taskInput.value = ''; 
    renderToDoList(); 
  }
  
  // Toggle task completion (mark as completed or uncompleted)
  function toggleCompletion(index) {
    const todoList = loadToDoList();
  
    console.log("Index:", index); 
    console.log("Todo List:", todoList); 
  
    const task = todoList[index];
  
    if (task) {
      task.completed = !task.completed; 
      saveToDoList(todoList);
      renderToDoList(); 
    } else {
      console.error('Task not found at index', index); 
    }
  }
  
  // Remove a task from the list
  function removeTask(index) {
    const todoList = loadToDoList();
    todoList.splice(index, 1); // Remove task
    saveToDoList(todoList);
    renderToDoList(); 
  }
  
  // Event listener for the "Add Task" button
  document.getElementById('add-task-btn').addEventListener('click', addTask);
  
  // Render the to-do list when the page loads
  document.addEventListener('DOMContentLoaded', renderToDoList);
  