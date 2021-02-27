const LoginController = require('./login');
const loginService = require('../service');
const apiResponse = require('../../../shared/apiResponse/apiResponse');
const handleError = require('../../../utils/handleError');

const loginController = new LoginController(loginService, apiResponse, handleError);

module.exports = loginController;