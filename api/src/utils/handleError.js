const { 
    unprocessableEntity, 
    notImplemented, 
    notFound, 
    forbidden, 
    badRequest, 
    internalServerError,
    unauthorized
} = require('../shared/apiResponse/apiResponse');
const APP_ERROR_TYPE = require('../shared/AppError/APP_ERROR_TYPE');

function handleError(error) {
    if (error.type === APP_ERROR_TYPE.VALIDATION) {
        return unprocessableEntity({
            message: error.message,
            details: error.details,
        });
    } else if (error.type === APP_ERROR_TYPE.NOT_IMPLEMENTED) {
        return notImplemented({
            message: error.message,
            details: error.details,
        });
    } else if (error.type === APP_ERROR_TYPE.NOT_FOUND) {
        return notFound({
            message: error.message,
            details: error.details,
        });
    } else if (error.type === APP_ERROR_TYPE.FORBIDDEN) {
        return forbidden({
            message: error.message,
            details: error.details,
        });
    } else if (error.type === APP_ERROR_TYPE.BAD_REQUEST) {
        return badRequest({
            message: error.message,
            details: error.details,
        });
    }else if (error.type === APP_ERROR_TYPE.UNAUTHORIZED) {
        return unauthorized({
            message: error.message,
            details: error.details,
        });
    } else {
        return internalServerError({
            message: 'Internal Server Error',
            details: error,
        });
    }
}

module.exports = handleError;