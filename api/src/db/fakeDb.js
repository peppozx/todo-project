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
}

module.exports = new FakeDb();