const TaskService = require('./task');
const taskDAL = require('../DAL');

const taskService = new TaskService(taskDAL);

module.exports = taskService;