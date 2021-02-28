const ProjectService = require('./project');
const projectDAL = require('../DAL');

const projectService = new ProjectService(projectDAL);

module.exports = projectService;