"use-strict";

class Task {
    tasks = [];
    statuses = {
        "pending": "pending",
        "completed": "completed"
    };
    storage = null;

    constructor(storage) {
        this.storage = storage;

        if (this.storage.getItem('tasks')) {
            this.tasks = JSON.parse(this.storage.getItem('tasks'));
        }
    }

    getTasks(key = '', value = '') {
        return this.getTasksByKey(key, value);
    }

    getTasksByKey(key = '', value = '') {
        if (this.tasks.length === 0 || (key === '' && value === '')) {
            return this.tasks;
        }

        if (typeof this.tasks[0][key] === 'undefined') {
            return null;
        }

        let tasks = [];

        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i][key] === value) {
                tasks.push(this.tasks[i]);
            }
        }

        return tasks;
    }

    getTaskById(id) {
        if (typeof id === 'undefined' || typeof this.tasks === 'undefined') {
            return null;
        }

        for (const task of this.tasks) {
            if (task.id == id) {
                return task;
            }
        }

        return null;
    }

    getTaskByIndex(index) {
        if (typeof this.tasks[index] !== 'undefined' && typeof this.tasks[index] === 'object') {
            return this.tasks[index];
        }

        return null;
    }

    getTaskIndexById(id) {
        if (typeof id === 'undefined' || typeof this.tasks === 'undefined') {
            return null;
        }

        for (const index in this.tasks) {
            if (this.tasks[index].id == id) {
                return index;
            }
        }

        return null;
    }

    createNewTask(task) {
        if (typeof task === 'undefined' || task.trim() == '') {
            return null;
        }

        let lastTask = this.getTaskByIndex(this.tasks.length - 1);
        let id = lastTask ? lastTask.id : 0;

        let taskData = {
            "id": ++id,
            "task": task.trim(),
            "status": this.statuses.pending
        };

        let tasks = this.tasks.push(taskData);
        this.storage.setItem('tasks', JSON.stringify(this.tasks));

        return tasks;
    }

    editTask(id, key, value) {
        if (typeof id === 'undefined' || typeof key === 'undefined' || typeof value === 'undefined') {
            return null;
        }

        let currentTask = this.getTaskById(id);

        if (!currentTask) {
            return null;
        }

        let taskData = {
            "id": currentTask.id,
            "task": key === 'task' ? value : currentTask.task,
            "status": key === 'status' ? value : currentTask.status
        };

        let index = this.getTaskIndexById(id);
        this.tasks[index] = taskData;
        this.storage.setItem('tasks', JSON.stringify(this.tasks));

        return true;
    }

    deleteTask(id) {
        if (typeof id === 'undefined') {
            return null;
        }

        let index = this.getTaskIndexById(id);

        if (!index) {
            return null;
        }

        let task = this.tasks.splice(index, 1);

        if (typeof task !== 'object') {
            return false;
        }

        this.storage.setItem('tasks', JSON.stringify(this.tasks));

        return true;
    }
}