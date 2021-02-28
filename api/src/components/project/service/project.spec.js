const ProjectService = require('./project');
const { fakeProjectDAL } = require('../../../db/fake');

describe('ProjectService', () => {
    let projectService;
    const fakeUser = {
        username: 'fakeUser'
    };
    const fakeProject = {
        name: 'project1'
    }

    beforeEach(async () => {
        projectService = new ProjectService(fakeProjectDAL);
    });

    it('Should get projects', async () => {
        try {
            const numberOfProjects = 3;
            for (let i = 0 ; i < numberOfProjects ; i++) { await projectService.createProject(fakeUser, fakeProject.name) }
            const projects = await projectService.getProjects(fakeUser);
            expect(projects.length).toBe(numberOfProjects);
        } catch (err) {
            expect(1).toBe(2);
        }
    });

    it('Should create an project ', async () => {
        try {
            const response = await projectService.createProject(fakeUser, fakeProject.name);
            expect(response.username).toBe(fakeUser.username);
            expect(response.name).toBe(fakeProject.name);
        } catch(err) {
            expect(1).toBe(2);
        }
    });

    it('Should get one project', async () => {
        try {
            const response = await projectService.createProject(fakeUser, fakeProject.name);
            const project = await projectService.getProject(fakeUser, response.id);
            expect(project.username).toBe(fakeUser.username);
            expect(project.name).toBe(fakeProject.name);
        } catch (err) {
            expect(1).toBe(2);
        }
    })

    it ('Should delete an project', async () => {
        try {
            const response = await projectService.createProject(fakeUser, fakeProject.name);
            await projectService.deleteProject(fakeUser, response.id);
            await projectService.getProject(fakeUser, response.id);
        } catch(err) {
            expect(err.type).toBe('not_found');
        }
    });

    it('Should update one project', async () => {
        try {
            const update = {
                name: 'project name updated',
            };
            const response = await projectService.createProject(fakeUser, fakeProject.name);
            await projectService.updateProject(fakeUser, response.id, update.name);
            const project = await projectService.getProject(fakeUser, response.id);
            expect(project.name).toBe(update.name);
        } catch (err) {
            expect(1).toBe(2);
        }
    })

})
