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
        return this.db.users;
    }

    async findUser(username) {
        return this.db.users.filter(u => u.username === username);
    }

}

module.exports = FakeUserDAL;