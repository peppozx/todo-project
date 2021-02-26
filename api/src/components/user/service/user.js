class UserService {
    constructor(userDAL) {
        this.userDAL = userDAL;
    }

    async createUser({ username, password }) {
        const user = await this.userDAL.createUser({ username, password });
        return user;
    }
}

module.exports = UserService;