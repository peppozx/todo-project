const taskController = require('./controller');
const { authenticate } = require('../../auth');

module.exports = {
    prefix: '/project',
    endpoints: [
        {
            path: '/:projectId/task',
            method: 'get',
            callback: taskController.getTasks.bind(taskController),
            middlewares: [authenticate],
        },
        {
            path: '/:projectId/task/:id',
            method: 'get',
            callback: taskController.getTask.bind(taskController),
            middlewares: [authenticate],
        },
        {
            path: '/:projectId/task',
            method: 'post',
            callback: taskController.createTask.bind(taskController),
            middlewares: [authenticate],
            schema: {
                name: {
                    type: 'string',
                    required: true,
                }
            }
        },
        {
            path: '/:projectId/task/:id',
            method: 'delete',
            callback: taskController.deleteTask.bind(taskController),
            middlewares: [authenticate],
        },
        {
            path: '/:projectId/task/:id',
            method: 'patch',
            callback: taskController.updateTask.bind(taskController),
            middlewares: [authenticate],
        }
    ]
}