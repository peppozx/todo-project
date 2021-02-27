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

    createProject(projectDTO) {
        this.projects.push(projectDTO);
        return this.projects;
    }

    deleteProject(id) {
        this.projects = this.projects.filter(p => p.id != id);
        return this.projects;
    }

    getProject(id) {
        const [project] = this.projects.filter(p => p.id === id);
        return project;
    }
}

module.exports = new FakeDb();