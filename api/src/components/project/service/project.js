const { v4: uuid } = require('uuid');
const AppError = require('../../../shared/AppError/AppError');
const APP_ERROR_TYPE = require('../../../shared/AppError/APP_ERROR_TYPE');

class ProjectService {
    constructor(projectDAL) {
        this.projectDAL = projectDAL;
    }

    async createProject(name) {
        const projectDTO = {
            id: uuid(),
            name,
        }
        const project = await this.projectDAL.createProject(projectDTO);
        return project;
    }

    async deleteProject(id) {
        const project = await this.projectDAL.getProject(id);
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There\'s no project with id ' + id,
            });
        }
        const deletedProject = await this.projectDAL.deleteProject(id);
        return deletedProject;
    }

    async updateProject(id, name) {
        const project = await this.projectDAL.getProject(id);
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There\'s no project with id ' + id,
            });
        }
        const updatedProject = await this.projectDAL.updateProject(id, name);
        return updatedProject;

    }

    async getProjects() {
        const projects = await this.projectDAL.getProjects();
        return projects;
    }

    async getProject(id) {
        const project = await this.projectDAL.getProject(id);
        return project;
    }

}

module.exports = ProjectService;