const LoginService = require('./login');
const loginDAL = require('../DAL')
const auth = require('../../../auth');
const { fakeUserDAL } = require('../../../db/fake');


let loginService;

if (process.env.NODE_ENV === 'prod') {
    loginService = new LoginService(loginDAL);
} else {
    loginService = new LoginService(fakeUserDAL);
}

module.exports = loginService;