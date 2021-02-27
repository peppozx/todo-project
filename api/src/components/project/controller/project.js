class ProjectController {
    constructor(projectService, apiResponse, handleError) {
        this.projectService = projectService;
        this.apiResponse = apiResponse;
        this.handleError = handleError;
    }

    async createProject({ body, user }) {
        try {
            const { name } = body;
            const project = await this.projectService.createProject(user, name);
            return this.apiResponse.ok(project);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async deleteProject({ params, user }) {
        try {
            const { id } = params;
            const project = await this.projectService.deleteProject(user, id);
            return this.apiResponse.ok(project);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async updateProject({ params, body, user }) {
        try {
            const { id } = params;
            const { name } = body;
            const project = await this.projectService.updateProject(user, id, name);
            return this.apiResponse.ok(project);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async getProjects({ user }) {
        try {
            const projects = await this.projectService.getProjects(user);
            return this.apiResponse.ok(projects);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async getProject({ params, user }) {
        try {
            const { id } = params;
            const project = await this.projectService.getProject(user, id);
            return this.apiResponse.ok(project);
        } catch (err) {
            return this.handleError(err);
        }
    }
}

module.exports = ProjectController;