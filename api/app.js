const express = require('express');
const cors = require('cors');
const mongo = require('./src/db/mongo/mongo');
require('dotenv').config();

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
    if (process.env.NODE_ENV === 'prod') {
        await connectMongo();
    }

    app = express();
    app.use(cors());
    app.use(express.json());

    const modules = require('./src/setup/modules');
    app.use(modules);

    return app;
}

module.exports = {
    app,
    start,
};