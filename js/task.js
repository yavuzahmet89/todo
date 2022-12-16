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
        if (task == '') {
            return null;
        }

        let length = this.tasks.length;

        let taskData = {
            "id": ++length,
            "task": task,
            "status": this.statuses.pending
        };

        return this.tasks.push(taskData);
    }
}
