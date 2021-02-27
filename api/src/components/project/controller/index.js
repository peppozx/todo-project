const ProjectController = require('./project');
const apiResponse = require('../../../shared/apiResponse/apiResponse');
const handleError = require('../../../utils/handleError');
const projectService = require('../service');

const projectController = new ProjectController(projectService, apiResponse, handleError);

module.exports = projectController;