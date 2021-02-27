const userController = require('./controller');
const { authenticate } = require('../../auth');

module.exports = {
    prefix: '/signup',
    endpoints: [
        {
            path: '/',
            method: 'post',
            callback: userController.createUser.bind(userController),
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
        }
    ]
}