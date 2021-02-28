const ProjectDAL = require('./project');
const db = require('../../../db/mongo/mongo');

const projectDAL = new ProjectDAL(db.getClient());

module.exports = projectDAL;