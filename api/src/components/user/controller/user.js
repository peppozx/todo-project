const { users } = require('../../../db/fakeDb');
class UserController {
    constructor(userService, apiResponse, handleError) {
        this.userService = userService;
        this.apiResponse = apiResponse;
        this.handleError = handleError;
    }

    async createUser({ body }) {
        try {
            const { username, password } = body;
            const user = await this.userService.createUser({ username, password });
            return this.apiResponse.ok(user);
        } catch (err) {
            return handleError(err);
        }   
    }
}

module.exports = UserController;