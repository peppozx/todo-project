// Standard and third party imports:
const express = require('express');
const path = require('path');

// Custom imports:
const validateEndpoint = require('./validateEndpoint');
const VALID_ENDPOINT_METHODS = ['get', 'post', 'put', 'patch', 'delete'];

/**
 * Setups the endpoints for a module.
 * The modules are defined by the index.js files located on the subfolders from /components.
 * @param {String} prefix The route prefix for the module. The routes of every endpoint inside the current module will be prefixed by this path.
 * @param {Array} endpoints An array contanining the endpoints definitions.
 */
function setupComponents({ prefix, endpoints }) {
    const router = express.Router();

    for (const endpoint of endpoints) {
        if (!validateEndpointDeclaration(endpoint)) {
            throw new Error('Invalid endpoint configuration');
        }

        const fullPath = path.join(prefix, endpoint.path);

        if (endpoint.schema) {
            setupBodyValidation(router, fullPath, endpoint);
        }

        if (endpoint.queryString) {
            setupQueryStringValidation(router, fullPath, endpoint);
        }

        // Binds the endpoint to the callback method.
        if (endpoint.middlewares) {
            for (const middleware of endpoint.middlewares) {
                router[endpoint.method](fullPath, middleware);
            }
        }

        router[endpoint.method](fullPath, async (req, res) => {
            const response = await endpoint.callback({
                body: req.body,
                query: req.query,
                params: req.params,
                user: req.user,
            });
            res.status(response.statusCode).send(response.body);
        });
    }

    return router;
}

/**
 * Configures a request body validation middleware for an endpoint.
 * @param {Object} router The express Router object where the module is being configured
 * @param {String} fullPath The complete path of the endpoint (prefix + path)
 * @param {Object} endpoint The endpoint configurations
 */
function setupBodyValidation(router, fullPath, endpoint) {
    router[endpoint.method](fullPath, (req, res, next) => {
        const error = validateEndpoint(endpoint.schema, req.body);
        if (!error) {
            next();
        } else {
            res.status(error.statusCode).json(error.body);
        }
    });
}

/**
 * Configures a query string validation middleware for an endpoint.
 * @param {Object} router The express Router object where the module is being configured
 * @param {String} fullPath The complete path of the endpoint (prefix + path)
 * @param {Object} endpoint The endpoint configurations
 */
function setupQueryStringValidation(router, fullPath, endpoint) {
    router[endpoint.method](fullPath, (req, res, next) => {
        const error = validateEndpoint(endpoint.queryString, { ...req.query });
        if (!error) {
            next();
        } else {
            res.status(error.statusCode).json(error.body);
        }
    });
}

function validateEndpointDeclaration(endpoint) {
    if (endpoint.path === null || endpoint.path === undefined) {
        return false;
    }

    if (!endpoint.callback) {
        return false;
    }

    if (!VALID_ENDPOINT_METHODS.includes(endpoint.method)) {
        return false;
    }

    return true;
}

module.exports = {
    setupComponents,
};
