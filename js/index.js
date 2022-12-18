"use-strict";

var task = new Task();

var taskInputs = document.querySelector('#taskInputs');
var taskInput = taskInputs.querySelector('#task');
var taskList = document.querySelector('#taskList');

document.addEventListener('DOMContentLoaded', function() {
    if (task.getTasks().length) {
        getTasks(task.getTasks());
    } else {
        taskList.innerHTML = getAlertMessage('warning', languageMessages.taskNotFound);
    }
});

function getDOMTasks(tasks) {
    if (typeof task !== 'undefined' && tasks.length) {
        let html = '<ul class="list-group">';

        for (const task of tasks) {
            html += `
                <li class="list-group-item" id="list-group-item-${task.id}">
                    <input class="form-check-input me-1" type="checkbox" value="1" id="task${task.id}">
                    <label class="form-check-label" for="task${task.id}">${task.task}</label>
                    <button type="button" class="btn btn-danger btn-sm float-end" onclick="deleteDOMTask('${task.id}');">${languageMessages.delete}</button>
                    <button type="button" class="btn btn-warning btn-sm float-end me-lg-1" onclick="getDOMTask('${task.id}');">${languageMessages.edit}</button>
                </li>
            `;
        }

        html += '</ul>';

        taskList.innerHTML = html;
    } else {
        taskList.innerHTML = getAlertMessage('warning', languageMessages.taskNotFound);
    }
}

function getDOMTask(id) {
    let currentTask = task.getTaskById(id);
    taskInput.value = currentTask.task;
    taskInputs.querySelector('button').remove();
    taskInputs.insertAdjacentHTML('beforeend', getEditButton(id));
}

function getAddButton() {
    return `<button class="btn btn-primary" type="button" id="createNewTaskBtn" onclick="createNewDOMTask();">${languageMessages.add}</button>`;
}

function getEditButton(id) {
    return `<button class="btn btn-primary" type="button" id="editTaskBtn" onclick="editDOMTask('${id}');">${languageMessages.edit}</button>`;
}

function resetForm(type = 'create') {
    taskInput.value = '';

    if (type == 'edit') {
        taskInputs.querySelector('button').remove();
        taskInputs.insertAdjacentHTML('beforeend', getAddButton());
    }
}

function createNewDOMTask() {
    let createResult = task.createNewTask(taskInput.value);

    if (createResult) {
        getDOMTasks(task.getTasks());
        resetForm();
    }
}

function editDOMTask(id) {
    let editResult = task.editTask(id, taskInput.value);

    if (editResult) {
        getDOMTasks(task.getTasks());
        resetForm('edit');
    }
}

function deleteDOMTask(id) {
    let deleteResult = task.deleteTask(id);

    if (deleteResult) {
        getDOMTasks(task.getTasks());
        resetForm('edit');
    }
}