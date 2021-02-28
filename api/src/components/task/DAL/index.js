const TaskDAL = require('./task');
const db = require('../../../db/mongo/mongo');

const taskDAL = new TaskDAL(db.getClient());

module.exports = taskDAL;