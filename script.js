// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask(taskText, save = true) {
      if (taskText.trim() === '') {
          alert('Please enter a task!');
          return;
      }

      // Create new list item
      const li = document.createElement('li');
      li.textContent = taskText;

      // Create remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';

      // Add click event to remove button
      removeButton.onclick = function() {
          taskList.removeChild(li);
          removeTaskFromStorage(taskText);
      };

      // Append remove button to list item
      li.appendChild(removeButton);

      // Append list item to task list
      taskList.appendChild(li);

      // Clear input field
      taskInput.value = '';

      // Save to local storage if required
      if (save) {
          saveTaskToStorage(taskText);
      }
  }

  // Function to save task to local storage
  function saveTaskToStorage(taskText) {
      let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to remove task from local storage
  function removeTaskFromStorage(taskText) {
      let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks = tasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Add event listener to the add button
  addButton.addEventListener('click', () => addTask(taskInput.value));

  // Add event listener to input for Enter key press
  taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          addTask(taskInput.value);
      }
  });

  // Load tasks from local storage when the page loads
  loadTasks();
});
