const express = require('express');

/* Modules */
const login = require('../components/login');
const user = require('../components/user');
/* End Modules */

const { setupComponents } = require('../setup/api/setupComponents');

const router = express.Router();

const components = [user];

components.forEach(component => {
    router.use(setupComponents(component));
});

module.exports = router;