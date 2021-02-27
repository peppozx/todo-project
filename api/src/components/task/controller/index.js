const TaskController = require('./task');
const apiResponse = require('../../../shared/apiResponse/apiResponse');
const handleError = require('../../../utils/handleError');
const taskService = require('../service');

const taskController = new TaskController(taskService, apiResponse, handleError);

module.exports = taskController;

