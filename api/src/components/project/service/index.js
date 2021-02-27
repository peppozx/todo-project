const ProjectService = require('./project');
const { fakeProjectDAL } = require('../../../db/fake');

const projectService = new ProjectService(fakeProjectDAL);

module.exports = projectService;