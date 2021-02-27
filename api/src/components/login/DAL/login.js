class LoginDAL {
    constructor(db) {
        this.db = db;
    }

    async findUser(username) {
        const [user] = await this.db.findUser(username);
        return user;
    }
}

module.exports = LoginDAL;