document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const taskCount = document.getElementById('taskCount');
  const alertBox = document.getElementById('alert-box');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Load saved tasks
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));

  updateCount();

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      showAlert('Please enter a task.', 'danger');
      return;
    }

    addTaskToDOM(taskText);
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    taskInput.value = '';
    showAlert('Task added successfully!', 'success');
    updateCount();
  });

  function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = text;
    if (completed) span.classList.add('completed');

    span.addEventListener('click', () => {
      span.classList.toggle('completed');
      const idx = [...taskList.children].indexOf(li);
      tasks[idx].completed = !tasks[idx].completed;
      saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      const idx = [...taskList.children].indexOf(li);
      tasks.splice(idx, 1);
      li.remove();
      saveTasks();
      updateCount();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function updateCount() {
    taskCount.textContent = taskList.children.length;
  }

  function showAlert(message, type) {
    alertBox.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});