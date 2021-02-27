const loginController = require('./controller');

module.exports = {
    prefix: '/signin',
    endpoints: [
        {
            path: '/',
            method: 'post',
            callback: loginController.signIn.bind(loginController),
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