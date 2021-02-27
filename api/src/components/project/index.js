const projectController = require('./controller');

module.exports = {
    prefix: '/project',
    endpoints: [
        {
            path: '/',
            method: 'post',
            callback: projectController.createProject.bind(projectController),
            middlewares: [],
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
            middlewares: [],
        },
        {
            path: '/:id',
            method: 'get',
            callback: projectController.getProject.bind(projectController),
            middlewares: [],
            schema: {
                username: {
                    type: 'string',
                    required: true,
                },
                password: {
                    type: 'string',
                    required: true,
                }
            }
        },
        {
            path: '/:id',
            method: 'patch',
            callback: projectController.updateProject.bind(projectController),
            middlewares: [],
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
            middlewares: [],
        }
    ]
}