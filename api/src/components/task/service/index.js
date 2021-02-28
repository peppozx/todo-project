const TaskService = require('./task');
const taskDAL = require('../DAL');

const { fakeTaskDAL } = require('../../../db/fake');


let taskService;

if (process.env.NODE_ENV === 'prod') {
    taskService = new TaskService(taskDAL);
} else {
    taskService = new TaskService(fakeTaskDAL);
}


module.exports = taskService;