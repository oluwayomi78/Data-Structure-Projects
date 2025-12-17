class Task {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    processTask() {
        return this.tasks.shift(); 
    }

    getTasks() {
        return this.tasks;
    }
}

const myTasks = new Task();

const taskList = document.getElementById('taskList');
const taskNameInput = document.getElementById('taskName');
const taskTypeSelect = document.getElementById('taskType');
const fileInputWrapper = document.getElementById('fileInputWrapper');
const fileUploadInput = document.getElementById('fileUpload');
const processBtn = document.getElementById('processTask');
const completedTasks = [];
const completedTaskList = document.getElementById('tasksCompleted');


const AddTask = () => {
    const taskName = taskNameInput.value.trim();
    const taskType = taskTypeSelect.value;
    if (!taskName) {
        alert('Please enter a task name');
        return;
    }

    myTasks.addTask({ name: taskName, type: taskType });
    taskNameInput.value = '';
    fileUploadInput.value = '';
    fileInputWrapper.classList.add('hidden');
    renderTasks();
};

taskTypeSelect.addEventListener('change', () => {
    if (taskTypeSelect.value === "File Upload") {
        fileInputWrapper.classList.remove('hidden');
    } else {
        fileInputWrapper.classList.add('hidden');
        fileUploadInput.value = '';
    }
});

const processTask = () => {
    const task = myTasks.processTask();
    if (task) {
        alert(`Processing Task: ${task.name} [${task.type}]`);
        completedTasks.push(task);
        renderCompletedTasks();
    } else {
        alert('No tasks to process');
    }
    renderTasks();
};

const renderTasks = () => {
    const tasks = myTasks.getTasks();
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `<li class="text-gray-500 text-center">No tasks in the queue</li>`;
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${task.name} [${task.type}]`;
        if (task.type === "Email") li.className = "bg-blue-100 text-blue-800 p-3 rounded-lg";
        if (task.type === "File Upload") li.className = "bg-green-100 text-green-800 p-3 rounded-lg";
        if (task.type === "Message") li.className = "bg-yellow-100 text-yellow-800 p-3 rounded-lg";

        taskList.appendChild(li);
    });
};


const renderCompletedTasks = () => {
    completedTaskList.innerHTML = "";

    if (completedTasks.length === 0) {
        completedTaskList.innerHTML = `<li class="text-gray-500 text-center">No completed tasks</li>`;
        return;
    }

    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${task.name} [${task.type}]`;

        if (task.type === "Email") li.className = "bg-blue-100 text-blue-800 p-3 rounded-lg";
        if (task.type === "File Upload") li.className = "bg-green-100 text-green-800 p-3 rounded-lg";
        if (task.type === "Message") li.className = "bg-yellow-100 text-yellow-800 p-3 rounded-lg";

        completedTaskList.appendChild(li);
    });
};

processBtn.addEventListener('click', processTask);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        AddTask();
    }
});

renderTasks();
