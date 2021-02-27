class FakeProjectDAL {
    constructor(db) {
        this.db = db;
        this.counter = 0;
    }

    async createProject(projectDTO) {
        this.db.projects.push(projectDTO);
        return this.projects;
    }

    async deleteProject(id) {
        this.db.projects = this.projects.filter(p => p.id != id);
        return this.projects;
    }

    async getProject(id) {
        const [project] = this.db.projects.filter(p => p.id === id);
        return project;
    }

    async updateProject(id, name) {
        const project = await this.getProject(id);
        project.name = name;
        return project;
    }

    async getProjects() {
        return this.db.projects;
    }
}

module.exports = FakeProjectDAL;