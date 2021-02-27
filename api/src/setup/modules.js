const express = require('express');

/* Modules */
const user = require('../components/user');
const login = require('../components/login');
const project = require('../components/project');
const task = require('../components/task');
/* End Modules */

const { setupComponents } = require('../setup/api/setupComponents');

const router = express.Router();

const components = [user, login, project, task];

components.forEach(component => {
    router.use(setupComponents(component));
});

module.exports = router;