const ProjectDAL = require('./project');
const fakeDb = require('../../../db/fakeDb');

const projectDAL = new ProjectDAL(fakeDb);

module.exports = projectDAL;