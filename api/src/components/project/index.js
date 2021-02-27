const projectController = require('./controller');

const { authenticate } = require('../../auth');

module.exports = {
    prefix: '/project',
    endpoints: [
        {
            path: '/',
            method: 'post',
            callback: projectController.createProject.bind(projectController),
            middlewares: [authenticate],
            schema: {
                name: {
                    type: 'string',
                    required: true,
                },
            }
        },
        {
            path: '/',
            method: 'get',
            callback: projectController.getProjects.bind(projectController),
            middlewares: [authenticate],
        },
        {
            path: '/:id',
            method: 'get',
            callback: projectController.getProject.bind(projectController),
            middlewares: [authenticate],
        },
        {
            path: '/:id',
            method: 'put',
            callback: projectController.updateProject.bind(projectController),
            middlewares: [authenticate],
            schema: {
                name: {
                    type: 'string',
                    required: true,
                },
            }
        },
        {
            path: '/:id',
            method: 'delete',
            callback: projectController.deleteProject.bind(projectController),
            middlewares: [authenticate],
        }
    ]
}