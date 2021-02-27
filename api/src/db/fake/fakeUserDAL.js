class FakeUserDAL {
    constructor() {
        this.users = [];
        this.counter = 0;
    }

    async createUser(userDTO) {
        const { username, password } = userDTO;
        this.users.push({
            id: this.counter++,
            username,
            password
        });
        return this.users;
    }

    async findUser(username) {
        return this.users.filter(u => u.username === username);
    }

}

module.exports = new FakeUserDAL();