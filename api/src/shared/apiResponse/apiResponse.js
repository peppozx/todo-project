/**
 * A prototype for an error response object.
 * Every API Response for errors MUST USE THIS PROTOTYPE for the response body.
 */
const errorResponse = {
    message: null,
    details: [],
};

/**
 * ErrorResponse factory function
 * @param {Object} params The parameters used to create an Error Response
 */
const ErrorResponse = ({ message, details }) => {
    return Object.assign({}, errorResponse, { message, details });
};

/**
 * Endpoint response Objects. The controller methods should return these methods, and the setupEndpoints is responsible for
 * converting them to a proper express response.
 */
module.exports = {
    ok(body = {}) {
        return {
            statusCode: 200,
            body,
        };
    },
    created(body = {}) {
        return {
            statusCode: 201,
            body,
        };
    },
    badRequest({ message, details }) {
        return {
            statusCode: 400,
            body: ErrorResponse({ message, details }),
        };
    },
    notFound({ message, details }) {
        return {
            statusCode: 404,
            body: ErrorResponse({ message, details }),
        };
    },
    unprocessableEntity({ message, details }) {
        return {
            statusCode: 422,
            body: ErrorResponse({ message, details }),
        };
    },
    notImplemented({ message, details }) {
        return {
            statusCode: 501,
            body: ErrorResponse({ message, details }),
        };
    },
    internalServerError({ message, details }) {
        return {
            statusCode: 500,
            body: ErrorResponse({ message, details }),
        };
    },
    forbidden({ message, details }) {
        return {
            statusCode: 403,
            body: ErrorResponse({ message, details }),
        };
    },
    unauthorized({ message, details }) {
        return {
            statusCode: 401,
            body: ErrorResponse({ message, details }),
        };
    },
};
