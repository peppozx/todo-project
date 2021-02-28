class FakeUserDAL {
    constructor(db) {
        this.db = db;
    }

    async createUser(userDTO) {
        const { username, password } = userDTO;
        this.db.users.push({
            username,
            password
        });
        return {
            username,
        };
    }

    async findUser(username) {
        const user = this.db.users.filter(u => u.username === username);
        return user;
    }

}

module.exports = FakeUserDAL;