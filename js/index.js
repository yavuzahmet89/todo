"use-strict";

var task = new Task();
var tasks = task.getTasks();
var taskList = document.querySelector('#taskList');

document.addEventListener('DOMContentLoaded', function() {
    if (tasks.length) {
        loadDomTasks(tasks);
    } else {
        taskList.innerHTML = getAlertMessage('warning', languageMessages.taskNotFound);
    }
});

function createNewTask() {
    let taskInput = document.getElementById('task');
    let createResult = task.createNewTask(taskInput.value);

    if (createResult) {
        loadDomTasks(task.getTasks());
    }
}

function loadDomTasks(tasks) {
    let html = '<ul class="list-group">';

    for (const task of tasks) {
        html += `
            <li class="list-group-item" id="list-group-item-${task.id}">
                <input class="form-check-input me-1" type="checkbox" value="1" id="task${task.id}">
                <label class="form-check-label" for="task${task.id}">${task.task}</label>
                <button type="button" class="btn btn-danger btn-sm float-end" onclick="deleteTask('${task.id}');">${languageMessages.delete}</button>
                <button type="button" class="btn btn-warning btn-sm float-end me-lg-1" onclick="getTask('${task.id}');">${languageMessages.edit}</button>
            </li>
        `;
    }

    html += '</ul>';

    taskList.innerHTML = html;
    document.getElementById('task').value = '';
}