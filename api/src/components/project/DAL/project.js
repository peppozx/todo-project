const ProjectService = require("../service/project");

class ProjectDAL {
    constructor(db) {
        this.db = db;
    }

    async createProject(projectDTO) {
        const project = await this.db.createProject(projectDTO);
        return project;
    }

    async deleteProject(id) {
        const deletedProject = await this.db.deleteProject(id);
        return deletedProject;
    }

    async updateProject(id, name) {
        const updatedProject = await this.db.updateProject(id, name);
        return updatedProject;
    }

    async getProjects() {
        return await this.db.getProjects();
    }

    async getProject(id) {
        const project = await this.db.getProject(id);
        return project;
    }
}

module.exports = ProjectDAL;