const UserService = require('./user');
const fakeUserDAL = require('../../../db/fake/fakeUserDAL');

const userService = new UserService(fakeUserDAL);

module.exports = userService;