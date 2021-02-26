const express = require('express');

const modules = require('./src/setup/modules');

const app = express();
app.use(express.json());

app.get('/teste', (req, res) => {
    return res.json({ ok: true });
});
app.use(modules);

module.exports = {
    app,
};