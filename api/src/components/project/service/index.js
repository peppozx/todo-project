const ProjectService = require('./project');
const fakeProjectDAL = require('../../../db/fake/fakeProjectDAL');

const projectService = new ProjectService(fakeProjectDAL);

module.exports = projectService;