const { v4: uuid } = require('uuid');
const AppError = require('../../../shared/AppError/AppError');
const APP_ERROR_TYPE = require('../../../shared/AppError/APP_ERROR_TYPE');

class TaskService {
    constructor(taskDAL, apiResponse, handleError) {
        this.taskDAL = taskDAL;
        this.apiResponse = apiResponse;
        this.handleError = handleError;
    }

    async createTask(user, projectId, name) {
        const [project] = await this.taskDAL.getProject(projectId);
        
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There is no project with this id',
            });
        }

        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }

        const taskDTO = {
            id: uuid(),
            projectId,
            name,
            created: new Date(),
            finished: null,
        };

        const task = await this.taskDAL.createTask(taskDTO);
        return task;
    }

    async deleteTask(user, projectId, id) {
        const [project] = await this.taskDAL.getProject(projectId);
        
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There is no project with this id',
            });
        }

        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }

        const [task] = await this.taskDAL.getTask(id);
        if (!task) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There is no task with this id',
            });
        }

        const deletedTaskId = await this.taskDAL.deleteTask(id);
        return deletedTaskId;
        
    }

    async updateTask(user, projectId, id, taskInfo) {
        const [project] = await this.taskDAL.getProject(projectId);
        
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There is no project with this id',
            });
        }

        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }

        const [task] = await this.taskDAL.getTask(id);
        if (!task) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There is no task with this id',
            });
        }

        const taskUpdated = await this.taskDAL.updateTask(id, taskInfo);
        return taskUpdated;
    }

    async getTasks(user, projectId) {
        const [project] = await this.taskDAL.getProject(projectId);
        
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There is no project with this id',
            });
        }

        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }
        
        const tasks = await this.taskDAL.getTasks(projectId);
        return tasks;

    }

    async getTask(user, projectId, id) {
        const [project] = await this.taskDAL.getProject(projectId);
        
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There is no project with this id',
            });
        }

        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }

        const [task] = await this.taskDAL.getTask(id);
        return task;
    }
}

module.exports = TaskService;