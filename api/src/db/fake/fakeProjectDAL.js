class FakeProjectDAL {
    constructor(db) {
        this.db = db;
    }

    async createProject(projectDTO) {
        this.db.projects.push(projectDTO);
        return projectDTO;
    }

    async deleteProject(id) {
        this.db.projects = this.db.projects.filter(p => p.id != id);
        return id;
    }

    async getProject(id) {
        const project = this.db.projects.filter(p => p.id === id);
        return project;
    }

    async updateProject(id, name) {
        const [project] = this.db.projects.filter(p => p.id === id);
        project.name = name;
        return project;
    }

    async getProjects() {
        return this.db.projects;
    }

    async getTasks(projectId) {
        const tasks = this.db.tasks.filter(t => t.projectId === projectId);
        return tasks;
    }
}

module.exports = FakeProjectDAL;