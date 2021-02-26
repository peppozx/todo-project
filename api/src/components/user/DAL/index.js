const UserDAL = require('./user');
const fakeDb = require('../../../db/fakeDb');

const userDAL = new UserDAL(fakeDb);

module.exports = userDAL;