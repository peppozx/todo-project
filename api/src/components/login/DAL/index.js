const LoginDAL = require('./login');
const fakeDb = require('../../../db/fakeDb');

const loginDAL = new LoginDAL(fakeDb);

module.exports = loginDAL;