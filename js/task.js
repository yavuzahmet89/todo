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

    getTask(id) {
        for (const task of this.tasks) {
            if (task.id == id) {
                return task;
            }
        }

        return 0;
    }

    createNewTask(task) {
        if (task.trim() == '') {
            return null;
        }

        let length = this.tasks.length;

        let taskData = {
            "id": ++length,
            "task": task.trim(),
            "status": this.statuses.pending
        };

        return this.tasks.push(taskData);
    }

    editTask(id, task) {
        let currentTask = this.getTask(id);

        if (!currentTask) {
            return null;
        }

        let taskData = {
            "id": currentTask.id,
            "task": typeof task !== 'undefined' && task.trim() != '' ? task.trim() : currentTask.task,
            "status": typeof task.status !== 'undefined' ? task.status : currentTask.status
        };

        this.tasks[currentTask.id - 1] = taskData;
        return true;
    }
}