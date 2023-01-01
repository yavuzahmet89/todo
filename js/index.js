"use-strict";

var taskObject = new Task();

var taskInputs = document.querySelector('#taskInputs');
var taskInput = taskInputs.querySelector('#task');
var taskList = document.querySelector('#taskList');

document.addEventListener('DOMContentLoaded', function () {
    if (taskObject.getTasks().length) {
        getDOMTasksByStatus(null, 'pending');
    } else {
        taskList.innerHTML = getAlertMessage('warning', languageMessages.taskNotFound);
    }
});

function getDOMTasks(key = '', value = '') {
    let tasks = taskObject.getTasks(key, value);

    if (typeof tasks !== 'undefined' && tasks.length) {
        let html = '<ul class="list-group">';

        for (const task of tasks) {
            let isChecked = task.status === taskObject.statuses.completed ? ' checked="checked"' : '';

            html += `
                <li class="list-group-item" id="list-group-item-${task.id}">
                    <input class="form-check-input me-1" type="checkbox" value="1" id="task${task.id}" onclick="editDOMTaskStatus(${task.id}, this.checked);"${isChecked}>
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

function setStatusType(element) {
    let statusTypes = document.querySelectorAll('#statusTypes li a');

    if (statusTypes) {
        for (const statusType of statusTypes) {
            statusType.classList.remove('active');
        }

        if (element !== null) {
            element.classList.add('active');
        }
    }
}

function getActiveStatusType() {
    let statusTypes = document.querySelector('#statusTypes li a.active');

    if (statusTypes) {
        if (statusTypes.classList.contains('all') === true) {
            return 'all';
        } else if (statusTypes.classList.contains('pending') === true) {
            return 'pending';
        } else if (statusTypes.classList.contains('completed') === true) {
            return 'completed';
        }
    }
}

function getDOMTasksByStatus(element, value = '') {
    setStatusType(element);

    if (value === '' || value === 'all') {
        getDOMTasks();
    } else {
        getDOMTasks('status', value);
    }
}

function getDOMTask(id) {
    let currentTask = taskObject.getTaskById(id);
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

    if (type === 'edit') {
        taskInputs.querySelector('button').remove();
        taskInputs.insertAdjacentHTML('beforeend', getAddButton());
    }
}

function createNewDOMTask() {
    let createResult = taskObject.createNewTask(taskInput.value);

    if (createResult) {
        getDOMTasksByStatus(document.querySelector('#statusTypes li a.pending'), 'pending');
        resetForm();
    }
}

function editDOMTask(id) {
    let editResult = taskObject.editTask(id, 'task', taskInput.value);

    if (editResult) {
        let activeStatusType = getActiveStatusType();
        getDOMTasksByStatus(document.querySelector('#statusTypes li a.active'), activeStatusType);
        resetForm('edit');
    }
}

function editDOMTaskStatus(id, isChecked) {
    if (isChecked) {
        taskObject.editTask(id, 'status', taskObject.statuses.completed);
    } else {
        taskObject.editTask(id, 'status', taskObject.statuses.pending);
    }

    let activeStatusType = getActiveStatusType();
    setTimeout(function () {
        getDOMTasksByStatus(document.querySelector('#statusTypes li a.active'), activeStatusType);
    }, 500);
}

function deleteDOMTask(id) {
    let deleteResult = taskObject.deleteTask(id);

    if (deleteResult) {
        let activeStatusType = getActiveStatusType();
        getDOMTasksByStatus(document.querySelector('#statusTypes li a.active'), activeStatusType);
        resetForm('edit');
    }
}