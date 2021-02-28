const UserService = require('./user');
const userDAL = require('../DAL');

const userService = new UserService(userDAL);

module.exports = userService;