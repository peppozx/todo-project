const UserService = require('./user');
const { fakeUserDAL } = require('../../../db/fake');

const userService = new UserService(fakeUserDAL);

module.exports = userService;