const LoginService = require('./login');
const { fakeUserDAL } = require('../../../db/fake');
const auth = require('../../../auth');

const loginService = new LoginService(fakeUserDAL, auth);

module.exports = loginService;