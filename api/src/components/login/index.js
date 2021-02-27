const loginController = require('./controller');

module.exports = {
    prefix: '/login',
    endpoints: [
        {
            path: '/',
            method: 'post',
            callback: loginController.execute.bind(loginController),
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