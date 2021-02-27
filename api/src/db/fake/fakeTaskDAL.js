class FakeTasksDAL {
    constructor(db) {
        this.db = db;
    }

    async getProject(id) {
        const [project] = this.db.projects.filter(p => p.id === id);
        return project;
    }

    async getTasks(projectId) {
        const tasks = this.db.tasks.filter(t => t.projectId === projectId);
        return tasks;
    }

    async createTask(taskDTO) {
        this.db.tasks.push(taskDTO);
        return taskDTO;
    }

    async getTask(id) {
        const [task] = this.db.tasks.filter(t => t.id === id);
        return task;
    }

    async deleteTask(id) {
        this.db.tasks = this.db.tasks.filter(t => t.id !== id);
        return id;
    }

    async updateTask(id, taskInfo) {
        const { name, finished } = taskInfo;
        const [task] = this.db.tasks.filter(t => t.id === id);

        if (name) {
            task.name = name;
        }

        if (finished) {
            task.finished = finished;
        }

        return task;
    }
}

module.exports = FakeTasksDAL;