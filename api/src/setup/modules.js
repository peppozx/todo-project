const express = require('express');

/* Modules */
const login = require('../components/login');
const user = require('../components/user');
const project = require('../components/project');
/* End Modules */

const { setupComponents } = require('../setup/api/setupComponents');

const router = express.Router();

const components = [project, login, user];

components.forEach(component => {
    router.use(setupComponents(component));
});

module.exports = router;