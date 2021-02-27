const TaskService = require('./task');
const { fakeTaskDAL } = require('../../../db/fake');

const taskService = new TaskService(fakeTaskDAL);

module.exports = taskService;