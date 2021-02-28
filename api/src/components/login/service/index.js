const LoginService = require('./login');
const loginDAL = require('../DAL')
const auth = require('../../../auth');

const loginService = new LoginService(loginDAL, auth);

module.exports = loginService;