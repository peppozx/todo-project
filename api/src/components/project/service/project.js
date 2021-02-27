const { v4: uuid } = require('uuid');
const AppError = require('../../../shared/AppError/AppError');
const APP_ERROR_TYPE = require('../../../shared/AppError/APP_ERROR_TYPE');

class ProjectService {
    constructor(projectDAL) {
        this.projectDAL = projectDAL;
    }

    async createProject(user, name) {
        const projectDTO = {
            id: uuid(),
            username: user.username,
            name,
        }
        const project = await this.projectDAL.createProject(projectDTO);
        return project;
    }

    async deleteProject(user, id) {
        const project = await this.projectDAL.getProject(id);
        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There\'s no project with id ' + id,
            });
        }

        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }

        const deletedProject = await this.projectDAL.deleteProject(id);
        return deletedProject;
    }

    async updateProject(user, id, name) {
        const project = await this.projectDAL.getProject(id);

        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There\'s no project with id ' + id,
            });
        }

        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }

        const updatedProject = await this.projectDAL.updateProject(id, name);
        return updatedProject;

    }

    async getProjects(user) {
        const projects = await this.projectDAL.getProjects();
        return projects.filter(p => p.username === user.username);
    }

    async getProject(user, id) {
        const project = await this.projectDAL.getProject(id);

        if (!project) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'There\'s no project with id ' + id,
            });
        }
        
        if (project.username !== user.username) {
            throw new AppError({
                type: APP_ERROR_TYPE.FORBIDDEN,
                message: 'This project does not belong to user ' + user.username,
            });
        }

        return project;
    }

}

module.exports = ProjectService;