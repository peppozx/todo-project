const { tasks } = require("../../../db/fake/data");

class TaskController {
    constructor(taskService, apiResponse, handleError) {
        this.taskService = taskService;
        this.apiResponse = apiResponse;
        this.handleError = handleError;
    }

    async createTask({ body, user, params }) {
        try {
            const { projectId } = params;
            const { name } = body;
            const task = await this.taskService.createTask(user, projectId, name);
            return this.apiResponse.ok(task);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async deleteTask({ params, user }) {
        try {
            const { projectId, id } = params;
            const taskId = await this.taskService.deleteTask(user, projectId, id);
            return this.apiResponse.ok({ id: taskId });
        } catch (err) {
            return this.handleError(err);
        }
    }

    async updateTask({ params, body, user }) {
        try {
            const { projectId, id } = params;
            const { name, finished } = body;
            const task = await this.taskService.updateTask(user, projectId, id, { name, finished });
            return this.apiResponse.ok(task);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async getTasks({ user, params }) {
        try {
            const { projectId } = params;
            const tasks = await this.taskService.getTasks(user, projectId);
            return this.apiResponse.ok(tasks);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async getTask({ params, user }) {
        try {
            const { projectId, id } = params;
            const task = await this.taskService.getTask(user, projectId, id);
            return this.apiResponse.ok(task);
        } catch (err) {
            return this.handleError(err);
        }
    }
}

module.exports = TaskController;