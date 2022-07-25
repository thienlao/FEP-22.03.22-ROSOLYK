'use-strict;'

const TASK_ITEM_CLASS = 'task-item';
const DELETE_BTN_CLASS = 'delete-btn';
const TASK_DONE_CLASS = 'done';
const HIDDEN_CLASS = 'hidden';
const ERROR_INPUT_CLASS = 'errorInput';
const STORAGE_KEY = 'list';

const TASK_ITEM_TEMPLATE = document.getElementById('taskItemTemplate').innerHTML;
const ERROR_MESSAGES = {
    REQUIRED: 'Title is required',
    SHORT: 'Title is too short',
    ID_NOT_FOUND: 'Id not found',
};
const addBtn = document.getElementById('addBtn');
const taskNameInput = document.getElementById('taskNameInput');
const taskList = document.getElementById('taskList');
const errorContainer = document.getElementById('errorContainer');

let todoList = [];
let error = null;

document
    .getElementById('addTaskForm')
    .addEventListener('submit', onAddTaskFormSubmit);
taskNameInput.addEventListener('input', onTaskNameInput);
taskList.addEventListener('click', onTaskItemClick);

init();

function onAddTaskFormSubmit(e) {
    e.preventDefault();
    submitForm();
}

function onTaskNameInput() {
    validateForm();
}

function onTaskItemClick(e) {
    const id = getTaskElementId(e.target);

    if (e.target.classList.contains(TASK_ITEM_CLASS)) {
        toggleTaskState(id);
    }
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        deleteTask(id);
    }
}

function init() {
    todoList = restoreData();
    renderList();
}

function renderList() {
    taskList.innerHTML = todoList.map(createTaskHTML).join('\n');
}

function submitForm() {
    const newTask = getNewTask();

    addTask(newTask);
    clearTaskNameInput();
}

function validateForm() {
    const title = getTaskName();
    error = validateTaskName(title);

    updateErrorState();
}



function validateTaskName(value) {
    if (value === '') return ERROR_MESSAGES.REQUIRED;

    if (value.length < 3) return ERROR_MESSAGES.SHORT;

    return null;
}

function getNewTask() {
    return {
        title: getTaskName(),
        isDone: false,
    };
}

function getTaskName() {
    return taskNameInput.value;
}

function clearTaskNameInput() {
    taskNameInput.value = '';
}

function addTask(newTask) {
    newTask.id = Date.now();

    todoList.push(newTask);

    saveData();
    renderList();
}

function createTaskHTML(task) {
    return TASK_ITEM_TEMPLATE.replace('{{id}}', task.id)
        .replace('{{title}}', task.title)
        .replace('{{doneClass}}', task.isDone ? TASK_DONE_CLASS : '');
}

function getTaskElementId(el) {
    const taskElement = el.closest('.' + TASK_ITEM_CLASS);
    return taskElement && +taskElement.dataset.id;
}

function updateErrorState() {
    if (error) {
        showError(error);
    } else {
        hideError();
    }
}

function showError(msg) {
    errorContainer.textContent = msg;
    errorContainer.classList.remove(HIDDEN_CLASS);
    taskNameInput.classList.add(ERROR_INPUT_CLASS);
    addBtn.disabled = true;
    error = true;
}

function hideError() {
    errorContainer.textContent = '';
    errorContainer.classList.add(HIDDEN_CLASS);
    taskNameInput.classList.remove(ERROR_INPUT_CLASS);
    addBtn.disabled = false;
    error = true;
}

function toggleTaskState(taskId) {
    const task = todoList.find(({ id }) => id === taskId);

    if (!task) {
        return console.error(ERROR_MESSAGES.ID_NOT_FOUND);
    }

    task.isDone = !task.isDone;

    saveData();
    renderList();
}

function deleteTask(taskId) {
    todoList = todoList.filter(({ id }) => id !== taskId);

    saveData();
    renderList();
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
}

function restoreData() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
}