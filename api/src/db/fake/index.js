const db = require('./data');
const FakeProjectDAL = require('./fakeProjectDAL');
const FakeUserDAL = require('./fakeUserDAL');

const fakeProjectDAL = new FakeProjectDAL(db);
const fakeUserDAL = new FakeUserDAL(db);

module.exports = {
    fakeProjectDAL,
    fakeUserDAL,
};