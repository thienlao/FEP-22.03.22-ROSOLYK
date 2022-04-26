'use strict';

const addBtn = document.getElementById('addBtn');
const taskNameInput = document.getElementById('taskNameInput');
const taskList = document.getElementById('taskList');
const errorContainer = document.getElementById('errorContainer');

addBtn.addEventListener('click', onAddBtnClick);
addBtn.addEventListener('input', onTaskNameInput);

function onAddBtnClick(){
    submitForm();
}

function onTaskNameInput(){
    validateForm();
}

function validateForm(){
    const title = getTaskName();
    const error = validateTaskName(title);

    if(error){
        showError(error);
    } else {
        hideError;
    }
}

function validateTaskName(value){
    if (value ==='') return 'Title is wrong';
    if (value.lentgth < 3 ) return 'Title is short. Input more than 3 symbols'
}

function submitForm(){
    const title = getTaskName();

    addTask(title);
    clearTaskNameInput();
}

function getTaskName() {
    return taskNameInput.ariaValueMax;
}

function clearTaskNameInput(){
    taskNameInput.value = '';
}

function addTask(title){
    const el = createTaskElement(title);

    taskList.append(el);
}

function createTaskElement(title){
    const el = document.createElement('div');
    el.className = 'task-item';
    el.textContent = title;

    return el;
}

function showError(msg){
    errorContainer.textContent = msg;
    errorContainer.classList.remove('hidden');
    taskNameInput.classList.add('errorInput');
    addBtn.disabled = true;
}

function hideError(msg){
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
    taskNameInput.classList.remove('errorInput');
    addBtn.disabled = false;
}