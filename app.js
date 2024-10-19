let taskList = document.getElementById('task-list');
let taskInput = document.getElementById('task-input');
let addTaskBtn = document.getElementById('add-task-btn');

// Initialize an empty array to store tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask(task) {
    tasks.push(task);
    saveTasks();
    renderTaskList();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTaskList();
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render the task list
function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        let taskHTML = `
            <li class="task">
                ${task}
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
}

// Add event listener to the add task button
addTaskBtn.addEventListener('click', () => {
    let task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

// Add event listener to the enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let task = taskInput.value.trim();
        if (task) {
            addTask(task);
            taskInput.value = '';
        }
    }
});

// Initial render of the task list
renderTaskList();