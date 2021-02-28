const UserService = require('./user');
const userDAL = require('../DAL');
const { fakeUserDAL } = require('../../../db/fake');


let userService;

if (process.env.NODE_ENV === 'prod') {
    userService = new UserService(userDAL);
} else {
    userService = new UserService(fakeUserDAL);
}

module.exports = userService;