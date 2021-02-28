const TaskService = require('./task');
const { fakeProjectDAL, fakeTaskDAL } = require('../../../db/fake');
const ProjectService = require('../../project/service/project');

describe('TaskService', () => {
    let taskService;
    let projectService = new ProjectService(fakeProjectDAL);
    let projectId;
    let projectName = 'project 1'
    let fakeUser = { name: 'fake user '};

    beforeEach(async () => {
        taskService = new TaskService(fakeTaskDAL);
        const response = await projectService.createProject(fakeUser, projectName);
        projectId = response.id;
    });

    it('Should get tasks', async () => {
        try {
            const task = { name: 'this task' };
            const numberOfTasks = 3;
            for (let i = 0 ; i < numberOfTasks ; i++) {
                await taskService.createTask(fakeUser, projectId, task.name);
            }
            const response = await taskService.getTasks(fakeUser, projectId);
            expect(response.length).toBe(numberOfTasks);
        } catch (err) {
            expect(1).toBe(2);
        }
    });

    it('Should create one task', async () => {
        try {
            const task = {
                name: 'this task',
            };
            const response = await taskService.createTask(fakeUser, projectId, task.name);
            expect(response).toBeDefined();
            expect(response.projectId).toBe(projectId);
            expect(response.name).toBe(task.name);
        } catch (err) {
            expect(1).toBe(2);
        }
    });

    it('Should get one task', async () => {
        try {
            const task = {
                name: 'that task',
            };
            const response = await taskService.createTask(fakeUser, projectId, task.name);
            const createdTask = await taskService.getTask(fakeUser, projectId, response.id);
            expect(task).toBeDefined();
            expect(createdTask.name).toBe(task.name);
        } catch (err) {
            expect(1).toBe(2);
        }
    });

    it('Should delete one task', async() => {
        try {
            const task = { name: 'taskk' };
            const createdTask = await taskService.createTask(fakeUser, projectId, task.name);
            const deletedTaskId = await taskService.deleteTask(fakeUser, projectId, createdTask.id);
            expect(deletedTaskId).toBe(createdTask.id);
        } catch (err) {
            expect(1).toBe(2);
        }
    });

    it('Should update one task', async() => {
        try {
            const task = { name: 'kakaka' };
            const createdTask = await taskService.createTask(fakeUser, projectId, task.name);
            const update = {
                name: 'new task name',
                finished: new Date().toLocaleString(),
            };
            const updatedTask = await taskService.updateTask(fakeUser, projectId, createdTask.id, update);
            expect(updatedTask).toBeDefined();
            expect(updatedTask.name).toBe(update.name);
            expect(updatedTask.finished).toBe(update.finished);
        } catch (err) {
            expect(1).toBe(2);
        }
    });

})