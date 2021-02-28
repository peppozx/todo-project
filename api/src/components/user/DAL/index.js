const UserDAL = require('./user');
const db = require('../../../db/mongo/mongo');

const userDAL = new UserDAL(db.getClient());

module.exports = userDAL;