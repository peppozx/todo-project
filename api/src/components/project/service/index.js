const ProjectService = require('./project');
const projectDAL = require('../DAL');
const { fakeProjectDAL } = require('../../../db/fake');


let projectService;

if (process.env.NODE_ENV === 'prod') {
    projectService = new ProjectService(projectDAL);
} else {
    projectService = new ProjectService(fakeProjectDAL);
}

module.exports = projectService;