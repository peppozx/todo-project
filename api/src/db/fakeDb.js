class FakeDb {
    constructor() {
        this.users = [];
        this.projects = [];
        this.counter = 0;
    }
    
    createUser(userDTO) {
        const { username, password } = userDTO;
        this.users.push({
            id: this.counter++,
            username,
            password
        });
        return this.users;
    }

    findUser(username) {
        return this.users.filter(u => u.username === username);
    }
}

module.exports = new FakeDb();