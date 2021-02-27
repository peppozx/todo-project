const db = require('./data');
const FakeProjectDAL = require('./fakeProjectDAL');
const FakeUserDAL = require('./fakeUserDAL');
const FakeTaskDAL = require('./fakeTaskDAL')

const fakeProjectDAL = new FakeProjectDAL(db);
const fakeUserDAL = new FakeUserDAL(db);
const fakeTaskDAL = new FakeTaskDAL(db);

module.exports = {
    fakeProjectDAL,
    fakeUserDAL,
    fakeTaskDAL,
};