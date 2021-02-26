const UserController = require('./user');
const userService = require('../service');
const apiResponse = require('../../../shared/apiResponse/apiResponse');
const handleError = require('../../../utils/handleError');

const userController = new UserController(userService, apiResponse, handleError);

module.exports = userController;