const express = require('express');
const cors = require('cors');
const mongo = require('./src/db/mongo/mongo');

let app;

async function connectMongo() {
    console.log('Connecting to mongodb');
    await mongo.connect();
    await mongo.createProjectCollection();
    await mongo.createTaskCollection();
    await mongo.createUserCollection();
    console.log('Connected to mongodb');
}

async function start() {
    await connectMongo();
    app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/teste', (req, res) => {
        return res.json({ ok: true });
    });
    const modules = require('./src/setup/modules');
    app.use(modules);
    return app;
}

module.exports = {
    app,
    start,
};