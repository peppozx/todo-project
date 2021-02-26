const { ok } = require('../../shared/apiResponse/apiResponse');

module.exports = {
    prefix: '/login',
    endpoints: [
        {
            path: '/',
            method: 'post',
            callback: ({ body }) => {
                return ok(body);
            },
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