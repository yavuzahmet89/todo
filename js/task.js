"use-strict";

class Task {
    tasks = [];
    statuses = {
        "pending": "pending",
        "completed": "completed"
    };

    getTasks() {
        return this.tasks;
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

        return this.tasks.push(taskData);
    }

    editTask(id, task) {
        if (typeof id === 'undefined' || typeof task === 'undefined' || task.trim() == '') {
            return null;
        }

        let currentTask = this.getTaskById(id);

        if (!currentTask) {
            return null;
        }

        let taskData = {
            "id": currentTask.id,
            "task": task.trim(),
            "status": currentTask.status
        };

        let index = this.getTaskIndexById(id);
        this.tasks[index] = taskData;

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

        return true;
    }
}