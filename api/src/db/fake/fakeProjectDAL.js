class FakeProjectDAL {
    constructor() {
        this.users = [];
        this.projects = [];
        this.counter = 0;
    }

    async createProject(projectDTO) {
        this.projects.push(projectDTO);
        return this.projects;
    }

    async deleteProject(id) {
        this.projects = this.projects.filter(p => p.id != id);
        return this.projects;
    }

    async getProject(id) {
        const [project] = this.projects.filter(p => p.id === id);
        return project;
    }

    async updateProject(id, name) {
        const project = await this.getProject(id);
        project.name = name;
        return project;
    }

    async getProjects() {
        return this.projects;
    }
}

module.exports = new FakeProjectDAL();