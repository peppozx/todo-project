const UserDAL = require('./user');
const db = require('../../../db/mongo/mongo');

userDAL = new UserDAL(db.getClient());

module.exports = userDAL;