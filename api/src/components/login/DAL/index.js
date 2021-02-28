const LoginDAL = require('./login');
const db = require('../../../db/mongo/mongo');

const loginDAL = new LoginDAL(db.getClient());

module.exports = loginDAL;