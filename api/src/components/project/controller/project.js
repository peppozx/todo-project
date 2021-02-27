class ProjectController {
    constructor(projectService, apiResponse, handleError) {
        this.projectService = projectService;
        this.apiResponse = apiResponse;
        this.handleError = handleError;
    }

    async createProject({ body }) {
        try {
            const { name } = body;
            const project = await this.projectService.createProject(name);
            return this.apiResponse.ok(project);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async deleteProject({ params }) {
        try {
            const { id } = params;
            const project = await this.projectService.deleteProject(id);
            return this.apiResponse.ok(project);
        } catch (err) {
            return this.handleError(err);
        }
    }

    async updateProject(name) {
        try {
            
        } catch (err) {
            return this.handleError(err);
        }
    }

    async getProjects() {
        try {
            
        } catch (err) {
            return this.handleError(err);
        }
    }

    async getProject(name) {
        try {
            
        } catch (err) {
            return this.handleError(err);
        }
    }
}

module.exports = ProjectController;