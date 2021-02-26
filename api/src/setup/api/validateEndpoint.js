// Standard and third-party imports
const Schema = require('validate');

// Custom imports:
const { unprocessableEntity } = require('../../shared/apiResponse/apiResponse');

/**
 * The function used in a middleware that setups API validation for every endpoint that contains a 'schema' declaration in index.js
 * @param {Object} schema The schema to validate.
 * @param {Object} data The data that will be validated.
 */
module.exports = (schema, data) => {
    const schemaObj = new Schema(schema);

    const errors = schemaObj.validate(data);

    if (!errors || !errors.length) {
        return null;
    } else {
        return _mapErrorfromValidate(errors);
    }
};

/**
 * Maps the errors object from the 'validate' library to an Error Response object that will be returned from the API.
 * @param {Object} errors The errors object from the 'validate' library.
 */
function _mapErrorfromValidate(errors) {
    return unprocessableEntity({
        message: 'Validation Error',
        details: errors.map(error => ({
            message: error.message,
            path: error.path,
        })),
    });
}
