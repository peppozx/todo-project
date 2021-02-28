const AppError = require("../../../shared/AppError/AppError");
const APP_ERROR_TYPE = require("../../../shared/AppError/APP_ERROR_TYPE");

class UserService {
    constructor(userDAL) {
        this.userDAL = userDAL;
    }

    async createUser({ username, password }) {
        const [userAlreadyExists] = await this.userDAL.findUser(username);
        if (userAlreadyExists) {
            throw new AppError({
                type: APP_ERROR_TYPE.BAD_REQUEST,
                message: 'This user already exists',
            });
        }
        const user = await this.userDAL.createUser({ username, password });
        return {
            username: user.username,
            id: user._id,
        }
    }
}

module.exports = UserService;