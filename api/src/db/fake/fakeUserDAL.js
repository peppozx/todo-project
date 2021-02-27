class FakeUserDAL {
    constructor(db) {
        this.db = db;
        this.counter = 0;
    }

    async createUser(userDTO) {
        const { username, password } = userDTO;
        this.db.users.push({
            id: this.counter++,
            username,
            password
        });
        return this.users;
    }

    async findUser(username) {
        return this.db.users.filter(u => u.username === username);
    }

}

module.exports = FakeUserDAL;